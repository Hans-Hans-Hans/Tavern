import secrets
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Form
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, UTC
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse

from app.db.deps import get_db
from app.features.users import service
from app.features.users.schemas import UserCreate, UserOutPrivate
from app.core.security import (
    create_access_token,
    decode_access_token,
    get_current_user,
    extract_access_token_from_cookie,
    hash_password,
    verify_password,
)
from app.core.config import settings
from app.core.rate_limit import limiter
from app.core.app_settings import (
    EMAIL_VERIFICATION_TTL_MINUTES_KEY,
    REQUIRE_EMAIL_VERIFICATION_KEY,
    get_bool_setting,
    get_int_setting,
)
from app.core.email_delivery import send_verification_code_email
from app.features.auth import schemas as auth_schemas
from app.features.auth.models import PendingEmailVerification

router = APIRouter(prefix="/auth", tags=["Auth"])
MAX_VERIFICATION_ATTEMPTS = 8


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
    if get_bool_setting(db, REQUIRE_EMAIL_VERIFICATION_KEY, default=False):
        raise HTTPException(
            status_code=400,
            detail="Email verification is required. Request a code first.",
        )
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


@router.post("/register/request-code", response_model=auth_schemas.RegisterRequestCodeResponse)
@limiter.limit("8/hour")
def register_request_code(request: Request, user_data: UserCreate, db: Session = Depends(get_db)):
    if not get_bool_setting(db, REQUIRE_EMAIL_VERIFICATION_KEY, default=False):
        raise HTTPException(status_code=400, detail="Email verification is currently disabled by admin")

    normalized_email = str(user_data.email or "").strip().lower()
    normalized_username = str(user_data.username or "").strip()
    existing_email = db.query(service.models.User).filter(service.models.User.email == normalized_email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    existing_username = db.query(service.models.User).filter(service.models.User.username == normalized_username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken")

    verification_code = f"{secrets.randbelow(1_000_000):06d}"
    code_hash = hash_password(verification_code)
    password_hash = hash_password(user_data.password)
    ttl_minutes = max(
        1,
        int(
            get_int_setting(
                db,
                EMAIL_VERIFICATION_TTL_MINUTES_KEY,
                int(settings.EMAIL_VERIFICATION_TTL_MINUTES),
            )
        ),
    )
    expires_at = datetime.now(UTC) + timedelta(minutes=ttl_minutes)

    pending = db.query(PendingEmailVerification).filter(PendingEmailVerification.email == normalized_email).first()
    if pending:
        pending.username = normalized_username
        pending.password_hash = password_hash
        pending.code_hash = code_hash
        pending.attempt_count = 0
        pending.expires_at = expires_at
    else:
        pending = PendingEmailVerification(
            email=normalized_email,
            username=normalized_username,
            password_hash=password_hash,
            code_hash=code_hash,
            attempt_count=0,
            expires_at=expires_at,
        )
        db.add(pending)
    db.commit()

    try:
        send_verification_code_email(db, normalized_email, verification_code, ttl_minutes)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to send verification email: {exc}") from exc

    return {
        "detail": "Verification code sent",
        "expires_in_seconds": ttl_minutes * 60,
    }


@router.post("/register/verify-code", response_model=UserOutPrivate)
@limiter.limit("20/hour")
def register_verify_code(
    request: Request,
    payload: auth_schemas.RegisterVerifyCodeRequest,
    db: Session = Depends(get_db),
):
    if not get_bool_setting(db, REQUIRE_EMAIL_VERIFICATION_KEY, default=False):
        raise HTTPException(status_code=400, detail="Email verification is currently disabled by admin")

    pending = db.query(PendingEmailVerification).filter(PendingEmailVerification.email == payload.email).first()
    if not pending:
        raise HTTPException(status_code=404, detail="No pending verification for this email")
    if pending.expires_at < datetime.now(UTC):
        db.delete(pending)
        db.commit()
        raise HTTPException(status_code=400, detail="Verification code expired")
    if int(pending.attempt_count or 0) >= MAX_VERIFICATION_ATTEMPTS:
        db.delete(pending)
        db.commit()
        raise HTTPException(status_code=400, detail="Too many failed attempts. Request a new code.")

    if not verify_password(payload.code, pending.code_hash):
        pending.attempt_count = int(pending.attempt_count or 0) + 1
        db.commit()
        raise HTTPException(status_code=400, detail="Invalid verification code")

    existing_email = db.query(service.models.User).filter(service.models.User.email == pending.email).first()
    if existing_email:
        db.delete(pending)
        db.commit()
        raise HTTPException(status_code=400, detail="Email already registered")
    existing_username = db.query(service.models.User).filter(service.models.User.username == pending.username).first()
    if existing_username:
        db.delete(pending)
        db.commit()
        raise HTTPException(status_code=400, detail="Username already taken")

    user = service.create_user_with_hashed_password(
        db,
        username=pending.username,
        email=pending.email,
        hashed_password=pending.password_hash,
    )
    db.delete(pending)
    db.commit()
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
