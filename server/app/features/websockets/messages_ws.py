# app/features/websockets/messages_ws.py

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Dict
from app.db.session import SessionLocal
from app.features.messages import service as message_service
from app.core.security_ws import get_current_user_ws
from app.features.servers.models import ServerMember
from app.features.push import service as push_service

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
):
    # Authenticate user + verify membership using a short-lived DB session.
    try:
        with SessionLocal() as db:
            user = await get_current_user_ws(websocket, db)
            channel = message_service.get_channel_or_404(db, channel_public_id)
            message_service.verify_membership(db, channel.server_id, user.id)
            channel_server_id = channel.server_id
            channel_name = channel.name
    except WebSocketDisconnect:
        return

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
            if msg_type == "battlemap_state_request":
                await manager.broadcast(
                    channel_public_id,
                    {
                        "event": "battlemap_state_requested",
                        "channel_public_id": channel_public_id,
                        "user_public_id": user.public_id,
                        "username": user.username,
                    },
                    exclude_ws=websocket,
                )
                continue
            if msg_type == "battlemap_state_update":
                state = data.get("state")
                if not isinstance(state, dict):
                    continue
                await manager.broadcast(
                    channel_public_id,
                    {
                        "event": "battlemap_state_updated",
                        "channel_public_id": channel_public_id,
                        "user_public_id": user.public_id,
                        "username": user.username,
                        "state": state,
                    },
                    exclude_ws=websocket,
                )
                continue

            content = data.get("content")
            if not content:
                continue
            parent_message_public_id = data.get("parent_message_public_id")

            # Create message using a short-lived DB session so channel websockets
            # do not pin pooled DB connections for their entire lifetime.
            with SessionLocal() as db:
                message = message_service.create_message(
                    db,
                    channel_public_id,
                    content,
                    user.id,
                    parent_message_public_id,
                )
                recipient_rows = (
                    db.query(ServerMember.user_id)
                    .filter(ServerMember.server_id == channel_server_id, ServerMember.user_id != user.id)
                    .distinct()
                    .all()
                )
            await manager.broadcast(channel_public_id, {
                "event": "message_created",
                **message,
                "created_at": str(message["created_at"]),
                "edited_at": str(message["edited_at"]) if message.get("edited_at") else None,
            })
            recipient_ids = [row[0] for row in recipient_rows if row and row[0] is not None]
            push_service.send_push_to_user_ids_background(
                recipient_ids,
                {
                    "type": "message_created",
                    "mode": "server",
                    "channel_public_id": channel_public_id,
                    "message_public_id": message["public_id"],
                    "username": message["username"],
                    "content": message["content"],
                    "created_at": str(message["created_at"]),
                    "title": f"#{channel_name} - {message['username']}",
                    "body": str(message["content"] or "")[:180],
                    "url": f"/dashboard#channel={channel_public_id}&message={message['public_id']}",
                    "tag": f"tavern-ch-{channel_public_id}-{message['public_id']}",
                },
            )
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
