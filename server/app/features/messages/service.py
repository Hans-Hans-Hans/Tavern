import uuid
from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime, UTC

from app.features.messages import models
from app.features.messages.models import Message
from app.features.channels.models import Channel
from app.features.servers.models import ServerMember


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

    messages = (
        db.query(models.Message)
        .filter(models.Message.channel_id == channel.id)
        .order_by(models.Message.created_at.asc())  # Oldest first
        .limit(limit)
        .offset(offset)
        .all()
    )

    # Convert ORM objects to dicts and include username for API response
    return [
        {
            "public_id": m.public_id,
            "content": m.content,
            "user_id": m.user_id,
            "username": m.user.username,  # Get username from relationship
            "channel_id": m.channel_id,
            "created_at": m.created_at
        }
        for m in messages
    ]


# Create a new message in a channel
def create_message(
    db: Session,
    channel_public_id: str,
    content: str,
    user_id: int
):
    """
    Create a new message in a channel and return it as a dict including username.
    """
    channel = get_channel_or_404(db, channel_public_id)
    verify_membership(db, channel.server_id, user_id)

    message = models.Message(
        public_id=str(uuid.uuid4()),  # Generate unique public_id
        content=content,
        channel_id=channel.id,
        user_id=user_id
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    # Return message as dict with username
    return {
        "public_id": message.public_id,
        "content": message.content,
        "user_id": message.user_id,
        "username": message.user.username,
        "channel_id": message.channel_id,
        "created_at": message.created_at
    }


# Delete a message if user is the author
def delete_message(db, public_id: str, user_id: int):
    message = db.query(Message).filter(
        Message.public_id == public_id
    ).first()

    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    if message.user_id != user_id:  # Only author can delete
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

    if message.user_id != user_id:  # Only author can edit
        raise HTTPException(status_code=403, detail="Not authorized")

    message.content = content
    message.edited_at = datetime.now(UTC)  # Track when message was edited

    db.commit()
    db.refresh(message)

    return message
