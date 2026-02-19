from fastapi import APIRouter, Depends, HTTPException
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


