import uuid
import asyncio
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.features.channels import models
from app.features.channels.models import Channel
from app.features.servers.models import ServerMember, Server
from app.features.servers import service as server_service
from app.features.websockets import channels_ws


# -------------------------------
# List all channels in a server for a given user
# -------------------------------
def list_server_channels(db: Session, server_public_id: str, user_id: int):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")

    membership = db.query(ServerMember).filter(
        ServerMember.server_id == server.id,
        ServerMember.user_id == user_id
    ).first()

    if not membership:
        raise HTTPException(status_code=403, detail="Not authorized")

    return db.query(models.Channel).filter(models.Channel.server_id == server.id).all()


# -------------------------------
# Create a new channel in a server
# -------------------------------
def create_channel(db: Session, server_public_id: str, name: str, user_id: int):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")

    if server.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Only owner can create channels")

    channel = models.Channel(
        public_id=str(uuid.uuid4()),
        name=name,
        server_id=server.id,
        type="text"
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


# -------------------------------
# Delete a channel
# -------------------------------
def delete_channel(db: Session, channel_public_id: str, user_id: int):
    channel = db.query(Channel).filter(Channel.public_id == channel_public_id).first()
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")

    server = channel.server
    if server.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    channel_count = db.query(Channel).filter(Channel.server_id == server.id).count()
    if channel_count <= 1:
        raise HTTPException(status_code=400, detail="Cannot delete the last channel")

    db.delete(channel)
    db.commit()
    return {"message": "Channel deleted"}


# -------------------------------
# Update a channel's name
# -------------------------------
def update_channel(db: Session, public_id: str, name: str, user_id: int):
    channel = db.query(Channel).filter(Channel.public_id == public_id).first()
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")

    if channel.server.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    channel.name = name
    db.commit()
    db.refresh(channel)
    return channel
