from datetime import UTC, datetime
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import get_current_user
from app.db.deps import get_db
from app.features.channels import service as channels_service
from app.features.discord_bot import schemas
from app.features.discord_bot.service import (
    discord_bot_manager,
    discord_oauth_store,
    discord_oauth_start_url,
    exchange_discord_code_for_token,
    fetch_discord_oauth_user,
    fetch_discord_user_guilds,
)
from app.features.users.models import User


router = APIRouter(prefix="/discord", tags=["Discord Bot"])


def require_superadmin(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_superadmin:
        raise HTTPException(status_code=403, detail="Superadmin access required")
    return current_user


def _require_oauth_configured():
    if not settings.DISCORD_OAUTH_CLIENT_ID or not settings.DISCORD_OAUTH_CLIENT_SECRET or not settings.DISCORD_OAUTH_REDIRECT_URI:
        raise HTTPException(
            status_code=400,
            detail="Discord OAuth is not configured. Set DISCORD_OAUTH_CLIENT_ID, DISCORD_OAUTH_CLIENT_SECRET, and DISCORD_OAUTH_REDIRECT_URI.",
        )


@router.get("/oauth/start")
def discord_oauth_start(current_user: User = Depends(get_current_user)):
    _require_oauth_configured()
    state = discord_oauth_store.new_state(current_user.id)
    url = discord_oauth_start_url(
        state=state,
        redirect_uri=settings.DISCORD_OAUTH_REDIRECT_URI,
        client_id=settings.DISCORD_OAUTH_CLIENT_ID,
    )
    return RedirectResponse(url=url, status_code=302)


@router.get("/oauth/callback", response_class=HTMLResponse)
def discord_oauth_callback(code: str | None = None, state: str | None = None, error: str | None = None):
    if error:
        return HTMLResponse(f"<html><body><h3>Discord OAuth failed: {error}</h3></body></html>", status_code=400)
    if not code or not state:
        return HTMLResponse("<html><body><h3>Missing OAuth code/state.</h3></body></html>", status_code=400)
    _require_oauth_configured()
    user_id = discord_oauth_store.consume_state(state)
    if not user_id:
        return HTMLResponse("<html><body><h3>OAuth state expired or invalid. Please retry.</h3></body></html>", status_code=400)
    try:
        token_data = exchange_discord_code_for_token(
            code=code,
            redirect_uri=settings.DISCORD_OAUTH_REDIRECT_URI,
            client_id=settings.DISCORD_OAUTH_CLIENT_ID,
            client_secret=settings.DISCORD_OAUTH_CLIENT_SECRET,
        )
        access_token = str(token_data.get("access_token") or "")
        if not access_token:
            raise RuntimeError("No access token returned")
        user_data = fetch_discord_oauth_user(access_token)
        discord_oauth_store.save_token(user_id, token_data, user_data)
    except Exception as exc:
        return HTMLResponse(f"<html><body><h3>Discord OAuth failed: {exc}</h3></body></html>", status_code=400)
    return HTMLResponse(
        "<html><body><h3>Discord connected. You can close this tab and return to Tavern.</h3>"
        "<script>window.close();</script></body></html>"
    )


@router.get("/oauth/session", response_model=schemas.DiscordOauthSessionOut)
def discord_oauth_session(current_user: User = Depends(get_current_user)):
    token_row = discord_oauth_store.get_token(current_user.id)
    if not token_row:
        return {"connected": False}
    expires_epoch = int(token_row.get("expires_at_epoch") or 0)
    expires_at = datetime.fromtimestamp(expires_epoch, tz=UTC).isoformat() if expires_epoch else None
    return {
        "connected": True,
        "discord_user_id": str(token_row.get("discord_user_id") or ""),
        "username": str(token_row.get("username") or ""),
        "expires_at": expires_at,
    }


@router.post("/oauth/logout")
def discord_oauth_logout(current_user: User = Depends(get_current_user)):
    discord_oauth_store.clear_token(current_user.id)
    return {"detail": "Disconnected Discord OAuth session"}


@router.get("/oauth/guilds", response_model=list[schemas.DiscordGuildOut])
def discord_oauth_guilds(current_user: User = Depends(get_current_user)):
    token_row = discord_oauth_store.get_token(current_user.id)
    if not token_row:
        raise HTTPException(status_code=401, detail="Discord OAuth session not connected")
    access_token = str(token_row.get("access_token") or "")
    if not access_token:
        raise HTTPException(status_code=401, detail="Discord OAuth session not connected")
    try:
        rows = fetch_discord_user_guilds(access_token)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return [
        {
            "guild_id": str(row.get("id") or ""),
            "guild_name": str(row.get("name") or "Unnamed Guild"),
            "owner": bool(row.get("owner")),
        }
        for row in rows
        if str(row.get("id") or "").strip()
    ]


@router.post("/oauth/import-layout", response_model=schemas.DiscordImportLayoutOut)
async def discord_oauth_import_layout(
    payload: schemas.DiscordImportLayoutIn,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    token_row = discord_oauth_store.get_token(current_user.id)
    if not token_row:
        raise HTTPException(status_code=401, detail="Discord OAuth session not connected")
    access_token = str(token_row.get("access_token") or "")
    if not access_token:
        raise HTTPException(status_code=401, detail="Discord OAuth session not connected")
    try:
        guild_rows = fetch_discord_user_guilds(access_token)
        guild_map = {str(row.get("id") or ""): row for row in guild_rows}
        if str(payload.guild_id) not in guild_map:
            raise RuntimeError("Selected Discord server is not available for this connected Discord account")
        layout = await discord_bot_manager.fetch_guild_channel_layout(
            payload.guild_id,
            include_text=payload.include_text,
            include_voice=payload.include_voice,
        )
        result = channels_service.import_discord_layout(
            db,
            server_public_id=payload.server_public_id,
            layout_rows=layout.get("channels") or [],
            replace_existing=payload.replace_existing,
            skip_existing=payload.skip_existing,
            create_categories=payload.create_categories,
            prefix_category=payload.prefix_category,
            user_id=current_user.id,
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {
        "guild_id": str(layout.get("guild_id") or payload.guild_id),
        "guild_name": str(layout.get("guild_name") or payload.guild_id),
        "created": int(result.get("created") or 0),
        "skipped_duplicates": int(result.get("skipped_duplicates") or 0),
        "deleted_existing": int(result.get("deleted_existing") or 0),
    }


@router.get("/status")
async def discord_status(current_user: User = Depends(require_superadmin)):
    _ = current_user
    return await discord_bot_manager.status()


@router.post("/message")
async def discord_send_message(
    payload: schemas.DiscordMessageSendIn,
    current_user: User = Depends(require_superadmin),
):
    _ = current_user
    try:
        result = await discord_bot_manager.send_message(payload.channel_id, payload.content)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return result


@router.post("/voice/join")
async def discord_join_voice(
    payload: schemas.DiscordVoiceJoinIn,
    current_user: User = Depends(require_superadmin),
):
    _ = current_user
    try:
        result = await discord_bot_manager.join_voice(
            payload.channel_id,
            self_mute=payload.self_mute,
            self_deaf=payload.self_deaf,
        )
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return result


@router.post("/voice/leave")
async def discord_leave_voice(
    payload: schemas.DiscordVoiceLeaveIn,
    current_user: User = Depends(require_superadmin),
):
    _ = current_user
    try:
        result = await discord_bot_manager.leave_voice(payload.guild_id)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return result


@router.post("/voice/sync-name")
async def discord_sync_voice_name(
    payload: schemas.DiscordVoiceSyncIn,
    current_user: User = Depends(require_superadmin),
):
    _ = current_user
    try:
        result = await discord_bot_manager.sync_voice_channel(payload.channel_id)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return result


@router.post("/import-layout", response_model=schemas.DiscordImportLayoutOut)
async def discord_import_layout(
    payload: schemas.DiscordImportLayoutIn,
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
):
    _ = current_user
    try:
        layout = await discord_bot_manager.fetch_guild_channel_layout(
            payload.guild_id,
            include_text=payload.include_text,
            include_voice=payload.include_voice,
        )
        result = channels_service.import_discord_layout(
            db,
            server_public_id=payload.server_public_id,
            layout_rows=layout.get("channels") or [],
            replace_existing=payload.replace_existing,
            skip_existing=payload.skip_existing,
            create_categories=payload.create_categories,
            prefix_category=payload.prefix_category,
            user_id=current_user.id,
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {
        "guild_id": str(layout.get("guild_id") or payload.guild_id),
        "guild_name": str(layout.get("guild_name") or payload.guild_id),
        "created": int(result.get("created") or 0),
        "skipped_duplicates": int(result.get("skipped_duplicates") or 0),
        "deleted_existing": int(result.get("deleted_existing") or 0),
    }
