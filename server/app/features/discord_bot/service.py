import asyncio
import contextlib
import json
import re
import secrets
import time
import urllib.parse
import urllib.request
from urllib.error import HTTPError
from typing import Any

from app.core.config import settings

try:
    import discord
except Exception:  # pragma: no cover - import errors are surfaced through status/errors.
    discord = None


_CHANNEL_SUFFIX_RE = re.compile(r"\s+\[(?:\d+|\d+:[^\]]*)\]$")

if discord is not None:
    class TavernDiscordClient(discord.Client):
        def __init__(self):
            intents = discord.Intents.none()
            intents.guilds = True
            intents.voice_states = True
            super().__init__(intents=intents)
            self.ready_event = asyncio.Event()
            self._voice_base_names: dict[int, str] = {}

        async def on_ready(self):
            self.ready_event.set()

        async def on_voice_state_update(self, member, before, after):
            changed = []
            if before.channel is not None:
                changed.append(before.channel)
            if after.channel is not None and (before.channel is None or before.channel.id != after.channel.id):
                changed.append(after.channel)
            for channel in changed:
                with contextlib.suppress(Exception):
                    await self.sync_voice_channel_name(channel)

        def _base_voice_name(self, channel: "discord.VoiceChannel") -> str:
            cached = self._voice_base_names.get(channel.id)
            if cached:
                return cached
            clean = _CHANNEL_SUFFIX_RE.sub("", channel.name).strip() or channel.name
            self._voice_base_names[channel.id] = clean
            return clean

        def _formatted_voice_name(self, channel: "discord.VoiceChannel") -> str:
            base = self._base_voice_name(channel)
            members = [m.display_name for m in channel.members if not m.bot]
            if not members:
                return base
            joined = ", ".join(members)
            suffix = f" [{len(members)}:{joined}]"
            room = max(0, 100 - len(base))
            if room <= 0:
                return base[:100]
            if len(suffix) > room:
                suffix = suffix[: max(0, room - 1)].rstrip(", ") + "]"
            return f"{base}{suffix}" if suffix else base

        async def sync_voice_channel_name(self, channel: "discord.VoiceChannel"):
            expected = self._formatted_voice_name(channel)
            if channel.name == expected:
                return
            await channel.edit(name=expected, reason="Sync voice occupancy status")
else:
    class TavernDiscordClient:  # pragma: no cover - fallback for missing dependency.
        ready_event: asyncio.Event


class DiscordBotManager:
    def __init__(self):
        self._client: TavernDiscordClient | None = None
        self._runner_task: asyncio.Task | None = None
        self._lock = asyncio.Lock()

    def configured(self) -> bool:
        return bool(getattr(settings, "DISCORD_BOT_TOKEN", "").strip())

    def available(self) -> bool:
        return discord is not None

    async def start_if_configured(self):
        if not self.configured() or not self.available():
            return
        async with self._lock:
            if self._client is not None:
                return
            token = settings.DISCORD_BOT_TOKEN.strip()
            client = TavernDiscordClient()
            task = asyncio.create_task(client.start(token))
            self._client = client
            self._runner_task = task

    async def stop(self):
        async with self._lock:
            client = self._client
            runner = self._runner_task
            self._client = None
            self._runner_task = None
        if client is not None:
            with contextlib.suppress(Exception):
                await client.close()
        if runner is not None:
            with contextlib.suppress(asyncio.CancelledError, Exception):
                await runner

    async def _require_ready_client(self) -> TavernDiscordClient:
        if not self.configured():
            raise RuntimeError("Discord bot is not configured (set DISCORD_BOT_TOKEN)")
        if not self.available():
            raise RuntimeError("discord.py is not installed")

        if self._client is None:
            await self.start_if_configured()

        client = self._client
        runner = self._runner_task
        if client is None:
            raise RuntimeError("Discord bot failed to start")
        if runner is not None and runner.done():
            exc = runner.exception()
            await self.stop()
            if exc:
                raise RuntimeError(f"Discord bot disconnected: {exc}") from exc
            raise RuntimeError("Discord bot is not running")

        try:
            await asyncio.wait_for(client.ready_event.wait(), timeout=15)
        except TimeoutError as exc:
            raise RuntimeError("Discord bot is still connecting") from exc
        return client

    async def status(self) -> dict[str, Any]:
        configured = self.configured()
        available = self.available()
        ready = bool(self._client and self._client.ready_event.is_set())
        user = str(self._client.user) if ready and self._client and self._client.user else None
        guild_count = len(self._client.guilds) if ready and self._client else 0
        return {
            "configured": configured,
            "available": available,
            "connected": ready,
            "user": user,
            "guild_count": guild_count,
        }

    async def send_message(self, channel_id: str, content: str) -> dict[str, Any]:
        client = await self._require_ready_client()
        cid = int(channel_id)
        channel = client.get_channel(cid)
        if channel is None:
            channel = await client.fetch_channel(cid)
        if channel is None or not hasattr(channel, "send"):
            raise RuntimeError("Target channel does not support sending messages")
        message = await channel.send(content)
        return {
            "message_id": str(message.id),
            "channel_id": str(message.channel.id),
            "guild_id": str(message.guild.id) if getattr(message, "guild", None) else None,
        }

    async def join_voice(self, channel_id: str, *, self_mute: bool = False, self_deaf: bool = False) -> dict[str, Any]:
        client = await self._require_ready_client()
        cid = int(channel_id)
        channel = client.get_channel(cid)
        if channel is None:
            channel = await client.fetch_channel(cid)
        if not isinstance(channel, (discord.VoiceChannel, discord.StageChannel)):
            raise RuntimeError("channel_id must point to a voice channel")

        voice = channel.guild.voice_client
        if voice and voice.channel and voice.channel.id != channel.id:
            await voice.move_to(channel)
        elif not voice:
            await channel.connect(self_mute=self_mute, self_deaf=self_deaf)

        await client.sync_voice_channel_name(channel)
        return {
            "guild_id": str(channel.guild.id),
            "channel_id": str(channel.id),
            "channel_name": channel.name,
        }

    async def leave_voice(self, guild_id: str | None = None) -> dict[str, Any]:
        client = await self._require_ready_client()
        disconnected = 0
        for voice in list(client.voice_clients):
            if guild_id and str(voice.guild.id) != str(guild_id):
                continue
            channel = voice.channel
            await voice.disconnect(force=True)
            disconnected += 1
            if isinstance(channel, (discord.VoiceChannel, discord.StageChannel)):
                await client.sync_voice_channel_name(channel)
        return {"disconnected": disconnected}

    async def sync_voice_channel(self, channel_id: str) -> dict[str, Any]:
        client = await self._require_ready_client()
        cid = int(channel_id)
        channel = client.get_channel(cid)
        if channel is None:
            channel = await client.fetch_channel(cid)
        if not isinstance(channel, (discord.VoiceChannel, discord.StageChannel)):
            raise RuntimeError("channel_id must point to a voice channel")
        await client.sync_voice_channel_name(channel)
        return {
            "channel_id": str(channel.id),
            "channel_name": channel.name,
            "member_count": len([m for m in channel.members if not m.bot]),
        }

    async def fetch_guild_channel_layout(
        self,
        guild_id: str,
        *,
        include_text: bool = True,
        include_voice: bool = True,
    ) -> dict[str, Any]:
        if not include_text and not include_voice:
            raise RuntimeError("At least one of include_text/include_voice must be enabled")

        client = await self._require_ready_client()
        gid = int(guild_id)
        guild = client.get_guild(gid)
        if guild is None:
            guild = await client.fetch_guild(gid)
        if guild is None:
            raise RuntimeError("Guild not found")

        channels = await guild.fetch_channels()
        categories = [
            ch for ch in channels if isinstance(ch, discord.CategoryChannel)
        ]
        categories.sort(key=lambda ch: (int(getattr(ch, "position", 0)), int(ch.id)))

        text_types: tuple[type, ...] = tuple(
            cls for cls in (
                getattr(discord, "TextChannel", None),
                getattr(discord, "ForumChannel", None),
                getattr(discord, "NewsChannel", None),
            )
            if cls is not None
        )

        def _to_kind(ch: Any) -> str | None:
            if text_types and isinstance(ch, text_types):
                return "text" if include_text else None
            if isinstance(ch, (discord.VoiceChannel, discord.StageChannel)):
                return "voice" if include_voice else None
            return None

        rows: list[dict[str, Any]] = []
        typed_channels: list[dict[str, Any]] = []
        for ch in channels:
            kind = _to_kind(ch)
            if not kind:
                continue
            typed_channels.append(
                {
                    "id": int(ch.id),
                    "name": str(ch.name),
                    "type": kind,
                    "category_id": int(ch.category_id) if getattr(ch, "category_id", None) else None,
                    "position": int(getattr(ch, "position", 0)),
                }
            )

        for ch in sorted(
            [item for item in typed_channels if item["category_id"] is None],
            key=lambda item: (item["position"], item["id"]),
        ):
            rows.append(
                {
                    "name": ch["name"],
                    "type": ch["type"],
                    "category_name": None,
                    "discord_channel_id": str(ch["id"]),
                }
            )

        for category in categories:
            members = [
                item for item in typed_channels if item["category_id"] == int(category.id)
            ]
            members.sort(key=lambda item: (item["position"], item["id"]))
            for ch in members:
                rows.append(
                    {
                        "name": ch["name"],
                        "type": ch["type"],
                        "category_name": str(category.name),
                        "discord_channel_id": str(ch["id"]),
                    }
                )

        return {
            "guild_id": str(guild.id),
            "guild_name": str(guild.name),
            "channels": rows,
        }


_DISCORD_API_BASE = "https://discord.com/api/v10"


def _discord_http_json(
    method: str,
    path: str,
    *,
    token: str | None = None,
    data: dict[str, Any] | None = None,
    as_form: bool = False,
) -> Any:
    body_bytes: bytes | None = None
    headers = {"User-Agent": "TavernDiscordOAuth/1.0"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if data is not None:
        if as_form:
            body_bytes = urllib.parse.urlencode({k: "" if v is None else str(v) for k, v in data.items()}).encode("utf-8")
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        else:
            body_bytes = json.dumps(data).encode("utf-8")
            headers["Content-Type"] = "application/json"

    req = urllib.request.Request(
        url=f"{_DISCORD_API_BASE}{path}",
        data=body_bytes,
        method=method.upper(),
        headers=headers,
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            payload = res.read().decode("utf-8", errors="replace")
            if not payload:
                return None
            return json.loads(payload)
    except HTTPError as exc:
        detail = ""
        try:
            detail = exc.read().decode("utf-8", errors="replace")
        except Exception:
            detail = ""
        raise RuntimeError(f"Discord API error ({exc.code}): {detail or exc.reason}") from exc


class DiscordOauthStore:
    def __init__(self):
        self._state_map: dict[str, dict[str, Any]] = {}
        self._token_by_user: dict[int, dict[str, Any]] = {}

    def _prune(self):
        now = int(time.time())
        self._state_map = {
            state: value
            for state, value in self._state_map.items()
            if int(value.get("expires_at") or 0) > now
        }
        self._token_by_user = {
            uid: value
            for uid, value in self._token_by_user.items()
            if int(value.get("expires_at_epoch") or 0) > now
        }

    def new_state(self, user_id: int) -> str:
        self._prune()
        state = secrets.token_urlsafe(24)
        self._state_map[state] = {"user_id": int(user_id), "expires_at": int(time.time()) + 600}
        return state

    def consume_state(self, state: str) -> int | None:
        self._prune()
        payload = self._state_map.pop(state, None)
        if not payload:
            return None
        return int(payload.get("user_id") or 0) or None

    def save_token(self, user_id: int, token_data: dict[str, Any], user_data: dict[str, Any]):
        expires_in = int(token_data.get("expires_in") or 3600)
        expires_at_epoch = int(time.time()) + max(60, expires_in - 30)
        self._token_by_user[int(user_id)] = {
            "access_token": str(token_data.get("access_token") or ""),
            "refresh_token": str(token_data.get("refresh_token") or ""),
            "token_type": str(token_data.get("token_type") or "Bearer"),
            "expires_at_epoch": expires_at_epoch,
            "discord_user_id": str(user_data.get("id") or ""),
            "username": (
                f"{user_data.get('username')}#{user_data.get('discriminator')}"
                if str(user_data.get("discriminator") or "") not in {"", "0"}
                else str(user_data.get("username") or "")
            ),
        }

    def get_token(self, user_id: int) -> dict[str, Any] | None:
        self._prune()
        return self._token_by_user.get(int(user_id))

    def clear_token(self, user_id: int):
        self._token_by_user.pop(int(user_id), None)


discord_oauth_store = DiscordOauthStore()


def discord_oauth_start_url(*, state: str, redirect_uri: str, client_id: str) -> str:
    query = urllib.parse.urlencode(
        {
            "client_id": client_id,
            "redirect_uri": redirect_uri,
            "response_type": "code",
            "scope": "identify guilds",
            "prompt": "consent",
            "state": state,
        }
    )
    return f"https://discord.com/oauth2/authorize?{query}"


def exchange_discord_code_for_token(
    *,
    code: str,
    redirect_uri: str,
    client_id: str,
    client_secret: str,
) -> dict[str, Any]:
    return _discord_http_json(
        "POST",
        "/oauth2/token",
        data={
            "client_id": client_id,
            "client_secret": client_secret,
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": redirect_uri,
        },
        as_form=True,
    )


def fetch_discord_oauth_user(access_token: str) -> dict[str, Any]:
    return _discord_http_json("GET", "/users/@me", token=access_token)


def fetch_discord_user_guilds(access_token: str) -> list[dict[str, Any]]:
    payload = _discord_http_json("GET", "/users/@me/guilds?with_counts=false", token=access_token)
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    return []


def fetch_discord_guild_layout_via_user_token(
    *,
    access_token: str,
    guild_id: str,
    include_text: bool = True,
    include_voice: bool = True,
) -> dict[str, Any]:
    if not include_text and not include_voice:
        raise RuntimeError("At least one of include_text/include_voice must be enabled")

    guild_rows = fetch_discord_user_guilds(access_token)
    guild_map = {str(item.get("id") or ""): item for item in guild_rows}
    guild_info = guild_map.get(str(guild_id))
    if not guild_info:
        raise RuntimeError("Guild not available for the connected Discord user")

    channels_payload = _discord_http_json("GET", f"/guilds/{guild_id}/channels", token=access_token)
    if not isinstance(channels_payload, list):
        raise RuntimeError("Discord did not return channel layout")

    type_map = {
        0: "text",   # GUILD_TEXT
        5: "text",   # GUILD_ANNOUNCEMENT
        15: "text",  # GUILD_FORUM
        2: "voice",  # GUILD_VOICE
        13: "voice", # GUILD_STAGE_VOICE
    }

    categories: dict[str, dict[str, Any]] = {}
    channels: list[dict[str, Any]] = []
    for row in channels_payload:
        if not isinstance(row, dict):
            continue
        ctype = int(row.get("type") or -1)
        if ctype == 4:
            cid = str(row.get("id") or "")
            if cid:
                categories[cid] = row
            continue
        mapped = type_map.get(ctype)
        if mapped == "text" and not include_text:
            continue
        if mapped == "voice" and not include_voice:
            continue
        if mapped not in {"text", "voice"}:
            continue
        channels.append(
            {
                "id": str(row.get("id") or ""),
                "name": str(row.get("name") or ""),
                "type": mapped,
                "category_id": str(row.get("parent_id") or "") or None,
                "position": int(row.get("position") or 0),
            }
        )

    channels = [row for row in channels if row["id"] and row["name"]]
    ungrouped = sorted(
        [row for row in channels if not row.get("category_id")],
        key=lambda item: (int(item.get("position") or 0), item["id"]),
    )
    rows: list[dict[str, Any]] = []
    for row in ungrouped:
        rows.append(
            {
                "name": row["name"],
                "type": row["type"],
                "category_name": None,
                "discord_channel_id": row["id"],
            }
        )

    ordered_categories = sorted(
        categories.values(),
        key=lambda item: (int(item.get("position") or 0), str(item.get("id") or "")),
    )
    for category in ordered_categories:
        category_id = str(category.get("id") or "")
        members = [row for row in channels if row.get("category_id") == category_id]
        members.sort(key=lambda item: (int(item.get("position") or 0), item["id"]))
        for row in members:
            rows.append(
                {
                    "name": row["name"],
                    "type": row["type"],
                    "category_name": str(category.get("name") or "").strip() or None,
                    "discord_channel_id": row["id"],
                }
            )

    return {
        "guild_id": str(guild_info.get("id") or guild_id),
        "guild_name": str(guild_info.get("name") or guild_id),
        "channels": rows,
    }


discord_bot_manager = DiscordBotManager()
