import uuid
import asyncio
import json
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.core.audit import write_audit_event
from app.core.uploads import delete_managed_upload_refs_for_messages
from app.features.channels import models
from app.features.channels.models import Channel
from app.features.messages.models import Message
from app.features.servers.models import ServerMember, Server
from app.features.servers import service as server_service
from app.features.users.models import User
from app.features.websockets import channels_ws


# -------------------------------
# List all channels in a server for a given user
# -------------------------------
def list_server_channels(db: Session, server_public_id: str, user_id: int):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")

    if not server_service.has_server_permission(db, server.id, user_id, "can_manage_channels"):
        membership = db.query(ServerMember).filter(
            ServerMember.server_id == server.id,
            ServerMember.user_id == user_id
        ).first()
    else:
        membership = True

    if not membership:
        raise HTTPException(status_code=403, detail="Not authorized")

    return db.query(models.Channel).filter(models.Channel.server_id == server.id).all()


# -------------------------------
# Create a new channel in a server
# -------------------------------
def create_channel(db: Session, server_public_id: str, name: str, channel_type: str, user_id: int):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")

    if not server_service.has_server_permission(db, server.id, user_id, "can_manage_channels"):
        raise HTTPException(status_code=403, detail="Not authorized to create channels")

    normalized_type = (channel_type or "text").strip().lower()
    if normalized_type not in {"text", "voice", "notes", "battlemap"}:
        raise HTTPException(status_code=400, detail="Invalid channel type")

    channel = models.Channel(
        public_id=str(uuid.uuid4()),
        name=name,
        server_id=server.id,
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
    return channel


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
    return channel
