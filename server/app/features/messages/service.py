import uuid
import re
from urllib.parse import urlparse
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from datetime import datetime, UTC, timedelta
from collections import defaultdict

from app.core.uploads import collect_managed_upload_refs, delete_managed_upload_refs, delete_managed_upload_refs_for_messages
from app.features.messages import models
from app.features.messages.models import Message, MessageReaction
from app.features.channels.models import Channel
from app.features.servers.models import ServerMember
from app.features.users.models import User
from app.features.servers.models import Server
from app.features.servers import service as server_service

URL_PATTERN = re.compile(r"https?://[^\s<>()]+", flags=re.IGNORECASE)
INVITE_PATTERN = re.compile(r"(discord\.gg|discord\.com/invite|tavern\.gg/invite|/invite/)", flags=re.IGNORECASE)


# Helper: Get a channel by public_id or raise 404
def get_channel_or_404(db: Session, channel_public_id: str):
    channel = db.query(Channel).filter(
        Channel.public_id == channel_public_id
    ).first()

    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")

    return channel


# Helper: Check if a user is a member of a server
def verify_membership(db: Session, server_id: int, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user and user.is_superadmin:
        return
    membership = db.query(ServerMember).filter(
        ServerMember.server_id == server_id,
        ServerMember.user_id == user_id
    ).first()

    if not membership:
        raise HTTPException(status_code=403, detail="Not authorized")


def _message_to_payload(
    message: Message,
    *,
    server_role: str | None = None,
    thread_reply_count: int = 0,
    reactions: list[dict] | None = None,
) -> dict:
    return {
        "public_id": message.public_id,
        "content": message.content,
        "user_id": message.user_id,
        "user_public_id": message.user.public_id,
        "username": message.user.username,
        "username_color": message.user.username_color,
        "name_emoji": message.user.name_emoji,
        "server_role": (server_role or "").strip() or None,
        "channel_id": message.channel_id,
        "channel_public_id": message.channel.public_id if message.channel else None,
        "created_at": message.created_at,
        "edited_at": message.edited_at,
        "parent_message_public_id": message.parent_message.public_id if message.parent_message else None,
        "thread_reply_count": int(thread_reply_count or 0),
        "reactions": reactions or [],
        "is_pinned": bool(message.is_pinned),
        "pinned_at": message.pinned_at,
        "pinned_by_user_public_id": message.pinned_by_user.public_id if message.pinned_by_user else None,
    }


def _resolve_server_roles_for_users(db: Session, server_id: int, user_ids: list[int]) -> dict[int, str]:
    normalized_ids = sorted({int(uid) for uid in (user_ids or []) if uid is not None})
    if not normalized_ids:
        return {}
    rows = (
        db.query(ServerMember.user_id, ServerMember.role)
        .filter(
            ServerMember.server_id == server_id,
            ServerMember.user_id.in_(normalized_ids),
        )
        .all()
    )
    role_map: dict[int, str] = {}
    for user_id, role in rows:
        role_map[int(user_id)] = str(role or "").strip().lower() or "member"
    return role_map


def _split_policy_list(raw: str | None) -> list[str]:
    if not raw:
        return []
    values = []
    for token in re.split(r"[\n,;]+", str(raw)):
        normalized = token.strip().lower()
        if normalized:
            values.append(normalized)
    return values


def _extract_urls(content: str) -> list[str]:
    return [match.group(0) for match in URL_PATTERN.finditer(str(content or ""))]


def _extract_url_extensions(content: str) -> list[str]:
    extensions: list[str] = []
    for url in _extract_urls(content):
        try:
            path = urlparse(url).path or ""
        except Exception:
            path = ""
        if "." not in path:
            continue
        ext = path.rsplit(".", 1)[-1].strip().lower()
        if ext:
            extensions.append(ext)
    return extensions


def _enforce_server_automod(channel: Channel, content: str):
    server = channel.server
    if not server or not bool(getattr(server, "automod_enabled", False)):
        return
    text = str(content or "")
    lowered = text.casefold()
    if bool(getattr(server, "automod_block_invite_links", False)) and INVITE_PATTERN.search(text):
        raise HTTPException(status_code=400, detail="AutoMod blocked message: invite links are not allowed")
    if bool(getattr(server, "automod_block_external_links", False)) and URL_PATTERN.search(text):
        raise HTTPException(status_code=400, detail="AutoMod blocked message: external links are not allowed")

    blocked_terms = _split_policy_list(getattr(server, "automod_blocked_terms", None))
    for term in blocked_terms:
        if term and term in lowered:
            raise HTTPException(status_code=400, detail=f"AutoMod blocked message: blocked term '{term}'")

    blocked_exts = {token.lstrip(".") for token in _split_policy_list(getattr(server, "automod_blocked_extensions", None))}
    if blocked_exts:
        for ext in _extract_url_extensions(text):
            if ext in blocked_exts:
                raise HTTPException(status_code=400, detail=f"AutoMod blocked message: '.{ext}' links are not allowed")


def _server_message_retention_days(server: Server | None) -> int | None:
    if not server:
        return None
    value = getattr(server, "message_retention_days", None)
    if value is None:
        return None
    try:
        parsed = int(value)
        if parsed < -1:
            return -1
        return parsed
    except Exception:
        return None


def _apply_server_message_retention(db: Session, server_id: int, retention_days: int | None):
    if retention_days is None or retention_days < 0:
        return
    query = (
        db.query(Message)
        .join(Channel, Message.channel_id == Channel.id)
        .filter(Channel.server_id == server_id)
    )
    if retention_days > 0:
        cutoff = datetime.now(UTC) - timedelta(days=retention_days)
        query = query.filter(Message.created_at < cutoff)
    rows = query.all()
    if not rows:
        return
    delete_managed_upload_refs_for_messages(rows)
    for row in rows:
        db.delete(row)
    db.commit()


# List messages in a channel, with pagination
def list_messages(
    db: Session,
    channel_public_id: str,
    user_id: int,
    limit: int = 50,
    offset: int = 0
):
    """
    Returns a list of messages in a channel, including the username for each message.
    """
    channel = get_channel_or_404(db, channel_public_id)  # Ensure channel exists
    verify_membership(db, channel.server_id, user_id)    # Ensure user has access
    _apply_server_message_retention(db, channel.server_id, _server_message_retention_days(channel.server))

    # Fetch newest messages first so limit/offset works against recent chat activity.
    # Then reverse so API response remains oldest->newest for display.
    newest_messages = (
        db.query(models.Message)
        .filter(
            models.Message.channel_id == channel.id,
            models.Message.parent_message_id.is_(None)
        )
        .order_by(models.Message.created_at.desc())  # Newest first
        .limit(limit)
        .offset(offset)
        .all()
    )
    messages = list(reversed(newest_messages))
    message_ids = [m.id for m in messages]
    message_user_ids = [m.user_id for m in messages]
    reaction_map = build_reaction_map(db, message_ids, user_id)
    thread_reply_counts = get_thread_reply_counts(db, message_ids)
    role_map = _resolve_server_roles_for_users(db, channel.server_id, message_user_ids)

    return [
        _message_to_payload(
            m,
            server_role=role_map.get(int(m.user_id)),
            thread_reply_count=thread_reply_counts.get(m.id, 0),
            reactions=reaction_map.get(m.id, []),
        )
        for m in messages
    ]


def list_thread_messages(
    db: Session,
    channel_public_id: str,
    parent_message_public_id: str,
    user_id: int,
    limit: int = 100,
    offset: int = 0,
):
    channel = get_channel_or_404(db, channel_public_id)
    verify_membership(db, channel.server_id, user_id)
    _apply_server_message_retention(db, channel.server_id, _server_message_retention_days(channel.server))

    parent = (
        db.query(Message)
        .filter(
            Message.public_id == parent_message_public_id,
            Message.channel_id == channel.id
        )
        .first()
    )
    if not parent:
        raise HTTPException(status_code=404, detail="Parent message not found")

    thread_messages = (
        db.query(Message)
        .filter(Message.parent_message_id == parent.id)
        .order_by(Message.created_at.asc())
        .limit(limit)
        .offset(offset)
        .all()
    )

    all_messages = [parent, *thread_messages]
    message_ids = [m.id for m in all_messages]
    message_user_ids = [m.user_id for m in all_messages]
    reaction_map = build_reaction_map(db, message_ids, user_id)
    thread_reply_counts = get_thread_reply_counts(db, message_ids)
    role_map = _resolve_server_roles_for_users(db, channel.server_id, message_user_ids)

    return [
        _message_to_payload(
            m,
            server_role=role_map.get(int(m.user_id)),
            thread_reply_count=thread_reply_counts.get(m.id, 0),
            reactions=reaction_map.get(m.id, []),
        )
        for m in all_messages
    ]


# Create a new message in a channel
def create_message(
    db: Session,
    channel_public_id: str,
    content: str,
    user_id: int,
    parent_message_public_id: str | None = None,
):
    """
    Create a new message in a channel and return it as a dict including username.
    """
    channel = get_channel_or_404(db, channel_public_id)
    verify_membership(db, channel.server_id, user_id)
    retention_days = _server_message_retention_days(channel.server)
    _apply_server_message_retention(db, channel.server_id, retention_days)
    _enforce_server_automod(channel, content)

    parent_message = None
    if parent_message_public_id:
        parent_message = (
            db.query(Message)
            .filter(
                Message.public_id == parent_message_public_id,
                Message.channel_id == channel.id
            )
            .first()
        )
        if not parent_message:
            raise HTTPException(status_code=404, detail="Parent message not found")

    if retention_days == 0:
        sender = db.query(User).filter(User.id == user_id).first()
        message = models.Message(
            public_id=str(uuid.uuid4()),
            content=content,
            channel_id=channel.id,
            user_id=user_id,
            parent_message_id=parent_message.id if parent_message else None,
            created_at=datetime.now(UTC),
            edited_at=None,
        )
        message.user = sender
        message.channel = channel
        role_map = _resolve_server_roles_for_users(db, channel.server_id, [user_id])
        return _message_to_payload(
            message,
            server_role=role_map.get(int(user_id)),
            thread_reply_count=0,
            reactions=[],
        )

    message = models.Message(
        public_id=str(uuid.uuid4()),  # Generate unique public_id
        content=content,
        channel_id=channel.id,
        user_id=user_id,
        parent_message_id=parent_message.id if parent_message else None,
    )

    db.add(message)
    db.commit()
    db.refresh(message)
    role_map = _resolve_server_roles_for_users(db, channel.server_id, [message.user_id])

    return _message_to_payload(
        message,
        server_role=role_map.get(int(message.user_id)),
        thread_reply_count=0,
        reactions=[],
    )


# Delete a message if user is the author
def delete_message(db, public_id: str, user_id: int):
    message = db.query(Message).filter(
        Message.public_id == public_id
    ).first()

    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    can_moderate = server_service.has_server_permission(db, message.channel.server_id, user_id, "can_moderate_messages")
    if message.user_id != user_id and not can_moderate:
        raise HTTPException(status_code=403, detail="Not authorized to delete this message")

    delete_managed_upload_refs(message.content)
    db.delete(message)
    db.commit()

    return {"detail": "Message deleted"}


# Update/edit a message if user is the author
def update_message(db, public_id: str, content: str, user_id: int):
    message = db.query(Message).filter(
        Message.public_id == public_id
    ).first()

    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    can_moderate = server_service.has_server_permission(db, message.channel.server_id, user_id, "can_moderate_messages")
    if message.user_id != user_id and not can_moderate:
        raise HTTPException(status_code=403, detail="Not authorized")
    _enforce_server_automod(message.channel, content)

    old_upload_paths = {ref.absolute_path for ref in collect_managed_upload_refs(message.content)}
    next_upload_paths = {ref.absolute_path for ref in collect_managed_upload_refs(content)}
    removed_paths = old_upload_paths - next_upload_paths
    for path in removed_paths:
        try:
            path.unlink(missing_ok=True)
        except Exception:
            continue

    message.content = content
    message.edited_at = datetime.now(UTC)  # Track when message was edited

    db.commit()
    db.refresh(message)
    role_map = _resolve_server_roles_for_users(db, message.channel.server_id, [message.user_id])

    return _message_to_payload(
        message,
        server_role=role_map.get(int(message.user_id)),
        thread_reply_count=get_thread_reply_counts(db, [message.id]).get(message.id, 0),
        reactions=build_reaction_map(db, [message.id], user_id).get(message.id, []),
    )


def list_pinned_messages(
    db: Session,
    channel_public_id: str,
    user_id: int,
    limit: int = 50,
    offset: int = 0,
):
    channel = get_channel_or_404(db, channel_public_id)
    verify_membership(db, channel.server_id, user_id)
    _apply_server_message_retention(db, channel.server_id, _server_message_retention_days(channel.server))

    pinned = (
        db.query(Message)
        .filter(
            Message.channel_id == channel.id,
            Message.parent_message_id.is_(None),
            Message.is_pinned == True,  # noqa: E712
        )
        .order_by(Message.pinned_at.desc(), Message.created_at.desc())
        .limit(limit)
        .offset(offset)
        .all()
    )
    message_ids = [m.id for m in pinned]
    message_user_ids = [m.user_id for m in pinned]
    reaction_map = build_reaction_map(db, message_ids, user_id)
    thread_reply_counts = get_thread_reply_counts(db, message_ids)
    role_map = _resolve_server_roles_for_users(db, channel.server_id, message_user_ids)
    return [
        _message_to_payload(
            m,
            server_role=role_map.get(int(m.user_id)),
            thread_reply_count=thread_reply_counts.get(m.id, 0),
            reactions=reaction_map.get(m.id, []),
        )
        for m in pinned
    ]


def _require_pin_permission(db: Session, message: Message, user_id: int):
    verify_membership(db, message.channel.server_id, user_id)


def pin_message(db: Session, message_public_id: str, user_id: int):
    message = db.query(Message).filter(Message.public_id == message_public_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    _require_pin_permission(db, message, user_id)

    if not message.is_pinned:
        message.is_pinned = True
        message.pinned_at = datetime.now(UTC)
        message.pinned_by_user_id = user_id
        db.commit()
        db.refresh(message)
    role_map = _resolve_server_roles_for_users(db, message.channel.server_id, [message.user_id])

    return _message_to_payload(
        message,
        server_role=role_map.get(int(message.user_id)),
        thread_reply_count=get_thread_reply_counts(db, [message.id]).get(message.id, 0),
        reactions=build_reaction_map(db, [message.id], user_id).get(message.id, []),
    )


def unpin_message(db: Session, message_public_id: str, user_id: int):
    message = db.query(Message).filter(Message.public_id == message_public_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    _require_pin_permission(db, message, user_id)

    if message.is_pinned:
        message.is_pinned = False
        message.pinned_at = None
        message.pinned_by_user_id = None
        db.commit()
        db.refresh(message)
    role_map = _resolve_server_roles_for_users(db, message.channel.server_id, [message.user_id])

    return _message_to_payload(
        message,
        server_role=role_map.get(int(message.user_id)),
        thread_reply_count=get_thread_reply_counts(db, [message.id]).get(message.id, 0),
        reactions=build_reaction_map(db, [message.id], user_id).get(message.id, []),
    )


def toggle_reaction(db: Session, message_public_id: str, emoji: str, user_id: int):
    message = db.query(Message).filter(Message.public_id == message_public_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    verify_membership(db, message.channel.server_id, user_id)

    normalized_emoji = (emoji or "").strip()
    if not normalized_emoji:
        raise HTTPException(status_code=400, detail="Emoji is required")

    existing = (
        db.query(MessageReaction)
        .filter(
            MessageReaction.message_id == message.id,
            MessageReaction.user_id == user_id,
            MessageReaction.emoji == normalized_emoji
        )
        .first()
    )

    action = "added"
    if existing:
        db.delete(existing)
        action = "removed"
    else:
        reaction = MessageReaction(
            message_id=message.id,
            user_id=user_id,
            emoji=normalized_emoji,
        )
        db.add(reaction)

    db.commit()
    reactions = build_reaction_map(db, [message.id], user_id).get(message.id, [])

    return {
        "action": action,
        "message_public_id": message.public_id,
        "channel_public_id": message.channel.public_id,
        "reactions": reactions,
    }


def build_reaction_map(db: Session, message_ids: list[int], current_user_id: int):
    if not message_ids:
        return {}

    reaction_rows = (
        db.query(MessageReaction)
        .filter(MessageReaction.message_id.in_(message_ids))
        .all()
    )

    grouped = defaultdict(lambda: defaultdict(set))
    for row in reaction_rows:
        grouped[row.message_id][row.emoji].add(row.user_id)

    result = {}
    for message_id, emoji_map in grouped.items():
        ordered = []
        for emoji, user_ids in sorted(emoji_map.items(), key=lambda x: x[0]):
            ordered.append(
                {
                    "emoji": emoji,
                    "count": len(user_ids),
                    "reacted_by_me": current_user_id in user_ids,
                }
            )
        result[message_id] = ordered
    return result


def get_thread_reply_counts(db: Session, message_ids: list[int]):
    if not message_ids:
        return {}

    rows = (
        db.query(Message.parent_message_id, func.count(Message.id))
        .filter(Message.parent_message_id.in_(message_ids))
        .group_by(Message.parent_message_id)
        .all()
    )
    return {parent_id: count for parent_id, count in rows if parent_id is not None}
