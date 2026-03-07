from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pathlib import Path
from typing import List
from fastapi import Query

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


@router.get("/{public_id}/upload-diagnostics", response_model=schemas.ServerUploadDiagnosticsOut)
def get_upload_diagnostics(
    public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tmp_upload_dir = Path(__file__).resolve().parents[4] / "server" / "uploads" / "messages" / ".tmp"
    return service.get_server_upload_diagnostics(db, public_id, current_user.id, tmp_upload_dir)


@router.get("/{public_id}/activity", response_model=List[schemas.ServerActivityEventOut])
def get_server_activity(
    public_id: str,
    limit: int = Query(80, ge=1, le=300),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.list_server_activity(db, public_id, current_user.id, limit)

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
    if not membership and not current_user.is_superadmin:
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

    if not service.has_server_permission(db, server.id, current_user.id, "can_manage_members"):
        raise HTTPException(status_code=403, detail="Not authorized to add members")

    # Find the user to add by their public_id
    user = db.query(User).filter(User.public_id == user_public_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    member = service.add_member_to_server(db, server, user)
    if not member:
        raise HTTPException(status_code=400, detail="User is already a member")

    return member


@router.get("/{public_id}/members", response_model=List[schemas.ServerMemberDetailOut])
def list_members(
    public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.list_server_members(db, public_id, current_user.id)

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
        server_in,
        current_user.id
    )


@router.get("/{public_id}/roles", response_model=List[schemas.ServerRoleOut])
def list_roles(
    public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.list_server_roles(db, public_id, current_user.id)


@router.post("/{public_id}/roles", response_model=schemas.ServerRoleOut)
def create_role(
    public_id: str,
    role_in: schemas.ServerRoleCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.create_server_role(db, public_id, role_in, current_user.id)


@router.patch("/{public_id}/roles/{role_public_id}", response_model=schemas.ServerRoleOut)
def patch_role(
    public_id: str,
    role_public_id: str,
    role_in: schemas.ServerRoleUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.update_server_role(db, public_id, role_public_id, role_in, current_user.id)


@router.patch("/{public_id}/members/{member_user_public_id}/role", response_model=schemas.ServerMemberOut)
def assign_member_role(
    public_id: str,
    member_user_public_id: str,
    payload: schemas.MemberRoleAssign,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.assign_member_role(
        db,
        public_id,
        member_user_public_id,
        payload.role_public_id,
        current_user.id,
    )


@router.patch("/{public_id}/members/{member_user_public_id}/nickname", response_model=schemas.ServerMemberOut)
def patch_member_nickname(
    public_id: str,
    member_user_public_id: str,
    payload: schemas.MemberNicknameUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.update_member_nickname(
        db,
        public_id,
        member_user_public_id,
        payload.nickname,
        current_user.id,
    )
