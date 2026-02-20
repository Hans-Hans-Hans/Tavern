from datetime import UTC, datetime
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from fastapi import HTTPException

from app.features.users.models import User
from app.features.users import service as user_service
from app.features.dms.models import DirectConversation, DirectMessage


def _ordered_pair(user_a_id: int, user_b_id: int) -> tuple[int, int]:
    return (user_a_id, user_b_id) if user_a_id < user_b_id else (user_b_id, user_a_id)


def get_or_create_conversation(db: Session, requester_id: int, other_user_public_id: str) -> DirectConversation:
    other_user = db.query(User).filter(User.public_id == other_user_public_id).first()
    if not other_user:
        raise HTTPException(status_code=404, detail="User not found")
    if other_user.id == requester_id:
        raise HTTPException(status_code=400, detail="Cannot DM yourself")
    if not user_service.are_friends(db, requester_id, other_user.id):
        raise HTTPException(status_code=403, detail="You can only DM friends")

    user_one_id, user_two_id = _ordered_pair(requester_id, other_user.id)
    convo = (
        db.query(DirectConversation)
        .filter(
            DirectConversation.user_one_id == user_one_id,
            DirectConversation.user_two_id == user_two_id,
        )
        .first()
    )
    if convo:
        return convo

    convo = DirectConversation(user_one_id=user_one_id, user_two_id=user_two_id)
    db.add(convo)
    db.commit()
    db.refresh(convo)
    return convo


def _assert_conversation_member(conversation: DirectConversation, user_id: int):
    if user_id not in (conversation.user_one_id, conversation.user_two_id):
        raise HTTPException(status_code=403, detail="Not authorized")


def _assert_conversation_friendship(db: Session, conversation: DirectConversation):
    if not user_service.are_friends(db, conversation.user_one_id, conversation.user_two_id):
        raise HTTPException(status_code=403, detail="DM unavailable unless users are friends")


def list_user_conversations(db: Session, user_id: int):
    convos = (
        db.query(DirectConversation)
        .filter(or_(DirectConversation.user_one_id == user_id, DirectConversation.user_two_id == user_id))
        .order_by(DirectConversation.created_at.desc())
        .all()
    )
    out = []
    for convo in convos:
        if not user_service.are_friends(db, convo.user_one_id, convo.user_two_id):
            continue
        other_user = convo.user_two if convo.user_one_id == user_id else convo.user_one
        out.append(
            {
                "public_id": convo.public_id,
                "other_user_public_id": other_user.public_id,
                "other_username": other_user.username,
                "created_at": convo.created_at,
            }
        )
    return out


def get_conversation_or_404(db: Session, conversation_public_id: str) -> DirectConversation:
    convo = db.query(DirectConversation).filter(DirectConversation.public_id == conversation_public_id).first()
    if not convo:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return convo


def list_messages(db: Session, conversation_public_id: str, user_id: int, limit: int = 100):
    convo = get_conversation_or_404(db, conversation_public_id)
    _assert_conversation_member(convo, user_id)
    _assert_conversation_friendship(db, convo)

    newest = (
        db.query(DirectMessage)
        .filter(DirectMessage.conversation_id == convo.id)
        .order_by(DirectMessage.created_at.desc())
        .limit(limit)
        .all()
    )
    messages = list(reversed(newest))
    return [
        {
            "public_id": m.public_id,
            "conversation_public_id": convo.public_id,
            "user_id": m.user_id,
            "username": m.user.username,
            "content": m.content,
            "created_at": m.created_at,
            "edited_at": m.edited_at,
        }
        for m in messages
    ]


def create_message(db: Session, conversation_public_id: str, user_id: int, content: str):
    convo = get_conversation_or_404(db, conversation_public_id)
    _assert_conversation_member(convo, user_id)
    _assert_conversation_friendship(db, convo)

    msg = DirectMessage(conversation_id=convo.id, user_id=user_id, content=content)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return {
        "public_id": msg.public_id,
        "conversation_public_id": convo.public_id,
        "user_id": msg.user_id,
        "username": msg.user.username,
        "content": msg.content,
        "created_at": msg.created_at,
        "edited_at": msg.edited_at,
    }
