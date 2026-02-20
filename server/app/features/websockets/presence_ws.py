from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from typing import Dict

from app.db.deps import get_db
from app.core.security_ws import get_current_user_ws

router = APIRouter()


class PresenceManager:
    def __init__(self):
        # key: websocket -> user_public_id
        self.connections: Dict[WebSocket, str] = {}

    async def connect(self, websocket: WebSocket, user_public_id: str):
        await websocket.accept()
        self.connections[websocket] = user_public_id

    def disconnect(self, websocket: WebSocket):
        self.connections.pop(websocket, None)

    def online_users(self):
        return sorted(set(self.connections.values()))

    async def broadcast_presence(self):
        payload = {"event": "presence_update", "online_user_public_ids": self.online_users()}
        dead = []
        for ws in list(self.connections.keys()):
            try:
                await ws.send_json(payload)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.disconnect(ws)


manager = PresenceManager()


@router.websocket("/ws/presence")
async def websocket_presence(
    websocket: WebSocket,
    db: Session = Depends(get_db),
):
    user = await get_current_user_ws(websocket, db)
    await manager.connect(websocket, user.public_id)
    await manager.broadcast_presence()

    try:
        while True:
            # Keep socket alive; frontend may optionally send pings.
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast_presence()
