from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.db.deps import get_db
from app.core.security import get_current_user
from app.features.users.models import User
from app.features.dms import service, schemas
from app.features.websockets.dm_messages_ws import manager as dm_messages_ws_manager

router = APIRouter(prefix="/dms", tags=["Direct Messages"])


@router.get("/", response_model=List[schemas.DirectConversationOut])
def list_conversations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.list_user_conversations(db, current_user.id)


@router.post("/{other_user_public_id}", response_model=schemas.DirectConversationOut)
def create_or_get_conversation(
    other_user_public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    convo = service.get_or_create_conversation(db, current_user.id, other_user_public_id)
    conversations = service.list_user_conversations(db, current_user.id)
    return next((c for c in conversations if c["public_id"] == convo.public_id), conversations[0])


@router.get("/{conversation_public_id}/messages", response_model=List[schemas.DirectMessageOut])
def list_messages(
    conversation_public_id: str,
    limit: int = Query(100, le=200),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return service.list_messages(db, conversation_public_id, current_user.id, limit=limit)


@router.post("/{conversation_public_id}/messages", response_model=schemas.DirectMessageOut)
async def create_message(
    conversation_public_id: str,
    payload: schemas.DirectMessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    message = service.create_message(db, conversation_public_id, current_user.id, payload.content)
    await dm_messages_ws_manager.broadcast(
        conversation_public_id,
        {
            **message,
            "created_at": str(message["created_at"]),
            "edited_at": str(message["edited_at"]) if message.get("edited_at") else None,
        },
    )
    return message
