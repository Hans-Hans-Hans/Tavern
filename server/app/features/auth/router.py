from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse

from app.db.deps import get_db
from app.features.users import service
from app.features.users.schemas import UserCreate, UserOutPrivate
from app.core.security import create_access_token

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

    access_token = create_access_token(data={"sub": user.public_id})

    # Set cookie
    response = JSONResponse(content={"message": "Logged in successfully"})
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=False,      # Set True if HTTPS in prod
        samesite="lax",    # "strict" if stricter cross-origin policy is desired
        max_age=3600       # 1 hour
    )
    return response


@router.post("/logout")
def logout():
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie(key="access_token")
    return response
