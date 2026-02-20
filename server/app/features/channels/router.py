from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.deps import get_db  # Dependency to get a SQLAlchemy session
from app.core.security import get_current_user  # Dependency to get the authenticated user
from app.features.users.models import User  # User model for type hints
from app.features.channels import schemas, service  # Schemas for request/response, service layer for business logic

router = APIRouter(prefix="/channels", tags=["Channels"])  # APIRouter instance for channel-related endpoints


@router.get("/server/{server_public_id}", response_model=List[schemas.ChannelOut])
def list_channels(server_public_id: str,
                  current_user: User = Depends(get_current_user),
                  db: Session = Depends(get_db)):
    """
    List all channels in a given server.
    Only returns channels accessible to the current user.
    """
    return service.list_server_channels(db, server_public_id, current_user.id)


@router.post("/server/{server_public_id}", response_model=schemas.ChannelOut)
def create_channel(server_public_id: str,
                   channel_in: schemas.ChannelCreate,
                   current_user: User = Depends(get_current_user),
                   db: Session = Depends(get_db)):
    """
    Create a new channel in the specified server.
    Requires the name of the channel and authenticated user.
    """
    return service.create_channel(db, server_public_id, channel_in.name, channel_in.type, current_user.id)


@router.delete("/{channel_public_id}")
def delete_channel(channel_public_id: str,
                   current_user: User = Depends(get_current_user),
                   db: Session = Depends(get_db)):
    """
    Delete a channel by its public_id.
    Only allowed for users with sufficient permissions.
    """
    return service.delete_channel(db, channel_public_id, current_user.id)


@router.patch("/{public_id}", response_model=schemas.ChannelOut)
def update_channel(
    public_id: str,
    channel_in: schemas.ChannelUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Update a channel's details (currently only the name).
    Ensures the current user has permission to edit.
    Returns the updated channel object.
    """
    return service.update_channel(
        db,
        public_id,
        channel_in.name,
        current_user.id
    )
