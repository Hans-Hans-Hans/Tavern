from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any
import contextlib
from urllib.parse import urlparse

from app.db.deps import get_db
from app.core.security_ws import get_current_user_ws
from app.core.runtime_metrics import record_voice_join
from app.features.messages import service as message_service

router = APIRouter()


class VoiceConnectionManager:
    def __init__(self):
        # channel_public_id -> peer_id -> peer data
        self.channels: Dict[str, Dict[str, Dict[str, Any]]] = {}
        # channel_public_id -> music bot state
        self.music_bots: Dict[str, Dict[str, Any]] = {}

    async def connect(self, channel_public_id: str, peer_id: str, peer_data: Dict[str, Any]):
        if channel_public_id not in self.channels:
            self.channels[channel_public_id] = {}
        self.channels[channel_public_id][peer_id] = peer_data

    def disconnect(self, channel_public_id: str, peer_id: str):
        channel = self.channels.get(channel_public_id)
        if not channel:
            return
        channel.pop(peer_id, None)
        if not channel:
            self.channels.pop(channel_public_id, None)
            self.music_bots.pop(channel_public_id, None)

    def get_peers(self, channel_public_id: str, exclude_peer_id: str | None = None):
        peers = self.channels.get(channel_public_id, {})
        result = []
        for pid, peer in peers.items():
            if exclude_peer_id and pid == exclude_peer_id:
                continue
            result.append(self._peer_view(pid, peer))
        return result

    def _peer_view(self, peer_id: str, peer: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "peer_id": peer_id,
            "user_id": peer["user_id"],
            "user_public_id": peer["user_public_id"],
            "username": peer["username"],
            "muted": peer.get("muted", False),
            "deafened": peer.get("deafened", False),
            "camera_on": peer.get("camera_on", False),
            "screen_on": peer.get("screen_on", False),
            "link_stream_url": peer.get("link_stream_url"),
        }

    def voice_occupancy_snapshot(self) -> Dict[str, list[Dict[str, Any]]]:
        snapshot: Dict[str, list[Dict[str, Any]]] = {}
        for channel_public_id, peers in self.channels.items():
            entries: list[Dict[str, Any]] = []
            for peer_id, peer in peers.items():
                view = self._peer_view(peer_id, peer)
                view.pop("peer_id", None)
                entries.append(view)
            if entries:
                snapshot[channel_public_id] = entries
        return snapshot

    def get_music_bot_state(self, channel_public_id: str) -> Dict[str, Any]:
        state = self.music_bots.get(channel_public_id)
        if not state:
            return {
                "invited": False,
                "url": None,
                "track_title": None,
                "playing": False,
                "queue_length": 0,
                "requested_by_user_public_id": None,
                "requested_by_username": None,
            }
        queue = state.get("queue")
        if not isinstance(queue, list):
            queue = []
        current = queue[0] if queue else {}
        if not isinstance(current, dict):
            current = {}
        return {
            "invited": bool(state.get("invited", False)),
            "url": current.get("url"),
            "track_title": current.get("track_title"),
            "playing": bool(state.get("playing", False)) and bool(current.get("url")),
            "queue_length": len(queue),
            "requested_by_user_public_id": current.get("requested_by_user_public_id"),
            "requested_by_username": current.get("requested_by_username"),
        }

    def update_music_bot_state(
        self,
        channel_public_id: str,
        *,
        invited: bool | None = None,
        playing: bool | None = None,
    ) -> Dict[str, Any]:
        current_raw = self.music_bots.get(channel_public_id, {})
        if not isinstance(current_raw, dict):
            current_raw = {}
        queue = current_raw.get("queue")
        if not isinstance(queue, list):
            queue = []
        next_state = {
            "invited": bool(current_raw.get("invited", False) if invited is None else invited),
            "playing": bool(current_raw.get("playing", False) if playing is None else playing),
            "queue": queue,
        }
        if not next_state["invited"]:
            next_state["playing"] = False
            next_state["queue"] = []
        if next_state["invited"] or next_state["queue"]:
            self.music_bots[channel_public_id] = next_state
        else:
            self.music_bots.pop(channel_public_id, None)
        return self.get_music_bot_state(channel_public_id)

    def enqueue_music_track(
        self,
        channel_public_id: str,
        *,
        url: str,
        track_title: str | None = None,
        requested_by_user_public_id: str | None = None,
        requested_by_username: str | None = None,
    ) -> Dict[str, Any]:
        current = self.music_bots.get(channel_public_id)
        if not isinstance(current, dict):
            current = {"invited": True, "playing": True, "queue": []}
        queue = current.get("queue")
        if not isinstance(queue, list):
            queue = []
        queue.append(
            {
                "url": url,
                "track_title": track_title,
                "requested_by_user_public_id": requested_by_user_public_id,
                "requested_by_username": requested_by_username,
            }
        )
        current["invited"] = True
        current["playing"] = bool(current.get("playing", False)) or len(queue) == 1
        current["queue"] = queue
        self.music_bots[channel_public_id] = current
        return self.get_music_bot_state(channel_public_id)

    def clear_music_queue(self, channel_public_id: str) -> Dict[str, Any]:
        current = self.music_bots.get(channel_public_id)
        if not isinstance(current, dict):
            current = {"invited": True, "playing": False, "queue": []}
        current["invited"] = True
        current["playing"] = False
        current["queue"] = []
        self.music_bots[channel_public_id] = current
        return self.get_music_bot_state(channel_public_id)

    def skip_music_track(self, channel_public_id: str) -> Dict[str, Any]:
        current = self.music_bots.get(channel_public_id)
        if not isinstance(current, dict):
            current = {"invited": True, "playing": False, "queue": []}
        queue = current.get("queue")
        if not isinstance(queue, list):
            queue = []
        if queue:
            queue.pop(0)
        current["queue"] = queue
        current["invited"] = True
        current["playing"] = bool(queue) and bool(current.get("playing", True))
        self.music_bots[channel_public_id] = current
        return self.get_music_bot_state(channel_public_id)

    async def broadcast(self, channel_public_id: str, payload: Dict[str, Any], exclude_peer_id: str | None = None):
        peers = self.channels.get(channel_public_id, {})
        dead_peers = []
        for pid, peer in peers.items():
            if exclude_peer_id and pid == exclude_peer_id:
                continue
            try:
                await peer["ws"].send_json(payload)
            except Exception:
                dead_peers.append(pid)

        for pid in dead_peers:
            self.disconnect(channel_public_id, pid)

    async def send_to_peer(self, channel_public_id: str, target_peer_id: str, payload: Dict[str, Any]):
        peer = self.channels.get(channel_public_id, {}).get(target_peer_id)
        if not peer:
            return
        try:
            await peer["ws"].send_json(payload)
        except Exception:
            self.disconnect(channel_public_id, target_peer_id)


manager = VoiceConnectionManager()


def _normalize_music_url(value: Any) -> str | None:
    raw = str(value or "").strip()
    if not raw:
        return None
    if len(raw) > 1000:
        return None
    try:
        parsed = urlparse(raw)
    except Exception:
        return None
    if parsed.scheme not in {"http", "https"}:
        return None
    if not parsed.netloc:
        return None
    return raw

async def _broadcast_presence_update():
    # Import locally to avoid websocket module circular imports at import-time.
    from app.features.websockets.presence_ws import manager as presence_manager

    with contextlib.suppress(Exception):
        await presence_manager.broadcast_presence()


@router.websocket("/ws/voice/{channel_public_id}")
async def websocket_voice(
    websocket: WebSocket,
    channel_public_id: str,
    db: Session = Depends(get_db),
):
    try:
        user = await get_current_user_ws(websocket, db)
    except WebSocketDisconnect:
        return

    channel = message_service.get_channel_or_404(db, channel_public_id)
    message_service.verify_membership(db, channel.server_id, user.id)

    if channel.type != "voice":
        await websocket.close(code=1008)
        return

    await websocket.accept()
    record_voice_join()
    peer_id = f"{user.public_id}:{id(websocket)}"
    peer_data = {
        "ws": websocket,
        "user_id": user.id,
        "user_public_id": user.public_id,
        "username": user.username,
        "muted": False,
        "deafened": False,
        "camera_on": False,
        "screen_on": False,
        "link_stream_url": None,
    }
    await manager.connect(channel_public_id, peer_id, peer_data)
    await _broadcast_presence_update()

    try:
        await websocket.send_json(
            {
                "type": "peers",
                "self_peer_id": peer_id,
                "peers": manager.get_peers(channel_public_id, exclude_peer_id=peer_id),
                "music_bot": manager.get_music_bot_state(channel_public_id),
            }
        )
        await manager.broadcast(
            channel_public_id,
            {
                "type": "peer_joined",
                "peer": {
                    "peer_id": peer_id,
                    "user_id": user.id,
                    "user_public_id": user.public_id,
                    "username": user.username,
                    "muted": False,
                    "deafened": False,
                    "camera_on": False,
                    "screen_on": False,
                    "link_stream_url": None,
                },
            },
            exclude_peer_id=peer_id,
        )

        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")

            if msg_type == "signal":
                target_peer_id = data.get("target_peer_id")
                signal = data.get("signal")
                if not target_peer_id or signal is None:
                    continue
                await manager.send_to_peer(
                    channel_public_id,
                    target_peer_id,
                    {
                        "type": "signal",
                        "from_peer_id": peer_id,
                        "signal": signal,
                    },
                )
            elif msg_type == "state":
                muted = bool(data.get("muted", False))
                deafened = bool(data.get("deafened", False))
                camera_on = bool(data.get("camera_on", False))
                screen_on = bool(data.get("screen_on", False))
                link_stream_url = data.get("link_stream_url")
                if link_stream_url is not None:
                    link_stream_url = str(link_stream_url).strip() or None
                peer_data["muted"] = muted
                peer_data["deafened"] = deafened
                peer_data["camera_on"] = camera_on
                peer_data["screen_on"] = screen_on
                peer_data["link_stream_url"] = link_stream_url
                await manager.broadcast(
                    channel_public_id,
                    {
                        "type": "peer_state",
                        "peer_id": peer_id,
                        "muted": muted,
                        "deafened": deafened,
                        "camera_on": camera_on,
                        "screen_on": screen_on,
                        "link_stream_url": link_stream_url,
                    },
                    exclude_peer_id=peer_id,
                )
                await _broadcast_presence_update()
            elif msg_type == "music_bot_control":
                action = str(data.get("action") or "").strip().lower()
                state_payload = None
                if action == "invite":
                    state_payload = manager.update_music_bot_state(
                        channel_public_id,
                        invited=True,
                    )
                elif action == "remove":
                    state_payload = manager.update_music_bot_state(channel_public_id, invited=False)
                elif action == "set_url":
                    normalized_url = _normalize_music_url(data.get("url"))
                    raw_title = str(data.get("title") or "").strip()
                    normalized_title = raw_title[:180] if raw_title else None
                    if normalized_url:
                        state_payload = manager.enqueue_music_track(
                            channel_public_id,
                            url=normalized_url,
                            track_title=normalized_title,
                            requested_by_user_public_id=user.public_id,
                            requested_by_username=user.username,
                        )
                elif action == "clear_url":
                    state_payload = manager.clear_music_queue(channel_public_id)
                elif action == "skip":
                    state_payload = manager.skip_music_track(channel_public_id)
                elif action == "set_playing":
                    requested_playing = bool(data.get("playing", False))
                    state_payload = manager.update_music_bot_state(
                        channel_public_id,
                        invited=True,
                        playing=requested_playing,
                    )
                if state_payload is not None:
                    await manager.broadcast(
                        channel_public_id,
                        {
                            "type": "music_bot_state",
                            "music_bot": state_payload,
                        },
                    )
    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(channel_public_id, peer_id)
        await _broadcast_presence_update()
        await manager.broadcast(
            channel_public_id,
            {
                "type": "peer_left",
                "peer_id": peer_id,
            },
            exclude_peer_id=peer_id,
        )
