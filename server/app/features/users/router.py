from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.features.users import service, schemas

# Router for user-related endpoints
router = APIRouter(prefix="/users", tags=["Users"])

from app.core.security import get_current_user
from app.features.users import models


@router.get("/me", response_model=schemas.UserOutPrivate)
def read_current_user(current_user: models.User = Depends(get_current_user)):
    """
    Return the currently authenticated user's private information.
    Includes email and other private fields.
    Requires valid JWT.
    """
    return current_user


@router.get("/me/appearance")
def read_current_user_appearance(current_user: models.User = Depends(get_current_user)):
    return {"appearance_settings": service.get_user_appearance_settings(current_user)}


@router.put("/me/appearance")
def update_current_user_appearance(
    payload: schemas.UserAppearanceUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    updated = service.update_user_appearance_settings(db, current_user, payload.appearance_settings)
    return {"appearance_settings": service.get_user_appearance_settings(updated)}


@router.get("/friends", response_model=list[schemas.FriendUserOut])
def list_friends(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.list_friends(db, current_user.id)


@router.post("/me/tutorial-complete")
def mark_tutorial_complete(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user.has_seen_tutorial:
        current_user.has_seen_tutorial = True
        db.commit()
        db.refresh(current_user)
    return {"detail": "Tutorial marked complete", "has_seen_tutorial": current_user.has_seen_tutorial}


@router.get("/friend-requests")
def list_friend_requests(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.list_friend_requests(db, current_user.id)


@router.get("/friend-requests/history", response_model=list[schemas.FriendRequestHistoryOut])
def list_friend_request_history(
    limit: int = Query(120, ge=1, le=500),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.list_friend_request_history(db, current_user.id, limit)


@router.post("/friend-requests/{target_public_id}", response_model=schemas.FriendRequestOut)
def send_friend_request(
    target_public_id: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.send_friend_request(db, current_user.id, target_public_id)


@router.post("/friend-requests/{request_public_id}/accept", response_model=schemas.FriendRequestOut)
def accept_friend_request(
    request_public_id: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.accept_friend_request(db, current_user.id, request_public_id)


@router.delete("/friend-requests/{request_public_id}")
def delete_friend_request(
    request_public_id: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.decline_or_cancel_friend_request(db, current_user.id, request_public_id)


@router.delete("/friends/{friend_public_id}")
def remove_friend(
    friend_public_id: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.remove_friend(db, current_user.id, friend_public_id)

@router.get("/{public_id}", response_model=schemas.UserOutPublic)
def read_user(public_id: str, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Return a public-facing user profile.
    - Requires authentication
    - Does NOT expose private fields like email
    """
    user = service.get_user_by_public_id(db, public_id)
    if not user: 
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{public_id}", response_model=schemas.UserOutPrivate)
def update_user(public_id: str, user_in: schemas.UserUpdate, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Update a user's own profile.
    - Only allowed if public_id matches authenticated user
    - Prevents horizontal privilege escalation
    """
    
    # Critical security check
    # Prevents users from updating other users
    if current_user.public_id != public_id:
        raise HTTPException(status_code=403, detail="Not Authorized")
    user = service.update_user(db, public_id, user_in)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


