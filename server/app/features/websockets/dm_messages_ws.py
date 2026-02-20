from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import Dict, List
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.core.security_ws import get_current_user_ws
from app.features.dms import service as dm_service
from app.features.users import service as user_service

router = APIRouter()


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, conversation_public_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.setdefault(conversation_public_id, []).append(websocket)

    def disconnect(self, conversation_public_id: str, websocket: WebSocket):
        conns = self.active_connections.get(conversation_public_id)
        if not conns:
            return
        if websocket in conns:
            conns.remove(websocket)
        if not conns:
            self.active_connections.pop(conversation_public_id, None)

    async def broadcast(self, conversation_public_id: str, payload: dict):
        conns = self.active_connections.get(conversation_public_id, [])
        dead = []
        for conn in conns:
            try:
                await conn.send_json(payload)
            except Exception:
                dead.append(conn)
        for conn in dead:
            self.disconnect(conversation_public_id, conn)


manager = ConnectionManager()


@router.websocket("/ws/dms/{conversation_public_id}")
async def websocket_dm_messages(
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

    await manager.connect(conversation_public_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            content = data.get("content")
            if not content:
                continue
            message = dm_service.create_message(db, conversation_public_id, user.id, content)
            await manager.broadcast(
                conversation_public_id,
                {
                    **message,
                    "created_at": str(message["created_at"]),
                    "edited_at": str(message["edited_at"]) if message.get("edited_at") else None,
                },
            )
    except WebSocketDisconnect:
        manager.disconnect(conversation_public_id, websocket)
