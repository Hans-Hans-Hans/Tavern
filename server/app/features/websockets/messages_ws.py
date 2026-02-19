# app/features/websockets/messages_ws.py

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import List, Dict
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.features.messages import service as message_service
from app.core.security_ws import get_current_user_ws

router = APIRouter()

# In-memory connection manager (per channel)
class ConnectionManager:
    def __init__(self):
        # key: channel_public_id -> list of websockets
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, channel_id: str, websocket: WebSocket):
        await websocket.accept()
        if channel_id not in self.active_connections:
            self.active_connections[channel_id] = []
        self.active_connections[channel_id].append(websocket)

    def disconnect(self, channel_id: str, websocket: WebSocket):
        if channel_id in self.active_connections:
            self.active_connections[channel_id].remove(websocket)
            if not self.active_connections[channel_id]:
                del self.active_connections[channel_id]

    async def broadcast(self, channel_id: str, message: dict):
        """Send a message to all clients in the channel."""
        connections = self.active_connections.get(channel_id, [])
        for connection in connections:
            await connection.send_json(message)

manager = ConnectionManager()

# ----------------------------
# WebSocket endpoint
# ----------------------------
@router.websocket("/ws/messages/{channel_public_id}")
async def websocket_messages(
    websocket: WebSocket,
    channel_public_id: str,
    db: Session = Depends(get_db)
):
    # Authenticate user
    user = await get_current_user_ws(websocket, db)

    # Verify membership
    channel = message_service.get_channel_or_404(db, channel_public_id)
    message_service.verify_membership(db, channel.server_id, user.id)

    # Connect to manager
    await manager.connect(channel_public_id, websocket)

    try:
        while True:
            data = await websocket.receive_json()
            content = data.get("content")
            if not content:
                continue

            # Create message in DB
            message = message_service.create_message(db, channel_public_id, content, user.id)

            # Broadcast to everyone in the channel
            await manager.broadcast(channel_public_id, {
                "public_id": message["public_id"],
                "content": message["content"],
                "user_id": message["user_id"],
                "username": message["username"],
                "channel_id": message["channel_id"],
                "created_at": str(message["created_at"])
            })
    except WebSocketDisconnect:
        manager.disconnect(channel_public_id, websocket)
