from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.deps import get_db
from app.core.security import get_current_user
from app.features.users.models import User
from app.features.messages import schemas, service

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
def create_message(
    channel_public_id: str,  # Channel to post the message in
    message_in: schemas.MessageCreate,  # Message content payload
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.create_message(
        db,
        channel_public_id,
        message_in.content,
        current_user.id
    )

# Delete a message by its public ID
@router.delete("/{public_id}")
def delete_message(
    public_id: str,  # Message public ID to delete
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.delete_message(
        db,
        public_id,
        current_user.id
    )
    
# Update/edit a message
@router.patch("/{public_id}", response_model=schemas.MessageOut)
def update_message(
    public_id: str,  # Public ID of the message to update
    message_in: schemas.MessageUpdate,  # New content payload
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.update_message(
        db,
        public_id,
        message_in.content,
        current_user.id
    )
