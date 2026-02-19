# app/features/websockets/manager.py
from typing import Dict, List
from fastapi import WebSocket

class ConnectionManager:
    """
    Manages active WebSocket connections for Tavern.
    Keeps track of which users are connected to which channels.
    """
    def __init__(self):
        # channel_public_id -> list of websockets
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, channel_id: str, websocket: WebSocket):
        """
        Accepts a websocket connection and adds it to the channel's list.
        """
        await websocket.accept()
        if channel_id not in self.active_connections:
            self.active_connections[channel_id] = []
        self.active_connections[channel_id].append(websocket)

    def disconnect(self, channel_id: str, websocket: WebSocket):
        """
        Removes a websocket connection from a channel.
        """
        if channel_id in self.active_connections:
            self.active_connections[channel_id].remove(websocket)
            if not self.active_connections[channel_id]:
                del self.active_connections[channel_id]

    async def send_personal_message(self, websocket: WebSocket, message: dict):
        """
        Sends a message to a single websocket (used for confirmations, errors, etc.).
        """
        await websocket.send_json(message)

    async def broadcast(self, channel_id: str, message: dict):
        """
        Broadcasts a message to all websockets connected to the channel.
        """
        if channel_id in self.active_connections:
            for connection in self.active_connections[channel_id]:
                await connection.send_json(message)


# Singleton manager to be used across WebSocket endpoints
manager = ConnectionManager()
