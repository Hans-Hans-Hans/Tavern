from datetime import UTC, datetime
import json
from pathlib import Path
from typing import List
import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.audit import read_recent_audit_events, write_audit_event, prune_server_audit_events
from app.core.uploads import SERVER_AVATAR_DIR, delete_managed_upload_refs_for_messages
from app.features.channels.models import Channel
from app.features.messages.models import Message
from app.features.servers import models, schemas
from app.features.servers.models import Server
from app.features.users.models import User


ROLE_TEMPLATES = {
    "owner": {
        "can_manage_server": True,
        "can_manage_channels": True,
        "can_manage_members": True,
        "can_manage_roles": True,
        "can_moderate_messages": True,
    },
    "admin": {
        "can_manage_server": True,
        "can_manage_channels": True,
        "can_manage_members": True,
        "can_manage_roles": True,
        "can_moderate_messages": True,
    },
    "mod": {
        "can_manage_server": False,
        "can_manage_channels": True,
        "can_manage_members": False,
        "can_manage_roles": False,
        "can_moderate_messages": True,
    },
    "member": {
        "can_manage_server": False,
        "can_manage_channels": False,
        "can_manage_members": False,
        "can_manage_roles": False,
        "can_moderate_messages": False,
    },
}


def get_membership(db: Session, server_id: int, user_id: int) -> models.ServerMember | None:
    return db.query(models.ServerMember).filter(
        models.ServerMember.server_id == server_id,
        models.ServerMember.user_id == user_id,
    ).first()


def ensure_default_roles(db: Session, server_id: int) -> dict[str, models.ServerRole]:
    role_map: dict[str, models.ServerRole] = {}
    changed = False
    for name, template in ROLE_TEMPLATES.items():
        role = db.query(models.ServerRole).filter(
            models.ServerRole.server_id == server_id,
            models.ServerRole.name == name,
        ).first()
        if not role:
            role = models.ServerRole(server_id=server_id, name=name, **template)
            db.add(role)
            changed = True
        role_map[name] = role
    if changed:
        db.commit()
    for name in list(role_map.keys()):
        role_map[name] = db.query(models.ServerRole).filter(
            models.ServerRole.server_id == server_id,
            models.ServerRole.name == name,
        ).first()
    return role_map


def has_server_permission(db: Session, server_id: int, user_id: int, permission_field: str) -> bool:
    user = db.query(User).filter(User.id == user_id).first()
    if user and user.is_superadmin:
        return True

    membership = get_membership(db, server_id, user_id)
    if not membership:
        return False

    if membership.role == "owner":
        return True

    role = membership.role_ref
    if role is None and membership.role:
        role = db.query(models.ServerRole).filter(
            models.ServerRole.server_id == server_id,
            models.ServerRole.name == membership.role.lower(),
        ).first()
    if role is None:
        role = ensure_default_roles(db, server_id).get("member")
    return bool(getattr(role, permission_field, False))


def create_server(db: Session, server_in: schemas.ServerCreate, owner_id: int) -> models.Server:
    server = models.Server(
        name=server_in.name,
        owner_id=owner_id,
        is_public=server_in.is_public,
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )

    db.add(server)
    db.commit()
    db.refresh(server)

    role_map = ensure_default_roles(db, server.id)
    membership = models.ServerMember(
        server_id=server.id,
        user_id=owner_id,
        role="owner",
        role_id=role_map["owner"].id if role_map.get("owner") else None,
        joined_at=datetime.now(UTC),
    )
    db.add(membership)
    db.commit()

    general_channel = Channel(
        public_id=str(uuid.uuid4()),
        name="general",
        server_id=server.id,
        type="text",
    )
    db.add(general_channel)
    db.commit()
    return server


def list_user_servers(db: Session, user_id: int) -> List[models.Server]:
    user = db.query(User).filter(User.id == user_id).first()
    if user and user.is_superadmin:
        return db.query(models.Server).order_by(models.Server.created_at.desc()).all()
    memberships = db.query(models.ServerMember).filter(models.ServerMember.user_id == user_id).all()
    return [membership.server for membership in memberships]


def get_server_by_public_id(db: Session, public_id: str) -> models.Server | None:
    return db.query(models.Server).filter(models.Server.public_id == public_id).first()


def add_member_to_server(db: Session, server: models.Server, user: User, role: str = "member") -> models.ServerMember | None:
    existing_member = db.query(models.ServerMember).filter(
        models.ServerMember.server_id == server.id,
        models.ServerMember.user_id == user.id,
    ).first()
    if existing_member:
        return None

    role_map = ensure_default_roles(db, server.id)
    role_name = (role or "member").lower()
    if role_name not in role_map:
        role_name = "member"

    member = models.ServerMember(
        server_id=server.id,
        user_id=user.id,
        role=role_name,
        role_id=role_map[role_name].id if role_map.get(role_name) else None,
    )
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


def list_server_members(db: Session, server_public_id: str, requester_id: int):
    server = get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not get_membership(db, server.id, requester_id) and not db.query(User).filter(User.id == requester_id, User.is_superadmin == True).first():
        raise HTTPException(status_code=403, detail="Not authorized")

    members = db.query(models.ServerMember).filter(models.ServerMember.server_id == server.id).all()
    return [
        {
            "user_id": member.user_id,
            "user_public_id": member.user.public_id,
            "username": member.user.username,
            "nickname": member.nickname,
            "server_id": member.server_id,
            "role": member.role,
            "role_public_id": member.role_ref.public_id if member.role_ref else None,
            "joined_at": member.joined_at,
            "updated_at": member.updated_at,
        }
        for member in members
    ]


def delete_server(db: Session, public_id: str, user_id: int):
    server = db.query(Server).filter(Server.public_id == public_id).first()
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not has_server_permission(db, server.id, user_id, "can_manage_server"):
        raise HTTPException(status_code=403, detail="Not authorized")
    message_rows = (
        db.query(Message)
        .join(Channel, Message.channel_id == Channel.id)
        .filter(Channel.server_id == server.id)
        .all()
    )
    delete_managed_upload_refs_for_messages(message_rows)
    for old_avatar in SERVER_AVATAR_DIR.glob(f"{public_id}.*"):
        try:
            old_avatar.unlink(missing_ok=True)
        except Exception:
            continue
    server_name = server.name
    db.delete(server)
    db.commit()
    actor = db.query(User).filter(User.id == user_id).first()
    write_audit_event(
        event_type="server_deleted",
        actor_user_id=user_id,
        actor_public_id=actor.public_id if actor else None,
        target={"server_public_id": public_id, "server_name": server_name},
    )
    return {"detail": "Server deleted"}


def update_server(db: Session, public_id: str, server_in: schemas.ServerUpdate, user_id: int):
    server = db.query(Server).filter(Server.public_id == public_id).first()
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not has_server_permission(db, server.id, user_id, "can_manage_server"):
        raise HTTPException(status_code=403, detail="Not authorized")

    updated = False
    if server_in.name is not None:
        next_name = (server_in.name or "").strip()
        if not next_name:
            raise HTTPException(status_code=400, detail="Server name is required")
        server.name = next_name
        updated = True

    if server_in.max_upload_size_mb is not None:
        # 0 means unlimited for easier client UX.
        server.max_upload_size_mb = int(server_in.max_upload_size_mb) or None
        updated = True
    if "log_retention_days" in server_in.model_fields_set:
        value = server_in.log_retention_days
        server.log_retention_days = int(value) if value is not None else None
        updated = True
    if "message_retention_days" in server_in.model_fields_set:
        value = server_in.message_retention_days
        server.message_retention_days = int(value) if value is not None else None
        updated = True
    if server_in.strip_upload_metadata is not None:
        server.strip_upload_metadata = bool(server_in.strip_upload_metadata)
        updated = True
    if server_in.automod_enabled is not None:
        server.automod_enabled = bool(server_in.automod_enabled)
        updated = True
    if server_in.automod_block_external_links is not None:
        server.automod_block_external_links = bool(server_in.automod_block_external_links)
        updated = True
    if server_in.automod_block_invite_links is not None:
        server.automod_block_invite_links = bool(server_in.automod_block_invite_links)
        updated = True
    if server_in.automod_blocked_terms is not None:
        server.automod_blocked_terms = str(server_in.automod_blocked_terms or "").strip() or None
        updated = True
    if server_in.automod_blocked_extensions is not None:
        server.automod_blocked_extensions = str(server_in.automod_blocked_extensions or "").strip() or None
        updated = True

    if not updated:
        raise HTTPException(status_code=400, detail="No server updates provided")

    db.commit()
    db.refresh(server)
    if "log_retention_days" in server_in.model_fields_set:
        prune_server_audit_events(server.public_id, server.log_retention_days)
    return server


def get_server_upload_diagnostics(
    db: Session,
    server_public_id: str,
    user_id: int,
    tmp_upload_dir: Path,
):
    server = get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not get_membership(db, server.id, user_id) and not db.query(User).filter(User.id == user_id, User.is_superadmin == True).first():
        raise HTTPException(status_code=403, detail="Not authorized")
    retention_days = server.log_retention_days

    session_count = 0
    pending_bytes = 0
    channel_cache: dict[str, int | None] = {}
    try:
        for meta_path in tmp_upload_dir.glob("*.json"):
            try:
                payload = json.loads(meta_path.read_text(encoding="utf-8"))
            except Exception:
                continue
            channel_public_id = str(payload.get("channel_public_id") or "").strip()
            if not channel_public_id:
                continue
            if channel_public_id in channel_cache:
                server_id = channel_cache[channel_public_id]
            else:
                channel = db.query(Channel).filter(Channel.public_id == channel_public_id).first()
                server_id = channel.server_id if channel else None
                channel_cache[channel_public_id] = server_id
            if int(server_id or 0) != int(server.id):
                continue
            session_count += 1
            pending_bytes += int(payload.get("bytes_written") or 0)
    except Exception:
        # Diagnostics should degrade gracefully if temp files are inaccessible.
        pass

    uploads_24h_count = 0
    uploads_24h_bytes = 0
    if retention_days == 0:
        return {
            "max_upload_size_mb": server.max_upload_size_mb,
            "active_upload_sessions": session_count,
            "pending_upload_bytes": pending_bytes,
            "uploads_24h_count": 0,
            "uploads_24h_bytes": 0,
        }
    since = datetime.now(UTC).timestamp() - (24 * 60 * 60)
    retention_cutoff = None
    if retention_days and retention_days > 0:
        retention_cutoff = datetime.now(UTC).timestamp() - (int(retention_days) * 24 * 60 * 60)
    for event in read_recent_audit_events(1200):
        if str(event.get("event_type") or "") != "message_file_upload_completed":
            continue
        ts_raw = str(event.get("ts") or "").strip()
        try:
            event_ts = datetime.fromisoformat(ts_raw.replace("Z", "+00:00")).timestamp()
        except Exception:
            event_ts = 0
        if retention_cutoff is not None and event_ts < retention_cutoff:
            continue
        if event_ts < since:
            continue
        target = event.get("target") or {}
        if str(target.get("server_public_id") or "") != server_public_id:
            continue
        uploads_24h_count += 1
        details = event.get("details") or {}
        uploads_24h_bytes += int(details.get("bytes") or 0)

    return {
        "max_upload_size_mb": server.max_upload_size_mb,
        "active_upload_sessions": session_count,
        "pending_upload_bytes": pending_bytes,
        "uploads_24h_count": uploads_24h_count,
        "uploads_24h_bytes": uploads_24h_bytes,
    }


def list_server_activity(db: Session, server_public_id: str, user_id: int, limit: int = 80):
    server = get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not get_membership(db, server.id, user_id) and not db.query(User).filter(User.id == user_id, User.is_superadmin == True).first():
        raise HTTPException(status_code=403, detail="Not authorized")
    retention_days = server.log_retention_days
    if retention_days == 0:
        return []
    safe_limit = max(1, min(300, int(limit)))
    retention_cutoff = None
    if retention_days and retention_days > 0:
        retention_cutoff = datetime.now(UTC).timestamp() - (int(retention_days) * 24 * 60 * 60)
    rows = []
    for event in reversed(read_recent_audit_events(2000)):
        ts_raw = str(event.get("ts") or "").strip()
        try:
            event_ts = datetime.fromisoformat(ts_raw.replace("Z", "+00:00")).timestamp()
        except Exception:
            event_ts = 0
        if retention_cutoff is not None and event_ts < retention_cutoff:
            continue
        target = event.get("target") or {}
        if str(target.get("server_public_id") or "") != server_public_id:
            continue
        rows.append(
            {
                "ts": str(event.get("ts") or ""),
                "event_type": str(event.get("event_type") or "unknown"),
                "actor_public_id": event.get("actor_public_id"),
                "target": target if isinstance(target, dict) else {},
                "details": (event.get("details") or {}) if isinstance(event.get("details") or {}, dict) else {},
            }
        )
        if len(rows) >= safe_limit:
            break
    return rows


def list_server_roles(db: Session, server_public_id: str, user_id: int):
    server = get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not get_membership(db, server.id, user_id) and not db.query(User).filter(User.id == user_id, User.is_superadmin == True).first():
        raise HTTPException(status_code=403, detail="Not authorized")
    ensure_default_roles(db, server.id)
    return db.query(models.ServerRole).filter(models.ServerRole.server_id == server.id).order_by(models.ServerRole.name.asc()).all()


def create_server_role(db: Session, server_public_id: str, role_in: schemas.ServerRoleCreate, user_id: int):
    server = get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not has_server_permission(db, server.id, user_id, "can_manage_roles"):
        raise HTTPException(status_code=403, detail="Not authorized")
    existing = db.query(models.ServerRole).filter(
        models.ServerRole.server_id == server.id,
        models.ServerRole.name == role_in.name.lower(),
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Role already exists")
    role = models.ServerRole(
        server_id=server.id,
        name=role_in.name.lower(),
        can_manage_server=role_in.can_manage_server,
        can_manage_channels=role_in.can_manage_channels,
        can_manage_members=role_in.can_manage_members,
        can_manage_roles=role_in.can_manage_roles,
        can_moderate_messages=role_in.can_moderate_messages,
    )
    db.add(role)
    db.commit()
    db.refresh(role)
    actor = db.query(User).filter(User.id == user_id).first()
    write_audit_event(
        event_type="server_role_created",
        actor_user_id=user_id,
        actor_public_id=actor.public_id if actor else None,
        target={"server_public_id": server_public_id, "role_public_id": role.public_id, "role_name": role.name},
    )
    return role


def update_server_role(db: Session, server_public_id: str, role_public_id: str, role_in: schemas.ServerRoleUpdate, user_id: int):
    server = get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not has_server_permission(db, server.id, user_id, "can_manage_roles"):
        raise HTTPException(status_code=403, detail="Not authorized")
    role = db.query(models.ServerRole).filter(
        models.ServerRole.public_id == role_public_id,
        models.ServerRole.server_id == server.id,
    ).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    if role.name == "owner":
        raise HTTPException(status_code=400, detail="Owner role cannot be modified")
    for field in ("name", "can_manage_server", "can_manage_channels", "can_manage_members", "can_manage_roles", "can_moderate_messages"):
        value = getattr(role_in, field)
        if value is not None:
            setattr(role, field, value.lower() if field == "name" else value)
    db.commit()
    db.refresh(role)
    actor = db.query(User).filter(User.id == user_id).first()
    role_updates = role_in.dict(exclude_none=True) if hasattr(role_in, "dict") else {}
    write_audit_event(
        event_type="server_role_updated",
        actor_user_id=user_id,
        actor_public_id=actor.public_id if actor else None,
        target={"server_public_id": server_public_id, "role_public_id": role_public_id, "role_name": role.name},
        details={"updates": role_updates},
    )
    return role


def assign_member_role(db: Session, server_public_id: str, member_user_public_id: str, role_public_id: str, user_id: int):
    server = get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not has_server_permission(db, server.id, user_id, "can_manage_members"):
        raise HTTPException(status_code=403, detail="Not authorized")
    member_user = db.query(User).filter(User.public_id == member_user_public_id).first()
    if not member_user:
        raise HTTPException(status_code=404, detail="User not found")
    membership = get_membership(db, server.id, member_user.id)
    if not membership:
        raise HTTPException(status_code=404, detail="Membership not found")
    role = db.query(models.ServerRole).filter(
        models.ServerRole.public_id == role_public_id,
        models.ServerRole.server_id == server.id,
    ).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    membership.role = role.name
    membership.role_id = role.id
    db.commit()
    db.refresh(membership)
    actor = db.query(User).filter(User.id == user_id).first()
    write_audit_event(
        event_type="server_member_role_assigned",
        actor_user_id=user_id,
        actor_public_id=actor.public_id if actor else None,
        target={"server_public_id": server_public_id, "member_user_public_id": member_user_public_id},
        details={"role_public_id": role_public_id, "role_name": membership.role},
    )
    return membership


def update_member_nickname(
    db: Session,
    server_public_id: str,
    member_user_public_id: str,
    nickname: str | None,
    requester_id: int,
):
    server = get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")

    member_user = db.query(User).filter(User.public_id == member_user_public_id).first()
    if not member_user:
        raise HTTPException(status_code=404, detail="User not found")

    membership = get_membership(db, server.id, member_user.id)
    if not membership:
        raise HTTPException(status_code=404, detail="Membership not found")

    can_manage_members = has_server_permission(db, server.id, requester_id, "can_manage_members")
    is_self = requester_id == member_user.id
    if not is_self and not can_manage_members:
        raise HTTPException(status_code=403, detail="Not authorized")

    next_nickname = (nickname or "").strip() or None
    if next_nickname and len(next_nickname) > 50:
        raise HTTPException(status_code=400, detail="Nickname must be 50 characters or fewer")

    membership.nickname = next_nickname
    db.commit()
    db.refresh(membership)
    return membership
