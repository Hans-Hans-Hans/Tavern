# Import FastAPI and settings
from collections import defaultdict, deque
from datetime import UTC, datetime, timedelta
import imghdr
import os
import time

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.core.runtime_metrics import APP_STARTED_AT, APP_VERSION, uptime_seconds

app = FastAPI(title=settings.PROJECT_NAME)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_rate_limit_state: dict[str, deque[float]] = defaultdict(deque)
_rate_limit_rules = {
    ("POST", "/auth/login"): (12, 60),
    ("POST", "/auth/register"): (8, 3600),
    ("POST", "/auth/first-use-reset"): (8, 3600),
    ("POST", "/messages/"): (80, 60),
    ("POST", "/dms/"): (80, 60),
    ("POST", "/api/uploads/message-image"): (25, 60),
    ("POST", "/api/users/me/avatar"): (8, 300),
    ("POST", "/api/servers/"): (8, 300),
}


def _match_rate_limit(method: str, path: str):
    for (rule_method, prefix), (limit_count, window_sec) in _rate_limit_rules.items():
        if method == rule_method and path.startswith(prefix):
            return limit_count, window_sec
    return None


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    matched = _match_rate_limit(request.method.upper(), request.url.path)
    if matched:
        limit_count, window_sec = matched
        now = time.time()
        actor = request.client.host if request.client else "unknown"
        actor = f"{actor}:{request.headers.get('x-forwarded-for', '')}:{request.cookies.get('access_token', '')[:24]}"
        key = f"{request.method}:{request.url.path}:{actor}"
        bucket = _rate_limit_state[key]
        while bucket and now - bucket[0] > window_sec:
            bucket.popleft()
        if len(bucket) >= limit_count:
            retry_after = max(1, int(window_sec - (now - bucket[0])))
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded. Try again soon."},
                headers={"Retry-After": str(retry_after)},
            )
        bucket.append(now)
    return await call_next(request)


# --- Database Setup ---

from app.db.session import engine
from app.db.session import SessionLocal
from app.db.base import Base
from sqlalchemy import inspect, text
from app.core.security import hash_password

# IMPORT ALL MODELS FIRST
from app.features.users import models as users_models
from app.features.servers import models as servers_models
from app.features.channels import models as channels_models
from app.features.messages import models as messages_models
from app.features.dms import models as dms_models

# THEN create tables
Base.metadata.create_all(bind=engine)


def _ensure_messages_schema_updates():
    inspector = inspect(engine)
    try:
        message_columns = {col["name"] for col in inspector.get_columns("messages")}
    except Exception:
        message_columns = set()

    with engine.begin() as conn:
        if "parent_message_id" not in message_columns:
            conn.execute(text("ALTER TABLE messages ADD COLUMN parent_message_id INTEGER"))

    if not inspector.has_table("message_reactions"):
        from app.features.messages.models import MessageReaction  # noqa: F401
        Base.metadata.create_all(bind=engine, tables=[MessageReaction.__table__])


_ensure_messages_schema_updates()


def _ensure_core_schema_updates():
    inspector = inspect(engine)

    try:
        user_columns = {col["name"] for col in inspector.get_columns("users")}
    except Exception:
        user_columns = set()
    try:
        member_columns = {col["name"] for col in inspector.get_columns("server_members")}
    except Exception:
        member_columns = set()

    with engine.begin() as conn:
        if "is_superadmin" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN is_superadmin BOOLEAN DEFAULT 0"))
        if "must_reset_password" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN must_reset_password BOOLEAN DEFAULT 0"))
        if "role_id" not in member_columns:
            conn.execute(text("ALTER TABLE server_members ADD COLUMN role_id INTEGER"))
        if "nickname" not in member_columns:
            conn.execute(text("ALTER TABLE server_members ADD COLUMN nickname VARCHAR(50)"))

    if not inspector.has_table("server_roles"):
        from app.features.servers.models import ServerRole  # noqa: F401
        Base.metadata.create_all(bind=engine, tables=[ServerRole.__table__])
    if not inspector.has_table("friend_requests"):
        from app.features.users.models import FriendRequest  # noqa: F401
        Base.metadata.create_all(bind=engine, tables=[FriendRequest.__table__])


def _ensure_bootstrap_admin_user():
    db = SessionLocal()
    try:
        admin = db.query(users_models.User).filter(users_models.User.username == "admin").first()
        if admin:
            if not admin.is_superadmin:
                admin.is_superadmin = True
            db.commit()
            return

        seeded = users_models.User(
            username="admin",
            email="admin@tavern.local",
            hashed_password=hash_password("admin"),
            is_superadmin=True,
            must_reset_password=True,
        )
        db.add(seeded)
        db.commit()
    finally:
        db.close()


def _ensure_existing_server_roles():
    db = SessionLocal()
    try:
        from app.features.servers import service as servers_service
        servers = db.query(servers_models.Server).all()
        for server in servers:
            role_map = servers_service.ensure_default_roles(db, server.id)
            memberships = db.query(servers_models.ServerMember).filter(servers_models.ServerMember.server_id == server.id).all()
            changed = False
            for member in memberships:
                role_name = (member.role or "member").lower()
                role = role_map.get(role_name) or role_map.get("member")
                if role and member.role_id != role.id:
                    member.role_id = role.id
                    changed = True
            if changed:
                db.commit()
    finally:
        db.close()


_ensure_core_schema_updates()
_ensure_bootstrap_admin_user()
_ensure_existing_server_roles()


# --- Routers ---

from app.features.auth.router import router as auth_router
from app.features.users.router import router as users_router
from app.features.servers.router import router as servers_router
from app.features.channels.router import router as channels_router
from app.features.messages.router import router as messages_router
from app.features.dms.router import router as dms_router
from app.features.websockets.messages_ws import router as messages_ws_router
from app.features.websockets.voice_ws import router as voice_ws_router
from app.features.websockets.dm_messages_ws import router as dm_messages_ws_router
from app.features.websockets.dm_call_ws import router as dm_call_ws_router
from app.features.websockets.presence_ws import router as presence_ws_router
from app.features.websockets.messages_ws import manager as messages_ws_manager
from app.features.websockets.presence_ws import manager as presence_ws_manager
from app.features.websockets.voice_ws import manager as voice_ws_manager
from app.features.admin.router import router as admin_router

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(servers_router)
app.include_router(channels_router)
app.include_router(messages_router)
app.include_router(dms_router)
app.include_router(messages_ws_router)
app.include_router(voice_ws_router)
app.include_router(dm_messages_ws_router)
app.include_router(dm_call_ws_router)
app.include_router(presence_ws_router)
app.include_router(admin_router)

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "tavern-backend",
        "version": settings.VERSION or APP_VERSION,
        "started_at": APP_STARTED_AT.isoformat(),
        "uptime_seconds": uptime_seconds(),
        "realtime": {
            "presence_connections": len(presence_ws_manager.connections),
            "message_channels": len(messages_ws_manager.active_connections),
            "voice_channels": len(voice_ws_manager.channels),
        },
    }


@app.get("/api/meta")
async def app_meta():
    return {
        "version": settings.VERSION or APP_VERSION,
        "started_at": APP_STARTED_AT.isoformat(),
        "uptime_seconds": uptime_seconds(),
    }

from fastapi import Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from app.core.security import get_current_user
from app.db.deps import get_db
from sqlalchemy.orm import Session
from app.features.servers import service as server_service

# Serve the dashboard page
@app.get("/dashboard")
async def dashboard_page(current_user=Depends(get_current_user)):
    return FileResponse(CLIENT_PUBLIC_DIR / "dashboard.html")

# API endpoint for user info
@app.get("/api/dashboard")
async def dashboard_data(current_user=Depends(get_current_user)):
    return {
        "user": {
            "id": current_user.id,
            "public_id": current_user.public_id,
            "username": current_user.username,
            "email": current_user.email,
            "is_superadmin": current_user.is_superadmin,
            "must_reset_password": current_user.must_reset_password,
            "created_at": current_user.created_at,
            "updated_at": current_user.updated_at,
        }
    }

# Serve static files
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import uuid

# Get the root of the project
ROOT_DIR = Path(__file__).parent.parent.parent  # server/app/main.py -> root
CLIENT_PUBLIC_DIR = ROOT_DIR / "client" / "public"

# Verify that the path exists
if not CLIENT_PUBLIC_DIR.exists():
    raise RuntimeError(f"Client public folder not found: {CLIENT_PUBLIC_DIR}")

UPLOAD_DIR = ROOT_DIR / "server" / "uploads"
MESSAGE_UPLOAD_DIR = UPLOAD_DIR / "messages"
USER_AVATAR_DIR = UPLOAD_DIR / "avatars" / "users"
SERVER_AVATAR_DIR = UPLOAD_DIR / "avatars" / "servers"
MESSAGE_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
USER_AVATAR_DIR.mkdir(parents=True, exist_ok=True)
SERVER_AVATAR_DIR.mkdir(parents=True, exist_ok=True)


def _safe_image_suffix(content_type: str | None, filename: str | None) -> str:
    if content_type:
        mapped = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/gif": ".gif",
            "image/webp": ".webp",
        }.get(content_type.lower())
        if mapped:
            return mapped
    if filename and "." in filename:
        suffix = Path(filename).suffix.lower()
        if suffix in {".jpg", ".jpeg", ".png", ".gif", ".webp"}:
            return ".jpg" if suffix == ".jpeg" else suffix
    return ".png"


def _detect_image_kind(content: bytes) -> str | None:
    try:
        kind = imghdr.what(None, h=content)
    except Exception:
        kind = None
    if kind == "jpeg":
        return "jpeg"
    if kind in {"png", "gif", "webp"}:
        return kind
    return None


def _avatar_file_for_public_id(base_dir: Path, public_id: str) -> Path | None:
    matches = list(base_dir.glob(f"{public_id}.*"))
    return matches[0] if matches else None


@app.post("/api/uploads/message-image")
async def upload_message_image(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image uploads are allowed")
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image too large (max 10MB)")
    detected = _detect_image_kind(content)
    if not detected:
        raise HTTPException(status_code=400, detail="Invalid image file")
    suffix = _safe_image_suffix(file.content_type, file.filename)
    filename = f"{uuid.uuid4()}{suffix}"
    out_path = MESSAGE_UPLOAD_DIR / filename
    out_path.write_bytes(content)
    return {"url": f"/uploads/messages/{filename}"}


@app.post("/api/users/me/avatar")
async def upload_my_avatar(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image uploads are allowed")
    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Avatar too large (max 5MB)")
    if not _detect_image_kind(content):
        raise HTTPException(status_code=400, detail="Invalid image file")
    old = _avatar_file_for_public_id(USER_AVATAR_DIR, current_user.public_id)
    if old and old.exists():
        old.unlink()
    suffix = _safe_image_suffix(file.content_type, file.filename)
    out_path = USER_AVATAR_DIR / f"{current_user.public_id}{suffix}"
    out_path.write_bytes(content)
    return {"url": f"/api/users/{current_user.public_id}/avatar"}


@app.get("/api/users/{user_public_id}/avatar")
async def get_user_avatar(user_public_id: str):
    path = _avatar_file_for_public_id(USER_AVATAR_DIR, user_public_id)
    if not path:
        raise HTTPException(status_code=404, detail="Avatar not found")
    return FileResponse(path)


@app.post("/api/servers/{server_public_id}/avatar")
async def upload_server_avatar(
    server_public_id: str,
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    server = server_service.get_server_by_public_id(db, server_public_id)
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
    if not server_service.has_server_permission(db, server.id, current_user.id, "can_manage_server"):
        raise HTTPException(status_code=403, detail="Not authorized")
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image uploads are allowed")
    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Avatar too large (max 5MB)")
    if not _detect_image_kind(content):
        raise HTTPException(status_code=400, detail="Invalid image file")
    old = _avatar_file_for_public_id(SERVER_AVATAR_DIR, server_public_id)
    if old and old.exists():
        old.unlink()
    suffix = _safe_image_suffix(file.content_type, file.filename)
    out_path = SERVER_AVATAR_DIR / f"{server_public_id}{suffix}"
    out_path.write_bytes(content)
    return {"url": f"/api/servers/{server_public_id}/avatar"}


@app.get("/api/servers/{server_public_id}/avatar")
async def get_server_avatar(server_public_id: str):
    path = _avatar_file_for_public_id(SERVER_AVATAR_DIR, server_public_id)
    if not path:
        raise HTTPException(status_code=404, detail="Avatar not found")
    return FileResponse(path)

# Serve static frontend files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR, html=False), name="uploads")
app.mount("/", StaticFiles(directory=CLIENT_PUBLIC_DIR, html=True), name="frontend")
