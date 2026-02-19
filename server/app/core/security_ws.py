from fastapi import WebSocket, WebSocketDisconnect, status, Depends
from app.core.security import decode_access_token
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.features.users.models import User

async def get_current_user_ws(websocket: WebSocket, db: Session = Depends(get_db)) -> User:
    """
    Auth for WebSocket connections using JWT in cookie.
    Raises WebSocketDisconnect if auth fails.
    """
    token = websocket.cookies.get("access_token")
    if not token:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        raise WebSocketDisconnect()
    
    # Strip "Bearer " if present
    if token.startswith("Bearer "):
        token = token[7:]

    try:
        payload = decode_access_token(token)
        public_id: str = payload.get("sub")
        if not public_id:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            raise WebSocketDisconnect()
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        raise WebSocketDisconnect()
    
    user = db.query(User).filter(User.public_id == public_id).first()
    if not user:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        raise WebSocketDisconnect()
    
    return user
