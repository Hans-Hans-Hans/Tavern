from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.deps import get_db
from app.core.security import get_current_user
from app.features.users.models import User
from app.features.messages import schemas, service
from app.features.messages.models import Message
from app.features.websockets.messages_ws import manager as messages_ws_manager

# APIRouter for all message-related endpoints
router = APIRouter(prefix="/messages", tags=["Messages"])


# List messages in a specific channel
@router.get("/{channel_public_id}", response_model=List[schemas.MessageOut])
def list_messages(
    channel_public_id: str,  # Public ID of the channel to fetch messages from
    limit: int = Query(50, le=100),  # Max number of messages to return
    offset: int = Query(0, ge=0),  # Offset for pagination
    current_user: User = Depends(get_current_user),  # Authenticated user
    db: Session = Depends(get_db),  # DB session
):
    return service.list_messages(
        db,
        channel_public_id,
        current_user.id,
        limit,
        offset
    )


# Create a new message in a channel
@router.post("/{channel_public_id}", response_model=schemas.MessageOut)
async def create_message(
    channel_public_id: str,  # Channel to post the message in
    message_in: schemas.MessageCreate,  # Message content payload
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    message = service.create_message(
        db,
        channel_public_id,
        message_in.content,
        current_user.id,
        message_in.parent_message_public_id,
    )
    await messages_ws_manager.broadcast(
        channel_public_id,
        {
            "event": "message_created",
            **message,
            "created_at": str(message["created_at"]),
            "edited_at": str(message["edited_at"]) if message.get("edited_at") else None,
        }
    )
    return message

# Delete a message by its public ID
@router.delete("/{public_id}")
async def delete_message(
    public_id: str,  # Message public ID to delete
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    message = db.query(Message).filter(Message.public_id == public_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    channel_public_id = message.channel.public_id
    result = service.delete_message(
        db,
        public_id,
        current_user.id
    )
    await messages_ws_manager.broadcast(
        channel_public_id,
        {
            "event": "message_deleted",
            "public_id": public_id,
            "user_id": current_user.id,
        }
    )
    return result
    
# Update/edit a message
@router.patch("/{public_id}", response_model=schemas.MessageOut)
async def update_message(
    public_id: str,  # Public ID of the message to update
    message_in: schemas.MessageUpdate,  # New content payload
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    target = db.query(Message).filter(Message.public_id == public_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Message not found")
    channel_public_id = target.channel.public_id

    message = service.update_message(
        db,
        public_id,
        message_in.content,
        current_user.id
    )
    await messages_ws_manager.broadcast(
        channel_public_id,
        {
            "event": "message_updated",
            **message,
            "created_at": str(message["created_at"]),
            "edited_at": str(message["edited_at"]) if message.get("edited_at") else None,
        }
    )
    return message


@router.get("/{channel_public_id}/threads/{parent_message_public_id}", response_model=List[schemas.MessageOut])
def list_thread_messages(
    channel_public_id: str,
    parent_message_public_id: str,
    limit: int = Query(100, le=300),
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.list_thread_messages(
        db,
        channel_public_id,
        parent_message_public_id,
        current_user.id,
        limit,
        offset,
    )


@router.post("/{public_id}/reactions")
async def toggle_reaction(
    public_id: str,
    reaction_in: schemas.MessageReactionToggle,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    result = service.toggle_reaction(db, public_id, reaction_in.emoji, current_user.id)
    await messages_ws_manager.broadcast(
        result["channel_public_id"],
        {
            "event": "message_reaction_toggled",
            "message_public_id": public_id,
            "reactions": result["reactions"],
            "user_id": current_user.id,
            "emoji": reaction_in.emoji,
            "action": result["action"],
        }
    )
    return result
