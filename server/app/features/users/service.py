from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from fastapi import HTTPException
from app.features.users import models, schemas
from app.core.security import hash_password, verify_password

# Creates a new user and persists to database
# Responsibility:
# - Hash password
# - Instantiate User model
# - Commit transaction
# - Return persisted object
def create_user(
    db: Session,
    username: str,
    email: str,
    password: str,
    is_superadmin: bool = False,
    must_reset_password: bool = False,
):
    # Hash plain-text password before storing
    hashed_pw = hash_password(password)
    
    user = models.User(
        username=username,
        email=email,
        hashed_password=hashed_pw,
        is_superadmin=is_superadmin,
        must_reset_password=must_reset_password,
    )
    
    db.add(user)
    db.commit()         # Writes to database
    db.refresh(user)    # Refresh to get generated fields (id, public_id, timestamps)
    
    return user

# Authenticates a user by username + password
# Returns:
# - User object if valid
# - None if invalid credentials
def authenticate_user(db: Session, username: str, password: str):
    # Fetch user by username
    user = db.query(models.User).filter(models.User.username == username).first()
    
    if not user:
        return None
    
    # Compare provided password against stored hash
    if not verify_password(password, user.hashed_password):
        return None
    return user


def set_user_password(db: Session, user: models.User, new_password: str, must_reset_password: bool = False):
    user.hashed_password = hash_password(new_password)
    user.must_reset_password = must_reset_password
    db.commit()
    db.refresh(user)
    return user

# Retrieve a user by public-facing UUID
# Used for GET /users/{public_id}
def get_user_by_public_id(db: Session, public_id: str):
    return db.query(models.User).filter(
        models.User.public_id == public_id
    ).first()

# Update a user’s username/email
# Returns:
# - Updated user object
# - None if user not found
def update_user(db: Session, public_id: str, user_in: schemas.UserUpdate):
    user = db.query(models.User).filter(models.User.public_id == public_id).first()
    
    if not user:
        return None
    # Only update fields if provided (partial update behavior)
    if user_in.username is not None:
        user.username = user_in.username
        
    if user_in.email is not None:
        user.email = user_in.email
        
    db.commit()         # Persist changes
    db.refresh(user)    # Refresh to reflect updated state
    return user


def are_friends(db: Session, user_a_id: int, user_b_id: int) -> bool:
    if user_a_id == user_b_id:
        return False
    friendship = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.status == "accepted",
            or_(
                and_(
                    models.FriendRequest.requester_id == user_a_id,
                    models.FriendRequest.addressee_id == user_b_id,
                ),
                and_(
                    models.FriendRequest.requester_id == user_b_id,
                    models.FriendRequest.addressee_id == user_a_id,
                ),
            ),
        )
        .first()
    )
    return friendship is not None


def list_friends(db: Session, user_id: int):
    accepted = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.status == "accepted",
            or_(
                models.FriendRequest.requester_id == user_id,
                models.FriendRequest.addressee_id == user_id,
            ),
        )
        .order_by(models.FriendRequest.updated_at.desc())
        .all()
    )
    friends = []
    for row in accepted:
        other = row.addressee if row.requester_id == user_id else row.requester
        friends.append(
            {
                "public_id": other.public_id,
                "username": other.username,
            }
        )
    return friends


def list_friend_requests(db: Session, user_id: int):
    incoming_rows = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.addressee_id == user_id,
            models.FriendRequest.status == "pending",
        )
        .order_by(models.FriendRequest.created_at.desc())
        .all()
    )
    outgoing_rows = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.requester_id == user_id,
            models.FriendRequest.status == "pending",
        )
        .order_by(models.FriendRequest.created_at.desc())
        .all()
    )
    incoming = [_friend_request_out(row) for row in incoming_rows]
    outgoing = [_friend_request_out(row) for row in outgoing_rows]
    return {"incoming": incoming, "outgoing": outgoing}


def send_friend_request(db: Session, requester_id: int, target_public_id: str):
    target = db.query(models.User).filter(models.User.public_id == target_public_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    if target.id == requester_id:
        raise HTTPException(status_code=400, detail="Cannot friend yourself")

    if are_friends(db, requester_id, target.id):
        raise HTTPException(status_code=400, detail="Already friends")

    reverse_pending = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.requester_id == target.id,
            models.FriendRequest.addressee_id == requester_id,
            models.FriendRequest.status == "pending",
        )
        .first()
    )
    if reverse_pending:
        reverse_pending.status = "accepted"
        db.commit()
        db.refresh(reverse_pending)
        return _friend_request_out(reverse_pending)

    existing = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.requester_id == requester_id,
            models.FriendRequest.addressee_id == target.id,
            models.FriendRequest.status == "pending",
        )
        .first()
    )
    if existing:
        return _friend_request_out(existing)

    row = models.FriendRequest(
        requester_id=requester_id,
        addressee_id=target.id,
        status="pending",
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return _friend_request_out(row)


def accept_friend_request(db: Session, user_id: int, request_public_id: str):
    row = db.query(models.FriendRequest).filter(models.FriendRequest.public_id == request_public_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Friend request not found")
    if row.addressee_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    if row.status != "pending":
        return _friend_request_out(row)

    row.status = "accepted"
    db.commit()
    db.refresh(row)
    return _friend_request_out(row)


def decline_or_cancel_friend_request(db: Session, user_id: int, request_public_id: str):
    row = db.query(models.FriendRequest).filter(models.FriendRequest.public_id == request_public_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Friend request not found")
    if user_id not in (row.requester_id, row.addressee_id):
        raise HTTPException(status_code=403, detail="Not authorized")
    if row.status != "pending":
        raise HTTPException(status_code=400, detail="Request is not pending")
    db.delete(row)
    db.commit()
    return {"detail": "Friend request removed"}


def remove_friend(db: Session, user_id: int, friend_public_id: str):
    friend = db.query(models.User).filter(models.User.public_id == friend_public_id).first()
    if not friend:
        raise HTTPException(status_code=404, detail="User not found")
    row = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.status == "accepted",
            or_(
                and_(
                    models.FriendRequest.requester_id == user_id,
                    models.FriendRequest.addressee_id == friend.id,
                ),
                and_(
                    models.FriendRequest.requester_id == friend.id,
                    models.FriendRequest.addressee_id == user_id,
                ),
            ),
        )
        .first()
    )
    if not row:
        raise HTTPException(status_code=404, detail="Friendship not found")
    db.delete(row)
    db.commit()
    return {"detail": "Friend removed"}


def _friend_request_out(row: models.FriendRequest):
    return {
        "public_id": row.public_id,
        "requester_public_id": row.requester.public_id,
        "requester_username": row.requester.username,
        "addressee_public_id": row.addressee.public_id,
        "addressee_username": row.addressee.username,
        "status": row.status,
        "created_at": row.created_at,
    }
