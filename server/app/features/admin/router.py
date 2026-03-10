from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from datetime import UTC, datetime, timedelta
import hashlib
import secrets

from app.core.security import get_current_user
from app.core.audit import read_recent_audit_events, write_audit_event
from app.core.app_settings import (
    REQUIRE_REGISTRATION_CODE_KEY,
    get_bool_setting,
    set_bool_setting,
)
from app.core.runtime_metrics import count_voice_joins
from app.db.deps import get_db
from app.features.users.models import User, FriendRequest
from app.features.users import service as user_service
from app.features.servers.models import Server, ServerMember, ServerRole
from app.features.servers import service as servers_service
from app.features.channels.models import Channel
from app.features.messages.models import Message, MessageReaction
from app.features.dms.models import DirectConversation, DirectMessage
from app.features.push.models import PushSubscription
from app.features.auth.models import RegistrationCode


router = APIRouter(prefix="/admin", tags=["Admin"])


def require_superadmin(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_superadmin:
        raise HTTPException(status_code=403, detail="Superadmin access required")
    return current_user


REGISTRATION_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"


def _normalize_registration_code(raw: str) -> str:
    text = str(raw or "").strip().upper().replace(" ", "").replace("-", "")
    if not text:
        return ""
    return "-".join([text[i:i + 4] for i in range(0, len(text), 4)])


def _registration_code_digest(code: str) -> str:
    normalized = "".join(ch for ch in str(code or "").strip().upper() if ch.isalnum())
    return hashlib.sha256(normalized.encode("utf-8")).hexdigest()


def _generate_registration_code(length: int = 12) -> str:
    token = "".join(secrets.choice(REGISTRATION_CODE_ALPHABET) for _ in range(max(8, int(length))))
    return _normalize_registration_code(token)


@router.get("/overview")
def admin_overview(
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    since = datetime.now(UTC) - timedelta(hours=24)
    msg_24h = db.query(func.count(Message.id)).filter(Message.created_at >= since).scalar() or 0
    dm_24h = db.query(func.count(DirectMessage.id)).filter(DirectMessage.created_at >= since).scalar() or 0
    message_users = {
        row[0]
        for row in db.query(Message.user_id).filter(Message.created_at >= since).distinct().all()
        if row and row[0] is not None
    }
    dm_users = {
        row[0]
        for row in db.query(DirectMessage.user_id).filter(DirectMessage.created_at >= since).distinct().all()
        if row and row[0] is not None
    }
    return {
        "users": db.query(func.count(User.id)).scalar() or 0,
        "servers": db.query(func.count(Server.id)).scalar() or 0,
        "channels": db.query(func.count(Channel.id)).scalar() or 0,
        "messages": db.query(func.count(Message.id)).scalar() or 0,
        "memberships": db.query(func.count(ServerMember.id)).scalar() or 0,
        "roles": db.query(func.count(ServerRole.id)).scalar() or 0,
        "pending_friend_requests": db.query(func.count(FriendRequest.id)).filter(FriendRequest.status == "pending").scalar() or 0,
        "messages_24h": msg_24h,
        "dm_messages_24h": dm_24h,
        "active_users_24h": len(message_users | dm_users),
        "voice_joins_24h": count_voice_joins(24),
    }


@router.get("/settings")
def admin_get_settings(
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    _ = current_user
    return {
        "require_registration_code": get_bool_setting(
            db,
            REQUIRE_REGISTRATION_CODE_KEY,
            default=False,
        ),
    }


@router.patch("/settings")
def admin_patch_settings(
    payload: dict,
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    if "require_registration_code" in payload:
        set_bool_setting(
            db,
            REQUIRE_REGISTRATION_CODE_KEY,
            bool(payload.get("require_registration_code")),
        )

    result = {
        "require_registration_code": get_bool_setting(
            db,
            REQUIRE_REGISTRATION_CODE_KEY,
            default=False,
        ),
    }
    write_audit_event(
        event_type="admin_settings_updated",
        actor_user_id=current_user.id,
        actor_public_id=current_user.public_id,
        target={"settings": "global"},
        details={
            "updated_keys": sorted(
                [
                    key
                    for key in (
                        "require_registration_code",
                    )
                    if key in payload
                ]
            )
        },
    )
    return result


@router.get("/registration-codes")
def admin_list_registration_codes(
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    _ = current_user
    rows = db.query(RegistrationCode).order_by(RegistrationCode.created_at.desc()).limit(200).all()
    return [
        {
            "public_id": row.public_id,
            "note": row.note,
            "created_at": row.created_at,
            "used_at": row.used_at,
            "revoked_at": row.revoked_at,
            "created_by_user_id": row.created_by_user_id,
            "used_by_user_id": row.used_by_user_id,
            "is_active": bool(row.used_at is None and row.revoked_at is None),
        }
        for row in rows
    ]


@router.post("/registration-codes")
def admin_create_registration_code(
    payload: dict,
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    note = str(payload.get("note") or "").strip()[:200] or None
    created_code = ""
    created_digest = ""
    for _ in range(8):
        created_code = _generate_registration_code()
        created_digest = _registration_code_digest(created_code)
        exists = db.query(RegistrationCode).filter(RegistrationCode.code_digest == created_digest).first()
        if not exists:
            break
    if not created_code or not created_digest:
        raise HTTPException(status_code=500, detail="Could not generate registration code")
    row = RegistrationCode(
        code_digest=created_digest,
        note=note,
        created_by_user_id=current_user.id,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    write_audit_event(
        event_type="admin_registration_code_created",
        actor_user_id=current_user.id,
        actor_public_id=current_user.public_id,
        target={"registration_code_public_id": row.public_id},
        details={"note": note},
    )
    return {
        "public_id": row.public_id,
        "code": created_code,
        "note": row.note,
        "created_at": row.created_at,
        "is_active": True,
    }


@router.delete("/registration-codes/{code_public_id}")
def admin_revoke_registration_code(
    code_public_id: str,
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    row = db.query(RegistrationCode).filter(RegistrationCode.public_id == code_public_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Registration code not found")
    if row.used_at is not None:
        raise HTTPException(status_code=400, detail="Registration code is already used")
    if row.revoked_at is None:
        row.revoked_at = datetime.now(UTC)
        db.commit()
    write_audit_event(
        event_type="admin_registration_code_revoked",
        actor_user_id=current_user.id,
        actor_public_id=current_user.public_id,
        target={"registration_code_public_id": row.public_id},
    )
    return {"detail": "Registration code revoked"}


@router.get("/users")
def admin_list_users(
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    users = db.query(User).order_by(User.created_at.desc()).all()
    return [
        {
            "public_id": user.public_id,
            "username": user.username,
            "email": user.email,
            "is_superadmin": user.is_superadmin,
            "must_reset_password": user.must_reset_password,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
        }
        for user in users
    ]


@router.patch("/users/{user_public_id}")
def admin_update_user_flags(
    user_public_id: str,
    payload: dict,
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    target = db.query(User).filter(User.public_id == user_public_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    if "is_superadmin" in payload:
        target.is_superadmin = bool(payload.get("is_superadmin"))
    if "must_reset_password" in payload:
        target.must_reset_password = bool(payload.get("must_reset_password"))
    db.commit()
    db.refresh(target)
    result = {
        "public_id": target.public_id,
        "username": target.username,
        "is_superadmin": target.is_superadmin,
        "must_reset_password": target.must_reset_password,
    }
    write_audit_event(
        event_type="admin_user_flags_updated",
        actor_user_id=current_user.id,
        actor_public_id=current_user.public_id,
        target={"user_public_id": target.public_id, "username": target.username},
        details={"payload": payload},
    )
    return result


@router.post("/users/{user_public_id}/reset-password")
def admin_force_password_reset(
    user_public_id: str,
    payload: dict,
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    new_password = str(payload.get("new_password") or "").strip()
    if not new_password:
        raise HTTPException(status_code=400, detail="new_password is required")
    target = db.query(User).filter(User.public_id == user_public_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    user_service.set_user_password(db, target, new_password, must_reset_password=True)
    write_audit_event(
        event_type="admin_force_password_reset",
        actor_user_id=current_user.id,
        actor_public_id=current_user.public_id,
        target={"user_public_id": target.public_id, "username": target.username},
    )
    return {"detail": "Password reset and marked for first-use change"}


@router.delete("/users/{user_public_id}")
def admin_delete_user(
    user_public_id: str,
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    target = db.query(User).filter(User.public_id == user_public_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")

    if target.is_superadmin:
        superadmin_count = db.query(func.count(User.id)).filter(User.is_superadmin == True).scalar() or 0
        if superadmin_count <= 1:
            raise HTTPException(status_code=400, detail="Cannot delete the last superadmin account")

    # Remove user-owned servers entirely.
    owned_servers = db.query(Server).filter(Server.owner_id == target.id).all()
    for server in owned_servers:
        servers_service.delete_server(db, server.public_id, current_user.id)

    # Remove all memberships in remaining servers.
    db.query(ServerMember).filter(ServerMember.user_id == target.id).delete(synchronize_session=False)

    # Remove friend request rows involving this user.
    db.query(FriendRequest).filter(
        or_(FriendRequest.requester_id == target.id, FriendRequest.addressee_id == target.id)
    ).delete(synchronize_session=False)

    # Remove DM content and conversations involving this user.
    dm_conversation_ids = [
        row[0]
        for row in db.query(DirectConversation.id).filter(
            or_(DirectConversation.user_one_id == target.id, DirectConversation.user_two_id == target.id)
        ).all()
        if row and row[0] is not None
    ]
    if dm_conversation_ids:
        db.query(DirectMessage).filter(DirectMessage.conversation_id.in_(dm_conversation_ids)).delete(
            synchronize_session=False
        )
    db.query(DirectMessage).filter(DirectMessage.user_id == target.id).delete(synchronize_session=False)
    db.query(DirectConversation).filter(
        or_(DirectConversation.user_one_id == target.id, DirectConversation.user_two_id == target.id)
    ).delete(synchronize_session=False)

    # Remove authored/reaction content in server channels.
    authored_message_ids = [
        row[0]
        for row in db.query(Message.id).filter(Message.user_id == target.id).all()
        if row and row[0] is not None
    ]
    if authored_message_ids:
        db.query(Message).filter(Message.parent_message_id.in_(authored_message_ids)).update(
            {Message.parent_message_id: None},
            synchronize_session=False,
        )
        db.query(MessageReaction).filter(MessageReaction.message_id.in_(authored_message_ids)).delete(
            synchronize_session=False
        )
    db.query(MessageReaction).filter(MessageReaction.user_id == target.id).delete(synchronize_session=False)
    db.query(Message).filter(Message.pinned_by_user_id == target.id).update(
        {Message.pinned_by_user_id: None},
        synchronize_session=False,
    )
    db.query(Message).filter(Message.user_id == target.id).delete(synchronize_session=False)
    db.query(PushSubscription).filter(PushSubscription.user_id == target.id).delete(synchronize_session=False)

    write_audit_event(
        event_type="admin_delete_user",
        actor_user_id=current_user.id,
        actor_public_id=current_user.public_id,
        target={"user_public_id": target.public_id, "username": target.username},
    )
    db.delete(target)
    db.commit()
    return {"detail": "User deleted"}


@router.get("/audit")
def admin_recent_audit(
    limit: int = 200,
    current_user: User = Depends(require_superadmin),
):
    safe_limit = max(1, min(500, int(limit)))
    _ = current_user
    return read_recent_audit_events(safe_limit)
