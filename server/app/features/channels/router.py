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
    return service.create_channel(
        db,
        server_public_id,
        channel_in.name,
        channel_in.type,
        current_user.id,
        category_public_id=channel_in.category_public_id,
    )


@router.get("/server/{server_public_id}/categories", response_model=List[schemas.ChannelCategoryOut])
def list_categories(
    server_public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.list_server_categories(db, server_public_id, current_user.id)


@router.post("/server/{server_public_id}/categories", response_model=schemas.ChannelCategoryOut)
def create_category(
    server_public_id: str,
    payload: schemas.ChannelCategoryCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.create_server_category(db, server_public_id, payload.name, current_user.id)


@router.get("/server/{server_public_id}/layout", response_model=schemas.ServerChannelLayoutOut)
def get_server_layout(
    server_public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.get_server_channel_layout(db, server_public_id, current_user.id)


@router.put("/server/{server_public_id}/layout", response_model=schemas.ServerChannelLayoutOut)
def save_server_layout(
    server_public_id: str,
    payload: schemas.ServerChannelLayoutIn,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.save_server_channel_layout(
        db,
        server_public_id,
        current_user.id,
        layout_tokens=payload.layout_tokens,
        separators=payload.separators,
        collapsed=payload.collapsed,
    )


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


@router.get("/{channel_public_id}/battlemap-state", response_model=schemas.BattlemapStateOut)
def get_battlemap_state(
    channel_public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return {"state": service.get_battlemap_state(db, channel_public_id, current_user.id)}


@router.put("/{channel_public_id}/battlemap-state", response_model=schemas.BattlemapStateOut)
def put_battlemap_state(
    channel_public_id: str,
    payload: schemas.BattlemapStateUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return {"state": service.update_battlemap_state(db, channel_public_id, payload.state, current_user.id)}
