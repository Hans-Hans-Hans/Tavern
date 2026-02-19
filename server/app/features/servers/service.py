from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, UTC
from fastapi import HTTPException

from app.features.servers import models, schemas
from app.features.users.models import User
from app.features.servers.models import Server
from app.features.channels.models import Channel
import uuid

# ---------- Server Operations ----------

def create_server(
    db: Session,
    server_in: schemas.ServerCreate,
    owner_id: int
) -> models.Server:
    """
    Create a new server and automatically add the creator as owner member.
    """

    # 1️⃣ Create server instance with name, owner, visibility
    server = models.Server(
        name=server_in.name,
        owner_id=owner_id,
        is_public=server_in.is_public,
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC)
    )

    db.add(server)
    db.commit()
    db.refresh(server)  # refresh to get DB-generated values (like ID)

    # 2️⃣ Add creator as a ServerMember with role "owner"
    membership = models.ServerMember(
        server_id=server.id,
        user_id=owner_id,
        role="owner",
        joined_at=datetime.now(UTC)
    )

    db.add(membership)
    db.commit()
    
    # 3️⃣ Create default "general" text channel for the server
    general_channel = Channel(
        public_id=str(uuid.uuid4()),
        name="general",
        server_id=server.id,
        type="text"
    )

    db.add(general_channel)
    db.commit()

    return server

def list_user_servers(db: Session, user_id: int) -> List[models.Server]:
    """
    List all servers the user is a member of.
    """
    # Query memberships for the user
    memberships = db.query(models.ServerMember).filter(models.ServerMember.user_id == user_id).all()
    # Return the associated Server objects
    return [membership.server for membership in memberships]

def get_server_by_public_id(db: Session, public_id: str) -> models.Server | None:
    """
    Retrieve a server by its public_id.
    """
    return db.query(models.Server).filter(models.Server.public_id == public_id).first()

def add_member_to_server(db: Session, server: models.Server, user: User, role: str = "member") -> models.ServerMember:
    """
    Add a user as a member of a server. Returns the new ServerMember.
    """
    # Prevent duplicate memberships
    existing_member = db.query(models.ServerMember).filter(
        models.ServerMember.server_id == server.id,
        models.ServerMember.user_id == user.id
    ).first()
    if existing_member:
        return None  # Already a member

    # Create new membership
    member = models.ServerMember(
        server_id=server.id,
        user_id=user.id,
        role=role
    )
    db.add(member)
    db.commit()
    db.refresh(member)
    return member

def delete_server(db, public_id: str, user_id: int):
    """
    Delete a server. Only the owner can delete it.
    Cascade deletes associated channels and memberships due to model configuration.
    """
    server = db.query(Server).filter(
        Server.public_id == public_id
    ).first()

    if not server:
        raise HTTPException(status_code=404, detail="Server not found")

    if server.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(server)  # Deletes server and cascades to channels & members
    db.commit()

    return {"detail": "Server deleted"}

def update_server(db, public_id: str, name: str, user_id: int):
    """
    Update the server name. Only owner can update.
    """
    server = db.query(Server).filter(
        Server.public_id == public_id
    ).first()

    if not server:
        raise HTTPException(status_code=404, detail="Server not found")

    if server.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    server.name = name
    db.commit()
    db.refresh(server)

    return server
