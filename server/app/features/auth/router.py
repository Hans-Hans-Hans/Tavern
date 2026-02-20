from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse

from app.db.deps import get_db
from app.features.users import service
from app.features.users.schemas import UserCreate, UserOutPrivate
from app.core.security import create_access_token
from app.core.config import settings
from app.features.auth import schemas as auth_schemas

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserOutPrivate)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(service.models.User).filter(service.models.User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = service.create_user(
        db,
        username=user_data.username,
        email=user_data.email,
        password=user_data.password,
    )
    return user


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Authenticate user and set JWT in HTTP-only cookie.
    """
    user = service.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    if user.must_reset_password:
        raise HTTPException(status_code=403, detail="PASSWORD_RESET_REQUIRED")

    access_token = create_access_token(data={"sub": user.public_id})

    # Set cookie
    response = JSONResponse(content={"message": "Logged in successfully"})
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="lax",
        max_age=3600       # 1 hour
    )
    return response


@router.post("/first-use-reset")
def first_use_reset(payload: auth_schemas.FirstUseResetRequest, db: Session = Depends(get_db)):
    user = service.authenticate_user(db, payload.username, payload.current_password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    if not user.must_reset_password:
        raise HTTPException(status_code=400, detail="Password reset not required")

    service.set_user_password(db, user, payload.new_password, must_reset_password=False)
    access_token = create_access_token(data={"sub": user.public_id})
    response = JSONResponse(content={"message": "Password reset complete"})
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="lax",
        max_age=3600,
    )
    return response


@router.post("/logout")
def logout():
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie(key="access_token")
    return response
