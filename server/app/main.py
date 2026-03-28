# Import FastAPI and settings
from datetime import UTC, datetime, timedelta
import json
import mimetypes
import os
import platform
import re
from urllib.parse import unquote

from fastapi import FastAPI, Request
from app.core.config import settings
from app.core.runtime_metrics import APP_STARTED_AT, APP_VERSION, uptime_seconds, count_voice_joins
from app.core.rate_limit import limiter
from app.core.uploads import strip_image_metadata_bytes

app = FastAPI(title=settings.PROJECT_NAME, docs_url=None, redoc_url=None)
app.state.limiter = limiter

from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler

app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Database Setup ---

from app.db.session import engine
from app.db.session import SessionLocal
from app.db.base import Base
from sqlalchemy import inspect, text
from app.core.security import hash_password
from app.core.audit import write_audit_event

# IMPORT ALL MODELS FIRST
from app.features.users import models as users_models
from app.features.servers import models as servers_models
from app.features.channels import models as channels_models
from app.features.messages import models as messages_models
from app.features.dms import models as dms_models
from app.features.push import models as push_models
from app.features.auth import models as auth_models
from app.core import models as core_models

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
        if "is_pinned" not in message_columns:
            conn.execute(text("ALTER TABLE messages ADD COLUMN is_pinned BOOLEAN DEFAULT 0"))
        if "pinned_at" not in message_columns:
            conn.execute(text("ALTER TABLE messages ADD COLUMN pinned_at DATETIME"))
        if "pinned_by_user_id" not in message_columns:
            conn.execute(text("ALTER TABLE messages ADD COLUMN pinned_by_user_id INTEGER"))

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
    try:
        channel_columns = {col["name"] for col in inspector.get_columns("channels")}
    except Exception:
        channel_columns = set()
    try:
        server_columns = {col["name"] for col in inspector.get_columns("servers")}
    except Exception:
        server_columns = set()

    with engine.begin() as conn:
        if "is_superadmin" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN is_superadmin BOOLEAN DEFAULT 0"))
        if "must_reset_password" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN must_reset_password BOOLEAN DEFAULT 0"))
        if "last_announcement_version" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN last_announcement_version INTEGER DEFAULT 0"))
        if "has_seen_tutorial" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN has_seen_tutorial BOOLEAN DEFAULT 0"))
        if "username_color" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN username_color VARCHAR(16)"))
        if "name_emoji" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN name_emoji VARCHAR(16)"))
        if "custom_status" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN custom_status VARCHAR(140)"))
        if "strip_upload_metadata" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN strip_upload_metadata BOOLEAN DEFAULT 0"))
        if "appearance_settings" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN appearance_settings TEXT"))
        if "discord_oauth_client_id" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN discord_oauth_client_id VARCHAR(120)"))
        if "discord_oauth_client_secret" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN discord_oauth_client_secret VARCHAR(240)"))
        if "discord_oauth_redirect_uri" not in user_columns:
            conn.execute(text("ALTER TABLE users ADD COLUMN discord_oauth_redirect_uri VARCHAR(500)"))
        if "role_id" not in member_columns:
            conn.execute(text("ALTER TABLE server_members ADD COLUMN role_id INTEGER"))
        if "nickname" not in member_columns:
            conn.execute(text("ALTER TABLE server_members ADD COLUMN nickname VARCHAR(50)"))
        if "battlemap_state" not in channel_columns:
            conn.execute(text("ALTER TABLE channels ADD COLUMN battlemap_state TEXT"))
        if "category_id" not in channel_columns:
            conn.execute(text("ALTER TABLE channels ADD COLUMN category_id INTEGER"))
        if "position" not in channel_columns:
            conn.execute(text("ALTER TABLE channels ADD COLUMN position INTEGER DEFAULT 0"))
        if "max_upload_size_mb" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN max_upload_size_mb INTEGER"))
        if "log_retention_days" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN log_retention_days INTEGER"))
        if "message_retention_days" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN message_retention_days INTEGER"))
        if "strip_upload_metadata" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN strip_upload_metadata BOOLEAN DEFAULT 0"))
        if "automod_enabled" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN automod_enabled BOOLEAN DEFAULT 0"))
        if "automod_block_external_links" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN automod_block_external_links BOOLEAN DEFAULT 0"))
        if "automod_block_invite_links" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN automod_block_invite_links BOOLEAN DEFAULT 0"))
        if "automod_blocked_terms" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN automod_blocked_terms VARCHAR(4000)"))
        if "automod_blocked_extensions" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN automod_blocked_extensions VARCHAR(1000)"))
        if "channel_layout" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN channel_layout VARCHAR(16000)"))
        if "channel_separators" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN channel_separators VARCHAR(16000)"))
        if "channel_separator_collapsed" not in server_columns:
            conn.execute(text("ALTER TABLE servers ADD COLUMN channel_separator_collapsed VARCHAR(16000)"))

    if not inspector.has_table("server_roles"):
        from app.features.servers.models import ServerRole  # noqa: F401
        Base.metadata.create_all(bind=engine, tables=[ServerRole.__table__])
    if not inspector.has_table("channel_categories"):
        from app.features.channels.models import ChannelCategory  # noqa: F401
        Base.metadata.create_all(bind=engine, tables=[ChannelCategory.__table__])
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
from app.features.push.router import router as push_router
from app.features.discord_bot.router import router as discord_router
from app.features.discord_bot.service import discord_bot_manager

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
app.include_router(push_router)
app.include_router(discord_router)


@app.on_event("startup")
async def _startup_discord_bot():
    await discord_bot_manager.start_if_configured()


@app.on_event("shutdown")
async def _shutdown_discord_bot():
    await discord_bot_manager.stop()

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
        "process": {
            "pid": os.getpid(),
            "python": platform.python_version(),
            "platform": platform.platform(),
        },
        "metrics": {
            "voice_joins_24h": count_voice_joins(24),
        },
    }


@app.get("/api/meta")
async def app_meta():
    return {
        "version": settings.VERSION or APP_VERSION,
        "started_at": APP_STARTED_AT.isoformat(),
        "uptime_seconds": uptime_seconds(),
    }

from fastapi import Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse, Response
from app.core.security import get_current_user
from app.db.deps import get_db
from sqlalchemy.orm import Session
from app.features.servers import service as server_service


def _safe_parse_json_object(raw_value: str | None) -> dict | None:
    if not raw_value:
        return None
    try:
        parsed = json.loads(raw_value)
    except Exception:
        return None
    return parsed if isinstance(parsed, dict) else None

# Serve the dashboard page
@app.get("/dashboard")
async def dashboard_page(current_user=Depends(get_current_user)):
    return FileResponse(CLIENT_PUBLIC_DIR / "dashboard.html")


@app.get("/docs")
async def docs_page():
    return FileResponse(CLIENT_PUBLIC_DIR / "docs.html")

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
            "has_seen_tutorial": current_user.has_seen_tutorial,
            "username_color": current_user.username_color,
            "name_emoji": current_user.name_emoji,
            "custom_status": current_user.custom_status,
            "strip_upload_metadata": bool(getattr(current_user, "strip_upload_metadata", False)),
            "appearance_settings": _safe_parse_json_object(current_user.appearance_settings),
            "created_at": current_user.created_at,
            "updated_at": current_user.updated_at,
        }
    }

# Serve static files
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import uuid

# Get the root of the project
ROOT_DIR = Path(os.getenv("TAVERN_ROOT_DIR") or Path(__file__).parent.parent.parent)  # server/app/main.py -> root
CLIENT_PUBLIC_DIR = ROOT_DIR / "client" / "public"

# Verify that the path exists
if not CLIENT_PUBLIC_DIR.exists():
    raise RuntimeError(f"Client public folder not found: {CLIENT_PUBLIC_DIR}")

UPLOAD_DIR = ROOT_DIR / "server" / "uploads"
MESSAGE_UPLOAD_DIR = UPLOAD_DIR / "messages"
MESSAGE_FILE_UPLOAD_DIR = MESSAGE_UPLOAD_DIR / "files"
MESSAGE_TMP_UPLOAD_DIR = MESSAGE_UPLOAD_DIR / ".tmp"
USER_AVATAR_DIR = UPLOAD_DIR / "avatars" / "users"
SERVER_AVATAR_DIR = UPLOAD_DIR / "avatars" / "servers"
MESSAGE_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MESSAGE_FILE_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MESSAGE_TMP_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
USER_AVATAR_DIR.mkdir(parents=True, exist_ok=True)
SERVER_AVATAR_DIR.mkdir(parents=True, exist_ok=True)


def _extract_asset_version_from_html(html_text: str, pattern: str) -> str | None:
    match = re.search(pattern, html_text, flags=re.IGNORECASE)
    if not match:
        return None
    return str(match.group(1) or "").strip() or None


def _load_frontend_version_info() -> dict:
    index_path = CLIENT_PUBLIC_DIR / "index.html"
    dashboard_path = CLIENT_PUBLIC_DIR / "dashboard.html"
    dashboard_js_path = CLIENT_PUBLIC_DIR / "src" / "dashboard.js"
    result = {
        "manifest": None,
        "app_js": None,
        "dashboard_js": None,
        "service_worker": None,
    }
    try:
        index_text = index_path.read_text(encoding="utf-8", errors="replace")
        result["manifest"] = _extract_asset_version_from_html(
            index_text,
            r'manifest\.webmanifest\?v=([^"\']+)',
        )
        result["app_js"] = _extract_asset_version_from_html(
            index_text,
            r'src/app\.js\?v=([^"\']+)',
        )
    except Exception:
        pass
    try:
        dashboard_text = dashboard_path.read_text(encoding="utf-8", errors="replace")
        result["dashboard_js"] = _extract_asset_version_from_html(
            dashboard_text,
            r'src/dashboard\.js\?v=([^"\']+)',
        )
        if result["manifest"] is None:
            result["manifest"] = _extract_asset_version_from_html(
                dashboard_text,
                r'manifest\.webmanifest\?v=([^"\']+)',
            )
    except Exception:
        pass
    try:
        dashboard_js_text = dashboard_js_path.read_text(encoding="utf-8", errors="replace")
        sw_match = re.search(r'SERVICE_WORKER_URL\s*=\s*"[^"]+\?v=([^"]+)"', dashboard_js_text)
        if sw_match:
            result["service_worker"] = str(sw_match.group(1) or "").strip() or None
    except Exception:
        pass
    return result


def _safe_image_suffix(
    content_type: str | None,
    filename: str | None,
    *,
    detected_kind: str | None = None,
) -> str:
    if detected_kind:
        detected_map = {
            "jpeg": ".jpg",
            "png": ".png",
            "gif": ".gif",
            "webp": ".webp",
        }
        mapped = detected_map.get(str(detected_kind).lower())
        if mapped:
            return mapped
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
    # Python 3.13 removed imghdr, so use lightweight magic-byte checks.
    if content.startswith(b"\xff\xd8\xff"):
        return "jpeg"
    if content.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if content.startswith((b"GIF87a", b"GIF89a")):
        return "gif"
    if len(content) >= 12 and content[:4] == b"RIFF" and content[8:12] == b"WEBP":
        return "webp"
    return None


def _should_strip_upload_metadata(server: servers_models.Server | None, user: users_models.User | None) -> bool:
    return bool(getattr(server, "strip_upload_metadata", False)) or bool(getattr(user, "strip_upload_metadata", False))


def _strip_image_metadata_if_needed(strip_enabled: bool, content: bytes) -> bytes:
    if not strip_enabled:
        return content
    if not _detect_image_kind(content):
        return content
    return strip_image_metadata_bytes(content)


def _strip_image_metadata_file_if_needed(strip_enabled: bool, path: Path):
    if not strip_enabled:
        return
    try:
        content = path.read_bytes()
    except Exception:
        return
    if not _detect_image_kind(content):
        return
    stripped = strip_image_metadata_bytes(content)
    if stripped and stripped != content:
        try:
            path.write_bytes(stripped)
        except Exception:
            return


def _safe_upload_suffix(filename: str | None, content_type: str | None) -> str:
    suffix = Path(filename or "").suffix.lower()
    if suffix and len(suffix) <= 20 and re.fullmatch(r"\.[a-z0-9._+-]+", suffix):
        return suffix
    guessed = mimetypes.guess_extension((content_type or "").split(";")[0].strip().lower())
    if guessed and len(guessed) <= 20 and re.fullmatch(r"\.[a-z0-9._+-]+", guessed):
        return guessed
    return ""


def _display_upload_name(filename: str | None) -> str:
    name = Path(filename or "").name.strip()
    if not name:
        return "attachment"
    return name[:255]


def _resolve_channel_and_server_for_upload(
    db: Session,
    *,
    channel_public_id: str,
    user_id: int,
    is_superadmin: bool,
):
    channel = db.query(channels_models.Channel).filter(channels_models.Channel.public_id == channel_public_id).first()
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    if str(channel.type or "").lower() != "text":
        raise HTTPException(status_code=400, detail="File uploads are only allowed in text channels")
    if not is_superadmin:
        membership = db.query(servers_models.ServerMember).filter(
            servers_models.ServerMember.server_id == channel.server_id,
            servers_models.ServerMember.user_id == user_id,
        ).first()
        if not membership:
            raise HTTPException(status_code=403, detail="Not authorized")
    server = db.query(servers_models.Server).filter(servers_models.Server.id == channel.server_id).first()
    return channel, server


def _enforce_server_upload_size_limit(server: servers_models.Server | None, content_len: int):
    limit_mb = int(getattr(server, "max_upload_size_mb", 0) or 0)
    if limit_mb <= 0:
        return
    limit_bytes = limit_mb * 1024 * 1024
    if content_len > limit_bytes:
        raise HTTPException(status_code=413, detail=f"File too large for this server (max {limit_mb}MB)")


def _server_upload_limit_bytes(server: servers_models.Server | None) -> int | None:
    limit_mb = int(getattr(server, "max_upload_size_mb", 0) or 0)
    if limit_mb <= 0:
        return None
    return limit_mb * 1024 * 1024


def _parse_server_blocked_extensions(server: servers_models.Server | None) -> set[str]:
    if not server or not bool(getattr(server, "automod_enabled", False)):
        return set()
    raw = str(getattr(server, "automod_blocked_extensions", "") or "")
    values = set()
    for token in re.split(r"[\n,;]+", raw):
        normalized = token.strip().lower().lstrip(".")
        if normalized:
            values.add(normalized)
    return values


def _enforce_server_upload_extension_policy(server: servers_models.Server | None, filename: str | None):
    blocked = _parse_server_blocked_extensions(server)
    if not blocked:
        return
    suffix = Path(filename or "").suffix.lower().lstrip(".")
    if suffix and suffix in blocked:
        raise HTTPException(status_code=400, detail=f"AutoMod blocked file upload: '.{suffix}' files are not allowed")


async def _write_request_stream_to_path(
    request: Request,
    out_path: Path,
    *,
    max_bytes: int | None = None,
) -> int:
    tmp_path = out_path.with_name(f"{out_path.name}.part")
    total = 0
    try:
        with tmp_path.open("wb") as fh:
            async for chunk in request.stream():
                if not chunk:
                    continue
                total += len(chunk)
                if max_bytes is not None and total > max_bytes:
                    raise HTTPException(status_code=413, detail=f"File too large for this server (max {max_bytes // (1024 * 1024)}MB)")
                fh.write(chunk)
        if total <= 0:
            raise HTTPException(status_code=400, detail="Empty files are not allowed")
        tmp_path.replace(out_path)
        return total
    except Exception:
        try:
            tmp_path.unlink(missing_ok=True)
        except Exception:
            pass
        raise


async def _write_uploadfile_to_path(
    upload_file: UploadFile,
    out_path: Path,
    *,
    max_bytes: int | None = None,
) -> int:
    tmp_path = out_path.with_name(f"{out_path.name}.part")
    total = 0
    try:
        await upload_file.seek(0)
        with tmp_path.open("wb") as fh:
            while True:
                chunk = await upload_file.read(1024 * 1024)
                if not chunk:
                    break
                total += len(chunk)
                if max_bytes is not None and total > max_bytes:
                    raise HTTPException(status_code=413, detail=f"File too large for this server (max {max_bytes // (1024 * 1024)}MB)")
                fh.write(chunk)
        if total <= 0:
            raise HTTPException(status_code=400, detail="Empty files are not allowed")
        tmp_path.replace(out_path)
        return total
    except Exception:
        try:
            tmp_path.unlink(missing_ok=True)
        except Exception:
            pass
        raise
    finally:
        try:
            await upload_file.close()
        except Exception:
            pass


def _upload_session_paths(upload_id: str) -> tuple[Path, Path]:
    safe_id = str(upload_id or "").strip()
    if not re.fullmatch(r"[0-9a-fA-F-]{8,64}", safe_id):
        raise HTTPException(status_code=400, detail="Invalid upload session")
    meta_path = MESSAGE_TMP_UPLOAD_DIR / f"{safe_id}.json"
    data_path = MESSAGE_TMP_UPLOAD_DIR / f"{safe_id}.bin"
    return meta_path, data_path


def _read_upload_session(upload_id: str) -> dict:
    meta_path, data_path = _upload_session_paths(upload_id)
    if not meta_path.exists():
        raise HTTPException(status_code=404, detail="Upload session not found")
    try:
        meta = json.loads(meta_path.read_text(encoding="utf-8"))
    except Exception:
        raise HTTPException(status_code=500, detail="Upload session metadata is invalid")
    meta["_meta_path"] = meta_path
    meta["_data_path"] = data_path
    return meta


def _write_upload_session(meta: dict):
    meta_path = meta.get("_meta_path")
    if not isinstance(meta_path, Path):
        raise HTTPException(status_code=500, detail="Upload session metadata path missing")
    serialized = {k: v for k, v in meta.items() if not str(k).startswith("_")}
    meta_path.write_text(json.dumps(serialized, ensure_ascii=True), encoding="utf-8")


def _delete_upload_session(meta: dict):
    for key in ("_meta_path", "_data_path"):
        path = meta.get(key)
        if isinstance(path, Path):
            try:
                path.unlink(missing_ok=True)
            except Exception:
                pass


def _avatar_files_for_public_id(base_dir: Path, public_id: str) -> list[Path]:
    files = [path for path in base_dir.glob(f"{public_id}.*") if path.is_file()]
    files.sort(key=lambda path: path.stat().st_mtime, reverse=True)
    return files


def _avatar_file_for_public_id(base_dir: Path, public_id: str) -> Path | None:
    files = _avatar_files_for_public_id(base_dir, public_id)
    return files[0] if files else None


def _default_user_avatar_svg(public_id: str) -> bytes:
    # Deterministic color so users without avatars still look distinct.
    seed = sum(ord(ch) for ch in (public_id or "")) % 360
    bg = f"hsl({seed} 55% 42%)"
    ring = f"hsl({seed} 65% 62%)"
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" role="img" aria-label="Default profile avatar">
<rect width="256" height="256" rx="128" fill="{bg}"/>
<circle cx="128" cy="98" r="42" fill="rgba(255,255,255,0.92)"/>
<path d="M52 222c6-40 34-70 76-70s70 30 76 70" fill="none" stroke="rgba(255,255,255,0.92)" stroke-width="24" stroke-linecap="round"/>
<circle cx="128" cy="128" r="118" fill="none" stroke="{ring}" stroke-width="4" opacity="0.5"/>
</svg>"""
    return svg.encode("utf-8")


@app.post("/api/uploads/message-image")
@limiter.limit("25/minute")
async def upload_message_image(
    request: Request,
    file: UploadFile = File(...),
    channel_public_id: str | None = Form(None),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    server = None
    if channel_public_id:
        _channel, server = _resolve_channel_and_server_for_upload(
            db,
            channel_public_id=channel_public_id,
            user_id=current_user.id,
            is_superadmin=bool(current_user.is_superadmin),
        )
    content = await file.read()
    strip_enabled = _should_strip_upload_metadata(server, current_user)
    content = _strip_image_metadata_if_needed(strip_enabled, content)
    if server is not None:
        _enforce_server_upload_size_limit(server, len(content))
    if file.content_type and file.content_type.startswith("image/"):
        detected = _detect_image_kind(content)
        if not detected:
            raise HTTPException(status_code=400, detail="Invalid image file")
        suffix = _safe_image_suffix(file.content_type, file.filename, detected_kind=detected)
        filename = f"{uuid.uuid4()}{suffix}"
        out_path = MESSAGE_UPLOAD_DIR / filename
        out_path.write_bytes(content)
        return {"url": f"/uploads/messages/{filename}"}

    # Backward-compatible fallback: if a non-image is sent to this route,
    # store it as a generic attachment instead of rejecting it.
    if not content:
        raise HTTPException(status_code=400, detail="Empty files are not allowed")
    display_name = _display_upload_name(file.filename)
    _enforce_server_upload_extension_policy(server, display_name)
    suffix = _safe_upload_suffix(file.filename, file.content_type)
    stored_name = f"{uuid.uuid4()}{suffix}"
    out_path = MESSAGE_FILE_UPLOAD_DIR / stored_name
    out_path.write_bytes(content)
    return {"url": f"/uploads/messages/files/{stored_name}", "name": display_name}


@app.post("/api/uploads/message-file")
@limiter.limit("25/minute")
async def upload_message_file(
    request: Request,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    channel_public_id = str(request.query_params.get("channel_public_id") or "").strip()
    content_type = str(request.headers.get("content-type") or "").strip().lower()
    filename_hint = str(request.query_params.get("filename") or "").strip()
    encoded_name_header = str(request.headers.get("x-upload-filename") or "").strip()
    incoming_upload: UploadFile | None = None
    effective_content_type = content_type or None

    if content_type.startswith("multipart/form-data"):
        # Backward compatibility for cached clients still using FormData.
        form = await request.form(max_part_size=1024 * 1024 * 1024)
        if not channel_public_id:
            channel_public_id = str(form.get("channel_public_id") or "").strip()
        possible_file = form.get("file")
        if isinstance(possible_file, UploadFile):
            incoming_upload = possible_file
            if possible_file.content_type:
                effective_content_type = possible_file.content_type
            if possible_file.filename and not filename_hint and not encoded_name_header:
                filename_hint = possible_file.filename

    if not channel_public_id:
        raise HTTPException(status_code=400, detail="Missing channel_public_id")

    _channel, server = _resolve_channel_and_server_for_upload(
        db,
        channel_public_id=channel_public_id,
        user_id=current_user.id,
        is_superadmin=bool(current_user.is_superadmin),
    )

    display_name = _display_upload_name(
        unquote(encoded_name_header) if encoded_name_header else (unquote(filename_hint) if filename_hint else None)
    )
    _enforce_server_upload_extension_policy(server, display_name)
    suffix = _safe_upload_suffix(display_name, effective_content_type)
    stored_name = f"{uuid.uuid4()}{suffix}"
    out_path = MESSAGE_FILE_UPLOAD_DIR / stored_name
    max_bytes = _server_upload_limit_bytes(server)
    if incoming_upload is not None:
        await _write_uploadfile_to_path(incoming_upload, out_path, max_bytes=max_bytes)
    else:
        await _write_request_stream_to_path(request, out_path, max_bytes=max_bytes)
    strip_enabled = _should_strip_upload_metadata(server, current_user)
    _strip_image_metadata_file_if_needed(strip_enabled, out_path)
    return {"url": f"/uploads/messages/files/{stored_name}", "name": display_name}


@app.post("/api/uploads/message-file/init")
@limiter.limit("40/minute")
async def init_message_file_upload(
    request: Request,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    channel_public_id = str(request.query_params.get("channel_public_id") or "").strip()
    if not channel_public_id:
        raise HTTPException(status_code=400, detail="Missing channel_public_id")
    _channel, server = _resolve_channel_and_server_for_upload(
        db,
        channel_public_id=channel_public_id,
        user_id=current_user.id,
        is_superadmin=bool(current_user.is_superadmin),
    )
    payload = await request.json()
    filename = _display_upload_name(str(payload.get("filename") or "").strip() or None)
    _enforce_server_upload_extension_policy(server, filename)
    content_type = str(payload.get("content_type") or "").strip() or None
    total_size = int(payload.get("total_size") or 0)
    if total_size < 0:
        raise HTTPException(status_code=400, detail="Invalid total_size")
    max_bytes = _server_upload_limit_bytes(server)
    if max_bytes is not None and total_size > 0 and total_size > max_bytes:
        raise HTTPException(status_code=413, detail=f"File too large for this server (max {max_bytes // (1024 * 1024)}MB)")

    upload_id = str(uuid.uuid4())
    meta_path, data_path = _upload_session_paths(upload_id)
    session = {
        "_meta_path": meta_path,
        "_data_path": data_path,
        "upload_id": upload_id,
        "user_id": current_user.id,
        "channel_public_id": channel_public_id,
        "filename": filename,
        "content_type": content_type,
        "bytes_written": 0,
        "next_index": 0,
        "max_bytes": max_bytes,
        "total_size": total_size,
        "created_at": int(datetime.now(UTC).timestamp()),
    }
    _write_upload_session(session)
    data_path.touch(exist_ok=True)
    # Smaller chunks are more reliable over WAN links/proxies.
    return {"upload_id": upload_id, "chunk_size": 2 * 1024 * 1024}


@app.post("/api/uploads/message-file/chunk")
@limiter.limit("1200/minute")
async def upload_message_file_chunk(
    request: Request,
    current_user=Depends(get_current_user),
):
    upload_id = str(request.query_params.get("upload_id") or "").strip()
    index = int(request.query_params.get("index") or -1)
    if index < 0:
        raise HTTPException(status_code=400, detail="Missing chunk index")
    session = _read_upload_session(upload_id)
    if int(session.get("user_id") or 0) != int(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized")
    next_index = int(session.get("next_index") or 0)
    if index != next_index:
        raise HTTPException(status_code=409, detail="Chunk index out of order")
    data_path = session["_data_path"]
    max_bytes = session.get("max_bytes")
    bytes_written = int(session.get("bytes_written") or 0)
    chunk_bytes = 0
    with data_path.open("ab") as fh:
        async for chunk in request.stream():
            if not chunk:
                continue
            chunk_bytes += len(chunk)
            bytes_written += len(chunk)
            if max_bytes is not None and bytes_written > int(max_bytes):
                _delete_upload_session(session)
                raise HTTPException(status_code=413, detail=f"File too large for this server (max {int(max_bytes) // (1024 * 1024)}MB)")
            fh.write(chunk)
    if chunk_bytes <= 0:
        raise HTTPException(status_code=400, detail="Empty chunk")
    session["bytes_written"] = bytes_written
    session["next_index"] = next_index + 1
    _write_upload_session(session)
    return {"received_bytes": bytes_written, "next_index": session["next_index"]}


@app.post("/api/uploads/message-file/complete")
@limiter.limit("40/minute")
async def complete_message_file_upload(
    request: Request,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    upload_id = str(request.query_params.get("upload_id") or "").strip()
    session = _read_upload_session(upload_id)
    if int(session.get("user_id") or 0) != int(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized")
    bytes_written = int(session.get("bytes_written") or 0)
    if bytes_written <= 0:
        _delete_upload_session(session)
        raise HTTPException(status_code=400, detail="Empty file")
    display_name = _display_upload_name(session.get("filename"))
    suffix = _safe_upload_suffix(display_name, session.get("content_type"))
    stored_name = f"{uuid.uuid4()}{suffix}"
    out_path = MESSAGE_FILE_UPLOAD_DIR / stored_name
    session["_data_path"].replace(out_path)
    try:
        session["_meta_path"].unlink(missing_ok=True)
    except Exception:
        pass
    channel_public_id = str(session.get("channel_public_id") or "").strip()
    server_public_id = None
    server = None
    if channel_public_id:
        channel = db.query(channels_models.Channel).filter(channels_models.Channel.public_id == channel_public_id).first()
        if channel:
            server = db.query(servers_models.Server).filter(servers_models.Server.id == channel.server_id).first()
            server_public_id = server.public_id if server else None
    strip_enabled = _should_strip_upload_metadata(server, current_user)
    _strip_image_metadata_file_if_needed(strip_enabled, out_path)
    write_audit_event(
        event_type="message_file_upload_completed",
        actor_user_id=current_user.id,
        actor_public_id=current_user.public_id,
        target={
            "channel_public_id": channel_public_id or None,
            "server_public_id": server_public_id,
            "file_name": display_name,
        },
        details={"bytes": bytes_written},
    )
    return {"url": f"/uploads/messages/files/{stored_name}", "name": display_name}


@app.post("/api/uploads/message-file/abort")
@limiter.limit("60/minute")
async def abort_message_file_upload(
    request: Request,
    current_user=Depends(get_current_user),
):
    upload_id = str(request.query_params.get("upload_id") or "").strip()
    session = _read_upload_session(upload_id)
    if int(session.get("user_id") or 0) != int(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized")
    _delete_upload_session(session)
    return {"detail": "Upload aborted"}


@app.post("/api/users/me/avatar")
@limiter.limit("8/5minute")
async def upload_my_avatar(
    request: Request,
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image uploads are allowed")
    content = await file.read()
    strip_enabled = _should_strip_upload_metadata(None, current_user)
    content = _strip_image_metadata_if_needed(strip_enabled, content)
    detected = _detect_image_kind(content)
    if not detected:
        raise HTTPException(status_code=400, detail="Invalid image file")
    for old in _avatar_files_for_public_id(USER_AVATAR_DIR, current_user.public_id):
        try:
            old.unlink()
        except FileNotFoundError:
            pass
    suffix = _safe_image_suffix(file.content_type, file.filename, detected_kind=detected)
    out_path = USER_AVATAR_DIR / f"{current_user.public_id}{suffix}"
    out_path.write_bytes(content)
    cache_bust = int(datetime.now(UTC).timestamp())
    return {"url": f"/api/users/{current_user.public_id}/avatar?v={cache_bust}"}


@app.get("/api/users/{user_public_id}/avatar")
async def get_user_avatar(user_public_id: str):
    path = _avatar_file_for_public_id(USER_AVATAR_DIR, user_public_id)
    if not path:
        return Response(
            content=_default_user_avatar_svg(user_public_id),
            media_type="image/svg+xml",
            headers={"Cache-Control": "no-store"},
        )
    return FileResponse(path, headers={"Cache-Control": "no-store"})


@app.post("/api/servers/{server_public_id}/avatar")
@limiter.limit("8/5minute")
async def upload_server_avatar(
    request: Request,
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
    strip_enabled = _should_strip_upload_metadata(server, current_user)
    content = _strip_image_metadata_if_needed(strip_enabled, content)
    detected = _detect_image_kind(content)
    if not detected:
        raise HTTPException(status_code=400, detail="Invalid image file")
    for old in _avatar_files_for_public_id(SERVER_AVATAR_DIR, server_public_id):
        try:
            old.unlink()
        except FileNotFoundError:
            pass
    suffix = _safe_image_suffix(file.content_type, file.filename, detected_kind=detected)
    out_path = SERVER_AVATAR_DIR / f"{server_public_id}{suffix}"
    out_path.write_bytes(content)
    cache_bust = int(datetime.now(UTC).timestamp())
    return {"url": f"/api/servers/{server_public_id}/avatar?v={cache_bust}"}


@app.get("/api/servers/{server_public_id}/avatar")
async def get_server_avatar(server_public_id: str):
    path = _avatar_file_for_public_id(SERVER_AVATAR_DIR, server_public_id)
    if not path:
        raise HTTPException(status_code=404, detail="Avatar not found")
    return FileResponse(path)


@app.get("/api/version")
async def version_info():
    frontend = _load_frontend_version_info()
    return {
        "server": {
            "name": settings.PROJECT_NAME,
            "version": settings.VERSION or APP_VERSION,
            "started_at": APP_STARTED_AT.isoformat(),
            "uptime_seconds": uptime_seconds(),
        },
        "frontend": frontend,
        "cache_version": (
            frontend.get("dashboard_js")
            or frontend.get("app_js")
            or frontend.get("manifest")
            or frontend.get("service_worker")
        ),
    }

# Serve static frontend files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR, html=False), name="uploads")
app.mount("/", StaticFiles(directory=CLIENT_PUBLIC_DIR, html=True), name="frontend")
