import uuid
import asyncio
import json
import re
from typing import Any
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.core.audit import write_audit_event
from app.core.uploads import delete_managed_upload_refs_for_messages
from app.features.channels import models
from app.features.channels.models import Channel, ChannelCategory
from app.features.messages.models import Message
from app.features.servers.models import ServerMember, Server
from app.features.servers import service as server_service
from app.features.users.models import User
from app.features.websockets import channels_ws


def _require_server_membership_or_manage_channels(db: Session, server: Server, user_id: int):
    if not server_service.has_server_permission(db, server.id, user_id, "can_manage_channels"):
        membership = db.query(ServerMember).filter(
            ServerMember.server_id == server.id,
            ServerMember.user_id == user_id
        ).first()
    else:
        membership = True
    if not membership:
        raise HTTPException(status_code=403, detail="Not authorized")


def _safe_parse_json_object(raw: str | None) -> dict[str, Any]:
    if not raw:
        return {}
    try:
        parsed = json.loads(raw)
    except Exception:
        return {}
    return parsed if isinstance(parsed, dict) else {}


def _safe_parse_json_list(raw: str | None) -> list[str]:
    if not raw:
        return []
    try:
        parsed = json.loads(raw)
    except Exception:
        return []
    if not isinstance(parsed, list):
        return []
    return [str(item) for item in parsed if isinstance(item, str)]


def _server_layout_payload(server: Server) -> dict[str, Any]:
    return {
        "layout_tokens": _safe_parse_json_list(server.channel_layout),
        "separators": _safe_parse_json_object(server.channel_separators),
        "collapsed": {
            key: bool(value)
            for key, value in _safe_parse_json_object(server.channel_separator_collapsed).items()
        },
    }


def _serialize_channel(channel: Channel) -> dict[str, Any]:
    category = channel.category
    return {
        "public_id": str(channel.public_id),
        "name": str(channel.name),
        "server_id": int(channel.server_id),
        "category_public_id": str(category.public_id) if category else None,
        "category_name": str(category.name) if category else None,
        "position": int(channel.position or 0),
        "type": str(channel.type or "text"),
        "created_at": channel.created_at,
    }


def _channel_sort_key(channel: Channel):
    category = channel.category
    if category is None:
        return (0, -1, int(channel.position or 0), int(channel.id or 0))
    return (1, int(category.position or 0), int(channel.position or 0), int(channel.id or 0))


def _strip_legacy_category_prefix(channel: Channel) -> bool:
    category = channel.category
    if category is None:
        return False
    raw_name = str(channel.name or "").strip()
    category_name = str(category.name or "").strip()
    if not raw_name or not category_name:
        return False
    # Legacy imports used "Category / channel". Support flexible spacing.
    pattern = re.compile(rf"^\s*{re.escape(category_name)}\s*/\s*(.+)\s*$", flags=re.IGNORECASE)
    match = pattern.match(raw_name)
    if not match:
        return False
    next_name = str(match.group(1) or "").strip()
    if not next_name or next_name == raw_name:
        return False
    channel.name = next_name
    return True


# -------------------------------
# List all channels in a server for a given user
# -------------------------------
def list_server_channels(db: Session, server_public_id: str, user_id: int):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    _require_server_membership_or_manage_channels(db, server, user_id)
    channels = db.query(models.Channel).filter(models.Channel.server_id == server.id).all()
    changed = False
    for channel in channels:
        if _strip_legacy_category_prefix(channel):
            changed = True
    if changed:
        db.commit()
        for channel in channels:
            db.refresh(channel)
    channels.sort(key=_channel_sort_key)
    return [_serialize_channel(channel) for channel in channels]


# -------------------------------
# Create a new channel in a server
# -------------------------------
def create_channel(
    db: Session,
    server_public_id: str,
    name: str,
    channel_type: str,
    user_id: int,
    category_public_id: str | None = None,
):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")

    if not server_service.has_server_permission(db, server.id, user_id, "can_manage_channels"):
        raise HTTPException(status_code=403, detail="Not authorized to create channels")

    normalized_type = (channel_type or "text").strip().lower()
    if normalized_type not in {"text", "voice", "notes", "battlemap"}:
        raise HTTPException(status_code=400, detail="Invalid channel type")

    category = None
    if category_public_id:
        category = db.query(ChannelCategory).filter(
            ChannelCategory.public_id == category_public_id,
            ChannelCategory.server_id == server.id,
        ).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")

    max_position = (
        db.query(models.Channel)
        .filter(models.Channel.server_id == server.id, models.Channel.category_id == (category.id if category else None))
        .order_by(models.Channel.position.desc(), models.Channel.id.desc())
        .first()
    )

    channel = models.Channel(
        public_id=str(uuid.uuid4()),
        name=name,
        server_id=server.id,
        category_id=category.id if category else None,
        position=(int(max_position.position) + 1) if max_position else 0,
        type=normalized_type
    )

    db.add(channel)
    db.commit()
    db.refresh(channel)

    # -------------------------------
    # Broadcast the new channel to all WebSocket clients
    # -------------------------------
    try:
        loop = asyncio.get_running_loop()
        loop.create_task(
            channels_ws.broadcast(
                server.public_id,
                {
                    "type": "new_channel",
                    "channel": {
                        "name": channel.name,
                        "public_id": channel.public_id,
                        "type": channel.type,
                    },
                }
            )
        )
    except RuntimeError:
        # fallback if no event loop is running (shouldn't happen in FastAPI)
        pass

    return channel


# -------------------------------
# Fetch a channel by its public ID
# -------------------------------
def get_channel_by_public_id(db: Session, public_id: str):
    return db.query(models.Channel).filter(models.Channel.public_id == public_id).first()


def _require_channel_access(db: Session, channel_public_id: str, user_id: int):
    channel = get_channel_by_public_id(db, channel_public_id)
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    if not server_service.has_server_permission(db, channel.server_id, user_id, "can_manage_channels"):
        membership = db.query(ServerMember).filter(
            ServerMember.server_id == channel.server_id,
            ServerMember.user_id == user_id,
        ).first()
        if not membership:
            raise HTTPException(status_code=403, detail="Not authorized")
    return _serialize_channel(channel)


def list_server_categories(db: Session, server_public_id: str, user_id: int):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    _require_server_membership_or_manage_channels(db, server, user_id)
    return (
        db.query(ChannelCategory)
        .filter(ChannelCategory.server_id == server.id)
        .order_by(ChannelCategory.position.asc(), ChannelCategory.id.asc())
        .all()
    )


def create_server_category(db: Session, server_public_id: str, name: str, user_id: int):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not server_service.has_server_permission(db, server.id, user_id, "can_manage_channels"):
        raise HTTPException(status_code=403, detail="Not authorized")
    label = str(name or "").strip()
    if not label:
        raise HTTPException(status_code=400, detail="Category name is required")
    max_position = (
        db.query(ChannelCategory)
        .filter(ChannelCategory.server_id == server.id)
        .order_by(ChannelCategory.position.desc(), ChannelCategory.id.desc())
        .first()
    )
    category = ChannelCategory(
        public_id=str(uuid.uuid4()),
        name=label,
        server_id=server.id,
        position=(int(max_position.position) + 1) if max_position else 0,
    )
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def get_server_channel_layout(db: Session, server_public_id: str, user_id: int):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    _require_server_membership_or_manage_channels(db, server, user_id)
    return _server_layout_payload(server)


def save_server_channel_layout(
    db: Session,
    server_public_id: str,
    user_id: int,
    *,
    layout_tokens: list[str],
    separators: dict[str, str],
    collapsed: dict[str, bool],
):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not server_service.has_server_permission(db, server.id, user_id, "can_manage_channels"):
        raise HTTPException(status_code=403, detail="Not authorized")

    channels = db.query(Channel).filter(Channel.server_id == server.id).all()
    valid_channel_ids = {str(ch.public_id) for ch in channels}

    safe_separators: dict[str, str] = {}
    for key, value in (separators or {}).items():
        sep_id = str(key or "").strip()
        label = str(value or "").strip()
        if not sep_id or not label:
            continue
        safe_separators[sep_id] = label[:300]

    safe_layout: list[str] = []
    for token in layout_tokens or []:
        text = str(token or "").strip()
        if not text:
            continue
        if text.startswith("ch:"):
            if text[3:] not in valid_channel_ids:
                continue
        elif text.startswith("sep:"):
            if text[4:] not in safe_separators:
                continue
        else:
            continue
        if text in safe_layout:
            continue
        safe_layout.append(text)

    ordered_channels = db.query(Channel).filter(Channel.server_id == server.id).all()
    ordered_channels.sort(key=_channel_sort_key)
    existing_channel_tokens = [f"ch:{channel.public_id}" for channel in ordered_channels]
    for token in existing_channel_tokens:
        if token not in safe_layout:
            safe_layout.append(token)

    safe_collapsed = {
        str(key): bool(value)
        for key, value in (collapsed or {}).items()
        if str(key) in safe_separators
    }

    server.channel_layout = json.dumps(safe_layout, separators=(",", ":"), ensure_ascii=False)
    server.channel_separators = json.dumps(safe_separators, separators=(",", ":"), ensure_ascii=False)
    server.channel_separator_collapsed = json.dumps(safe_collapsed, separators=(",", ":"), ensure_ascii=False)
    db.commit()
    return _server_layout_payload(server)


def import_discord_layout(
    db: Session,
    *,
    server_public_id: str,
    layout_rows: list[dict],
    replace_existing: bool,
    skip_existing: bool,
    create_categories: bool,
    prefix_category: bool,
    user_id: int,
):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not server_service.has_server_permission(db, server.id, user_id, "can_manage_channels"):
        raise HTTPException(status_code=403, detail="Not authorized to import channels")

    normalized_rows: list[dict] = []
    for row in layout_rows or []:
        if not isinstance(row, dict):
            continue
        source_name = str(row.get("name") or "").strip()
        source_type = str(row.get("type") or "").strip().lower()
        category_name = str(row.get("category_name") or "").strip() or None
        if not source_name:
            continue
        if source_type not in {"text", "voice"}:
            continue
        normalized_rows.append(
            {
                "name": source_name,
                "type": source_type,
                "category_name": category_name,
            }
        )

    if not normalized_rows:
        raise HTTPException(status_code=400, detail="No importable channels were found in Discord layout")

    existing_channels = db.query(Channel).filter(Channel.server_id == server.id).all()
    existing_categories = db.query(ChannelCategory).filter(ChannelCategory.server_id == server.id).all()
    existing_pairs = {
        (str(ch.name or "").strip().lower(), str(ch.type or "text").strip().lower())
        for ch in existing_channels
    }
    category_by_name = {
        str(cat.name or "").strip().lower(): cat
        for cat in existing_categories
    }

    created_channels: list[Channel] = []
    created_categories: list[ChannelCategory] = []
    skipped_duplicates = 0
    deleted_existing = 0

    if replace_existing and existing_channels:
        message_rows = (
            db.query(Message)
            .join(Channel, Message.channel_id == Channel.id)
            .filter(Channel.server_id == server.id)
            .all()
        )
        delete_managed_upload_refs_for_messages(message_rows)
        deleted_existing = len(existing_channels)
        for channel in existing_channels:
            db.delete(channel)
        for category in existing_categories:
            db.delete(category)
        db.flush()
        existing_pairs.clear()
        category_by_name.clear()

    category_position = 0
    channel_position_by_category: dict[int | None, int] = {}
    layout_tokens: list[str] = []
    separators: dict[str, str] = {}
    separator_collapsed: dict[str, bool] = {}
    seen_separator_ids: set[str] = set()

    for row in normalized_rows:
        category = None
        category_name = str(row.get("category_name") or "").strip() or None
        if create_categories and category_name:
            key = category_name.lower()
            category = category_by_name.get(key)
            if not category:
                category = ChannelCategory(
                    public_id=str(uuid.uuid4()),
                    name=category_name,
                    server_id=server.id,
                    position=category_position,
                )
                category_position += 1
                db.add(category)
                db.flush()
                created_categories.append(category)
                category_by_name[key] = category
            sep_id = category.public_id
            if sep_id not in seen_separator_ids:
                seen_separator_ids.add(sep_id)
                separators[sep_id] = category_name
                separator_collapsed[sep_id] = False
                layout_tokens.append(f"sep:{sep_id}")

        final_name = row["name"]
        if (not create_categories) and prefix_category and category_name:
            final_name = f"{category_name} / {row['name']}"

        pair = (final_name.lower(), row["type"])
        if skip_existing and pair in existing_pairs:
            skipped_duplicates += 1
            continue
        category_id = category.id if category else None
        position = channel_position_by_category.get(category_id, 0)
        channel_position_by_category[category_id] = position + 1
        channel = models.Channel(
            public_id=str(uuid.uuid4()),
            name=final_name,
            server_id=server.id,
            category_id=category_id,
            position=position,
            type=row["type"],
        )
        db.add(channel)
        db.flush()
        created_channels.append(channel)
        existing_pairs.add(pair)
        layout_tokens.append(f"ch:{channel.public_id}")

    if not created_channels and not deleted_existing:
        return {
            "created": 0,
            "skipped_duplicates": skipped_duplicates,
            "deleted_existing": 0,
            "channels": [],
        }

    if layout_tokens:
        existing_layout = _server_layout_payload(server)
        merged_layout = list(existing_layout.get("layout_tokens") or []) if not replace_existing else []
        for token in layout_tokens:
            if token not in merged_layout:
                merged_layout.append(token)
        merged_separators = dict(existing_layout.get("separators") or {})
        merged_separators.update(separators)
        merged_collapsed = {
            key: bool(value)
            for key, value in dict(existing_layout.get("collapsed") or {}).items()
        }
        merged_collapsed.update({key: bool(value) for key, value in separator_collapsed.items()})

        server.channel_layout = json.dumps(merged_layout, separators=(",", ":"), ensure_ascii=False)
        server.channel_separators = json.dumps(merged_separators, separators=(",", ":"), ensure_ascii=False)
        server.channel_separator_collapsed = json.dumps(merged_collapsed, separators=(",", ":"), ensure_ascii=False)

    db.commit()
    for channel in created_channels:
        db.refresh(channel)

    actor = db.query(User).filter(User.id == user_id).first()
    write_audit_event(
        event_type="channel_layout_imported_from_discord",
        actor_user_id=user_id,
        actor_public_id=actor.public_id if actor else None,
        target={"server_public_id": server_public_id},
        details={
            "created": len(created_channels),
            "skipped_duplicates": skipped_duplicates,
            "deleted_existing": deleted_existing,
            "prefix_category": bool(prefix_category),
            "replace_existing": bool(replace_existing),
            "skip_existing": bool(skip_existing),
        },
    )

    return {
        "created": len(created_channels),
        "skipped_duplicates": skipped_duplicates,
        "deleted_existing": deleted_existing,
        "channels": created_channels,
    }


def get_battlemap_state(db: Session, channel_public_id: str, user_id: int):
    channel = _require_channel_access(db, channel_public_id, user_id)
    if (channel.type or "text") != "battlemap":
        raise HTTPException(status_code=400, detail="Channel is not a battlemap")
    if not channel.battlemap_state:
        return {}
    try:
        parsed = json.loads(channel.battlemap_state)
    except Exception:
        return {}
    return parsed if isinstance(parsed, dict) else {}


def update_battlemap_state(db: Session, channel_public_id: str, state: dict, user_id: int):
    channel = _require_channel_access(db, channel_public_id, user_id)
    if (channel.type or "text") != "battlemap":
        raise HTTPException(status_code=400, detail="Channel is not a battlemap")
    safe_state = state if isinstance(state, dict) else {}
    channel.battlemap_state = json.dumps(safe_state, separators=(",", ":"), ensure_ascii=False)
    db.commit()
    return safe_state


# -------------------------------
# Delete a channel
# -------------------------------
def delete_channel(db: Session, channel_public_id: str, user_id: int):
    channel = db.query(Channel).filter(Channel.public_id == channel_public_id).first()
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")

    server = channel.server
    if not server_service.has_server_permission(db, server.id, user_id, "can_manage_channels"):
        raise HTTPException(status_code=403, detail="Not authorized")

    channel_count = db.query(Channel).filter(Channel.server_id == server.id).count()
    if channel_count <= 1:
        raise HTTPException(status_code=400, detail="Cannot delete the last channel")

    message_rows = db.query(Message).filter(Message.channel_id == channel.id).all()
    delete_managed_upload_refs_for_messages(message_rows)
    channel_name = channel.name
    server_public_id = server.public_id
    db.delete(channel)
    if server.channel_layout:
        layout = [token for token in _safe_parse_json_list(server.channel_layout) if token != f"ch:{channel_public_id}"]
        server.channel_layout = json.dumps(layout, separators=(",", ":"), ensure_ascii=False)
    db.commit()
    actor = db.query(User).filter(User.id == user_id).first()
    write_audit_event(
        event_type="channel_deleted",
        actor_user_id=user_id,
        actor_public_id=actor.public_id if actor else None,
        target={"channel_public_id": channel_public_id, "channel_name": channel_name, "server_public_id": server_public_id},
    )
    return {"message": "Channel deleted"}


# -------------------------------
# Update a channel's name
# -------------------------------
def update_channel(db: Session, public_id: str, name: str, user_id: int):
    channel = db.query(Channel).filter(Channel.public_id == public_id).first()
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")

    if not server_service.has_server_permission(db, channel.server_id, user_id, "can_manage_channels"):
        raise HTTPException(status_code=403, detail="Not authorized")

    channel.name = name
    db.commit()
    db.refresh(channel)
    return _serialize_channel(channel)
