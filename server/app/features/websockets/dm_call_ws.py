from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any

from app.db.deps import get_db
from app.core.security_ws import get_current_user_ws
from app.features.dms import service as dm_service
from app.features.users import service as user_service

router = APIRouter()


class DMCallManager:
    def __init__(self):
        self.rooms: Dict[str, Dict[str, Dict[str, Any]]] = {}

    async def connect(self, convo_public_id: str, peer_id: str, peer_data: Dict[str, Any]):
        self.rooms.setdefault(convo_public_id, {})[peer_id] = peer_data

    def disconnect(self, convo_public_id: str, peer_id: str):
        room = self.rooms.get(convo_public_id)
        if not room:
            return
        room.pop(peer_id, None)
        if not room:
            self.rooms.pop(convo_public_id, None)

    def list_peers(self, convo_public_id: str, exclude_peer_id: str | None = None):
        peers = []
        for pid, peer in self.rooms.get(convo_public_id, {}).items():
            if exclude_peer_id and pid == exclude_peer_id:
                continue
            peers.append(
                {
                    "peer_id": pid,
                    "user_id": peer["user_id"],
                    "user_public_id": peer["user_public_id"],
                    "username": peer["username"],
                    "muted": peer.get("muted", False),
                    "deafened": peer.get("deafened", False),
                }
            )
        return peers

    async def send_to(self, convo_public_id: str, target_peer_id: str, payload: dict):
        peer = self.rooms.get(convo_public_id, {}).get(target_peer_id)
        if not peer:
            return
        try:
            await peer["ws"].send_json(payload)
        except Exception:
            self.disconnect(convo_public_id, target_peer_id)

    async def broadcast(self, convo_public_id: str, payload: dict, exclude_peer_id: str | None = None):
        room = self.rooms.get(convo_public_id, {})
        dead = []
        for pid, peer in room.items():
            if exclude_peer_id and pid == exclude_peer_id:
                continue
            try:
                await peer["ws"].send_json(payload)
            except Exception:
                dead.append(pid)
        for pid in dead:
            self.disconnect(convo_public_id, pid)


manager = DMCallManager()


@router.websocket("/ws/dm-calls/{conversation_public_id}")
async def websocket_dm_calls(
    websocket: WebSocket,
    conversation_public_id: str,
    db: Session = Depends(get_db),
):
    user = await get_current_user_ws(websocket, db)
    convo = dm_service.get_conversation_or_404(db, conversation_public_id)
    if user.id not in (convo.user_one_id, convo.user_two_id):
        await websocket.close(code=1008)
        return
    if not user_service.are_friends(db, convo.user_one_id, convo.user_two_id):
        await websocket.close(code=1008)
        return

    await websocket.accept()
    peer_id = f"{user.public_id}:{id(websocket)}"
    peer_data = {
        "ws": websocket,
        "user_id": user.id,
        "user_public_id": user.public_id,
        "username": user.username,
        "muted": False,
        "deafened": False,
    }
    await manager.connect(conversation_public_id, peer_id, peer_data)

    try:
        await websocket.send_json(
            {
                "type": "peers",
                "self_peer_id": peer_id,
                "peers": manager.list_peers(conversation_public_id, exclude_peer_id=peer_id),
            }
        )
        await manager.broadcast(
            conversation_public_id,
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
                await manager.send_to(
                    conversation_public_id,
                    target_peer_id,
                    {"type": "signal", "from_peer_id": peer_id, "signal": signal},
                )
            elif msg_type == "state":
                peer_data["muted"] = bool(data.get("muted", False))
                peer_data["deafened"] = bool(data.get("deafened", False))
                await manager.broadcast(
                    conversation_public_id,
                    {
                        "type": "peer_state",
                        "peer_id": peer_id,
                        "muted": peer_data["muted"],
                        "deafened": peer_data["deafened"],
                    },
                    exclude_peer_id=peer_id,
                )
    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(conversation_public_id, peer_id)
        await manager.broadcast(
            conversation_public_id,
            {"type": "peer_left", "peer_id": peer_id},
            exclude_peer_id=peer_id,
        )
