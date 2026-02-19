from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import List, Dict
from app.core.security_ws import get_current_user_ws
from app.db.deps import get_db
from sqlalchemy.orm import Session

router = APIRouter()

# Keep track of active WebSocket connections per server
active_connections: Dict[str, List[WebSocket]] = {}


async def broadcast(server_public_id: str, message: dict):
    """
    Send a JSON message to all clients connected to a server.
    Safe: ignores disconnected clients.
    """
    connections = active_connections.get(server_public_id, [])
    to_remove = []

    for connection in connections:
        try:
            await connection.send_json(message)
        except Exception:
            # Mark disconnected clients for removal
            to_remove.append(connection)

    for conn in to_remove:
        connections.remove(conn)


@router.websocket("/ws/channels/{server_public_id}")
async def websocket_channels(
    websocket: WebSocket,
    server_public_id: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user_ws),
):
    """
    WebSocket endpoint for clients to receive real-time channel events
    (e.g., new channels created) for a server they belong to.
    """
    await websocket.accept()

    # Initialize server connection list if missing
    if server_public_id not in active_connections:
        active_connections[server_public_id] = []
    active_connections[server_public_id].append(websocket)

    try:
        while True:
            # Keep connection alive; clients won't actually send data here
            # But we could receive pings or commands in the future
            await websocket.receive_text()
    except WebSocketDisconnect:
        pass
    finally:
        # Ensure socket is removed on disconnect
        if server_public_id in active_connections:
            if websocket in active_connections[server_public_id]:
                active_connections[server_public_id].remove(websocket)
