import asyncio
import contextlib
import re
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


discord_bot_manager = DiscordBotManager()
