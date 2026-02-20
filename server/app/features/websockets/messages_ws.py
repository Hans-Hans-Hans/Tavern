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
        # key: channel_public_id -> list of connection objects
        self.active_connections: Dict[str, List[dict]] = {}

    async def connect(self, channel_id: str, websocket: WebSocket, user):
        await websocket.accept()
        if channel_id not in self.active_connections:
            self.active_connections[channel_id] = []
        self.active_connections[channel_id].append(
            {
                "ws": websocket,
                "user_id": user.id,
                "user_public_id": user.public_id,
                "username": user.username,
            }
        )

    def disconnect(self, channel_id: str, websocket: WebSocket):
        if channel_id in self.active_connections:
            self.active_connections[channel_id] = [
                conn for conn in self.active_connections[channel_id] if conn["ws"] != websocket
            ]
            if not self.active_connections[channel_id]:
                del self.active_connections[channel_id]

    async def broadcast(self, channel_id: str, message: dict, exclude_ws: WebSocket | None = None):
        """Send a message to all clients in the channel."""
        connections = self.active_connections.get(channel_id, [])
        dead = []
        for connection in connections:
            ws = connection["ws"]
            if exclude_ws and ws == exclude_ws:
                continue
            try:
                await ws.send_json(message)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.disconnect(channel_id, ws)

    def get_online_users(self, channel_id: str):
        seen = {}
        for conn in self.active_connections.get(channel_id, []):
            seen[conn["user_public_id"]] = {
                "user_id": conn["user_id"],
                "user_public_id": conn["user_public_id"],
                "username": conn["username"],
            }
        return list(seen.values())

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
    await manager.connect(channel_public_id, websocket, user)
    await manager.broadcast(
        channel_public_id,
        {
            "event": "presence_update",
            "channel_public_id": channel_public_id,
            "online_users": manager.get_online_users(channel_public_id),
        },
    )

    try:
        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")
            if msg_type == "typing_start":
                await manager.broadcast(
                    channel_public_id,
                    {
                        "event": "typing_start",
                        "channel_public_id": channel_public_id,
                        "user_id": user.id,
                        "user_public_id": user.public_id,
                        "username": user.username,
                    },
                    exclude_ws=websocket,
                )
                continue
            if msg_type == "typing_stop":
                await manager.broadcast(
                    channel_public_id,
                    {
                        "event": "typing_stop",
                        "channel_public_id": channel_public_id,
                        "user_id": user.id,
                        "user_public_id": user.public_id,
                        "username": user.username,
                    },
                    exclude_ws=websocket,
                )
                continue

            content = data.get("content")
            if not content:
                continue
            parent_message_public_id = data.get("parent_message_public_id")

            # Create message in DB and broadcast to channel subscribers.
            message = message_service.create_message(
                db,
                channel_public_id,
                content,
                user.id,
                parent_message_public_id,
            )
            await manager.broadcast(channel_public_id, {
                "event": "message_created",
                **message,
                "created_at": str(message["created_at"]),
                "edited_at": str(message["edited_at"]) if message.get("edited_at") else None,
            })
    except WebSocketDisconnect:
        manager.disconnect(channel_public_id, websocket)
        await manager.broadcast(
            channel_public_id,
            {
                "event": "presence_update",
                "channel_public_id": channel_public_id,
                "online_users": manager.get_online_users(channel_public_id),
            },
        )
