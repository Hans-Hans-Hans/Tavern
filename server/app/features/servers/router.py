from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.deps import get_db
from app.core.security import get_current_user
from app.features.users.models import User
from app.features.servers import service, schemas, models

router = APIRouter(prefix="/servers", tags=["Servers"])

# ---------- Server Routes ----------

# Create a new server
@router.post("/", response_model=schemas.ServerOut)
def create_server(
    server_in: schemas.ServerCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Pass owner_id from current authenticated user
    return service.create_server(db, server_in, owner_id=current_user.id)

# List all servers that the current user is a member of
@router.get("/", response_model=List[schemas.ServerOut])
def list_servers(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.list_user_servers(db, user_id=current_user.id)

# Get a specific server by its public ID
@router.get("/{public_id}", response_model=schemas.ServerOut)
def get_server(
    public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    server = service.get_server_by_public_id(db, public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")

    # Check if current user is a member of this server
    membership = db.query(models.ServerMember).filter(
        models.ServerMember.server_id == server.id,
        models.ServerMember.user_id == current_user.id
    ).first()
    if not membership:
        raise HTTPException(status_code=403, detail="Not authorized to view this server")

    return server

# Add a user to a server
@router.post("/{public_id}/members/{user_public_id}", response_model=schemas.ServerMemberOut)
def add_member(
    public_id: str,
    user_public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    server = service.get_server_by_public_id(db, public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")

    # Only the server owner can add members
    if server.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only server owner can add members")

    # Find the user to add by their public_id
    user = db.query(User).filter(User.public_id == user_public_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    member = service.add_member_to_server(db, server, user)
    if not member:
        raise HTTPException(status_code=400, detail="User is already a member")

    return member

# Delete a server
@router.delete("/{public_id}")
def delete_server(
    public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.delete_server(
        db,
        public_id,
        current_user.id
    )

# Update server information (currently only name)
@router.patch("/{public_id}", response_model=schemas.ServerOut)
def update_server(
    public_id: str,
    server_in: schemas.ServerUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.update_server(
        db,
        public_id,
        server_in.name,
        current_user.id
    )
