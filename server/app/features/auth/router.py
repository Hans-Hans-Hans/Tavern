from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Form
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, UTC
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse

from app.db.deps import get_db
from app.features.users import service
from app.features.users.schemas import UserCreate, UserOutPrivate
from app.core.security import create_access_token, decode_access_token, get_current_user, extract_access_token_from_cookie
from app.core.config import settings
from app.core.rate_limit import limiter
from app.features.auth import schemas as auth_schemas

router = APIRouter(prefix="/auth", tags=["Auth"])


def _session_payload_from_token(token: str) -> dict:
    payload = decode_access_token(token)
    exp_value = payload.get("exp")
    if exp_value is None:
        raise HTTPException(status_code=401, detail="Token missing exp")
    expires_at = datetime.fromtimestamp(float(exp_value), tz=UTC)
    expires_in_seconds = max(0, int((expires_at - datetime.now(UTC)).total_seconds()))
    return {
        "expires_at": expires_at.isoformat(),
        "expires_in_seconds": expires_in_seconds,
    }


def _auth_cookie_max_age_seconds(remember_me: bool) -> int:
    if remember_me:
        return max(1, int(settings.PERSISTENT_LOGIN_EXPIRE_DAYS)) * 24 * 60 * 60
    return settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60


def _set_auth_cookie(response: JSONResponse, access_token: str, remember_me: bool = False):
    max_age_seconds = _auth_cookie_max_age_seconds(remember_me)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        max_age=max_age_seconds,
        expires=datetime.now(UTC) + timedelta(seconds=max_age_seconds),
    )


@router.post("/register", response_model=UserOutPrivate)
@limiter.limit("8/hour")
def register(request: Request, user_data: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(service.models.User).filter(service.models.User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = service.create_user(
        db,
        username=user_data.username,
        email=user_data.email,
        password=user_data.password,
    )
    service.send_system_announcement_if_needed(db, user)
    return user


@router.post("/login")
@limiter.limit("12/minute")
def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    remember_me: bool = Form(False),
    db: Session = Depends(get_db),
):
    """
    Authenticate user and set JWT in HTTP-only cookie.
    """
    user = service.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    if user.must_reset_password:
        raise HTTPException(status_code=403, detail="PASSWORD_RESET_REQUIRED")

    access_expires = timedelta(days=max(1, int(settings.PERSISTENT_LOGIN_EXPIRE_DAYS))) if remember_me else None
    access_token = create_access_token(
        data={"sub": user.public_id, "remember_me": bool(remember_me)},
        expires_delta=access_expires,
    )
    service.send_system_announcement_if_needed(db, user)

    # Set cookie
    response = JSONResponse(content={"message": "Logged in successfully"})
    _set_auth_cookie(response, access_token, remember_me=bool(remember_me))
    return response


@router.post("/first-use-reset")
@limiter.limit("8/hour")
def first_use_reset(request: Request, payload: auth_schemas.FirstUseResetRequest, db: Session = Depends(get_db)):
    user = service.authenticate_user(db, payload.username, payload.current_password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    if not user.must_reset_password:
        raise HTTPException(status_code=400, detail="Password reset not required")

    service.set_user_password(db, user, payload.new_password, must_reset_password=False)
    service.send_system_announcement_if_needed(db, user)
    access_token = create_access_token(data={"sub": user.public_id})
    response = JSONResponse(content={"message": "Password reset complete"})
    _set_auth_cookie(response, access_token)
    return response


@router.post("/logout")
def logout():
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie(key="access_token")
    return response


@router.get("/session")
def session_status(request: Request, current_user=Depends(get_current_user)):
    token = extract_access_token_from_cookie(request.cookies.get("access_token"))
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    data = _session_payload_from_token(token)
    return {"user_public_id": current_user.public_id, **data}


@router.post("/refresh")
def refresh_session(request: Request, current_user=Depends(get_current_user)):
    raw_token = extract_access_token_from_cookie(request.cookies.get("access_token"))
    remember_me = False
    if raw_token:
        try:
            payload = decode_access_token(raw_token)
            remember_me = bool(payload.get("remember_me"))
        except Exception:
            remember_me = False
    access_expires = timedelta(days=max(1, int(settings.PERSISTENT_LOGIN_EXPIRE_DAYS))) if remember_me else None
    access_token = create_access_token(
        data={"sub": current_user.public_id, "remember_me": remember_me},
        expires_delta=access_expires,
    )
    token_data = _session_payload_from_token(access_token)
    response = JSONResponse(content={"message": "Session refreshed", **token_data})
    _set_auth_cookie(response, access_token, remember_me=remember_me)
    return response
