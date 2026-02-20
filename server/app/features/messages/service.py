import uuid
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from datetime import datetime, UTC
from collections import defaultdict

from app.features.messages import models
from app.features.messages.models import Message, MessageReaction
from app.features.channels.models import Channel
from app.features.servers.models import ServerMember
from app.features.users.models import User
from app.features.servers import service as server_service


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
    reaction_map = build_reaction_map(db, message_ids, user_id)
    thread_reply_counts = get_thread_reply_counts(db, message_ids)

    # Convert ORM objects to dicts and include username for API response
    return [
        {
            "public_id": m.public_id,
            "content": m.content,
            "user_id": m.user_id,
            "username": m.user.username,  # Get username from relationship
            "channel_id": m.channel_id,
            "created_at": m.created_at,
            "edited_at": m.edited_at,
            "parent_message_public_id": m.parent_message.public_id if m.parent_message else None,
            "thread_reply_count": thread_reply_counts.get(m.id, 0),
            "reactions": reaction_map.get(m.id, []),
        }
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
    reaction_map = build_reaction_map(db, message_ids, user_id)
    thread_reply_counts = get_thread_reply_counts(db, message_ids)

    return [
        {
            "public_id": m.public_id,
            "content": m.content,
            "user_id": m.user_id,
            "username": m.user.username,
            "channel_id": m.channel_id,
            "created_at": m.created_at,
            "edited_at": m.edited_at,
            "parent_message_public_id": m.parent_message.public_id if m.parent_message else None,
            "thread_reply_count": thread_reply_counts.get(m.id, 0),
            "reactions": reaction_map.get(m.id, []),
        }
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

    payload = {
        "public_id": message.public_id,
        "content": message.content,
        "user_id": message.user_id,
        "username": message.user.username,
        "channel_id": message.channel_id,
        "created_at": message.created_at,
        "edited_at": message.edited_at,
        "parent_message_public_id": parent_message.public_id if parent_message else None,
        "thread_reply_count": 0,
        "reactions": [],
    }
    # Return message as dict with username
    return payload


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

    message.content = content
    message.edited_at = datetime.now(UTC)  # Track when message was edited

    db.commit()
    db.refresh(message)

    return {
        "public_id": message.public_id,
        "content": message.content,
        "user_id": message.user_id,
        "username": message.user.username,
        "channel_id": message.channel_id,
        "created_at": message.created_at,
        "edited_at": message.edited_at,
        "parent_message_public_id": message.parent_message.public_id if message.parent_message else None,
        "thread_reply_count": get_thread_reply_counts(db, [message.id]).get(message.id, 0),
        "reactions": build_reaction_map(db, [message.id], user_id).get(message.id, []),
    }


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
