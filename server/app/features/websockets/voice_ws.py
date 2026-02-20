from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any

from app.db.deps import get_db
from app.core.security_ws import get_current_user_ws
from app.core.runtime_metrics import record_voice_join
from app.features.messages import service as message_service

router = APIRouter()


class VoiceConnectionManager:
    def __init__(self):
        # channel_public_id -> peer_id -> peer data
        self.channels: Dict[str, Dict[str, Dict[str, Any]]] = {}

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

    def get_peers(self, channel_public_id: str, exclude_peer_id: str | None = None):
        peers = self.channels.get(channel_public_id, {})
        result = []
        for pid, peer in peers.items():
            if exclude_peer_id and pid == exclude_peer_id:
                continue
            result.append(
                {
                    "peer_id": pid,
                    "user_id": peer["user_id"],
                    "user_public_id": peer["user_public_id"],
                    "username": peer["username"],
                    "muted": peer.get("muted", False),
                    "deafened": peer.get("deafened", False),
                }
            )
        return result

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


@router.websocket("/ws/voice/{channel_public_id}")
async def websocket_voice(
    websocket: WebSocket,
    channel_public_id: str,
    db: Session = Depends(get_db),
):
    user = await get_current_user_ws(websocket, db)

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
    }
    await manager.connect(channel_public_id, peer_id, peer_data)

    try:
        await websocket.send_json(
            {
                "type": "peers",
                "self_peer_id": peer_id,
                "peers": manager.get_peers(channel_public_id, exclude_peer_id=peer_id),
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
                peer_data["muted"] = muted
                peer_data["deafened"] = deafened
                await manager.broadcast(
                    channel_public_id,
                    {
                        "type": "peer_state",
                        "peer_id": peer_id,
                        "muted": muted,
                        "deafened": deafened,
                    },
                    exclude_peer_id=peer_id,
                )
    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(channel_public_id, peer_id)
        await manager.broadcast(
            channel_public_id,
            {
                "type": "peer_left",
                "peer_id": peer_id,
            },
            exclude_peer_id=peer_id,
        )
