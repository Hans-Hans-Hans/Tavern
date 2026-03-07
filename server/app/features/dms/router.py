from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.orm import Session
from typing import List

from app.db.deps import get_db
from app.core.security import get_current_user
from app.features.users.models import User
from app.features.dms import service, schemas
from app.features.push import service as push_service
from app.features.websockets.dm_messages_ws import manager as dm_messages_ws_manager
from app.core.rate_limit import limiter

router = APIRouter(prefix="/dms", tags=["Direct Messages"])


@router.get("/", response_model=List[schemas.DirectConversationOut])
def list_conversations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return service.list_user_conversations(db, current_user.id)


@router.post("/{other_user_public_id}", response_model=schemas.DirectConversationOut)
@limiter.limit("80/minute")
def create_or_get_conversation(
    request: Request,
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
@limiter.limit("80/minute")
async def create_message(
    request: Request,
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
    convo = service.get_conversation_or_404(db, conversation_public_id)
    recipient_ids = [uid for uid in (convo.user_one_id, convo.user_two_id) if uid != current_user.id]
    push_service.send_push_to_user_ids_background(
        recipient_ids,
        {
            "type": "message_created",
            "mode": "dm",
            "conversation_public_id": conversation_public_id,
            "message_public_id": message["public_id"],
            "username": message["username"],
            "content": message["content"],
            "created_at": str(message["created_at"]),
            "title": f"DM - {message['username']}",
            "body": str(message["content"] or "")[:180],
            "url": f"/dashboard#dm={conversation_public_id}&message={message['public_id']}",
            "tag": f"tavern-dm-{conversation_public_id}-{message['public_id']}",
        },
    )
    return message


@router.delete("/{conversation_public_id}/messages/{message_public_id}")
async def delete_message(
    conversation_public_id: str,
    message_public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    result = service.delete_message(db, conversation_public_id, message_public_id, current_user.id)
    await dm_messages_ws_manager.broadcast(
        conversation_public_id,
        {
            "event": "message_deleted",
            "public_id": message_public_id,
            "user_id": current_user.id,
        },
    )
    return result


@router.post("/{conversation_public_id}/messages/{message_public_id}/delete")
@limiter.limit("80/minute")
async def delete_message_post_fallback(
    request: Request,
    conversation_public_id: str,
    message_public_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    result = service.delete_message(db, conversation_public_id, message_public_id, current_user.id)
    await dm_messages_ws_manager.broadcast(
        conversation_public_id,
        {
            "event": "message_deleted",
            "public_id": message_public_id,
            "user_id": current_user.id,
        },
    )
    return result
