from fastapi import APIRouter, Depends, HTTPException

from app.core.security import get_current_user
from app.features.discord_bot import schemas
from app.features.discord_bot.service import discord_bot_manager
from app.features.users.models import User


router = APIRouter(prefix="/discord", tags=["Discord Bot"])


def require_superadmin(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_superadmin:
        raise HTTPException(status_code=403, detail="Superadmin access required")
    return current_user


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
