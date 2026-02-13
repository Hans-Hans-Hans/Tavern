from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import sqlite3
from typing import List
from datetime import datetime

# Import your auth utilities
from app.auth.hashing import hash_password, verify_password
from app.auth.validator import validate_password
from app.auth.jwt import create_access_token, verify_access_token

app = FastAPI(title="Tavern API")

# ----------------------
# CORS
# ----------------------
origins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------
# Database Setup
# ----------------------
DB_FILE = "tavern.db"
conn = sqlite3.connect(DB_FILE, check_same_thread=False)
cursor = conn.cursor()

# Users table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
)
""")

# Taverns table
cursor.execute("""
CREATE TABLE IF NOT EXISTS taverns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    owner_id INTEGER NOT NULL,
    FOREIGN KEY(owner_id) REFERENCES users(id)
)
""")

# Channels table
cursor.execute("""
CREATE TABLE IF NOT EXISTS channels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tavern_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY(tavern_id) REFERENCES taverns(id)
)
""")

# Messages table
cursor.execute("""
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    channel_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY(channel_id) REFERENCES channels(id),
    FOREIGN KEY(sender_id) REFERENCES users(id)
)
""")
conn.commit()

# ----------------------
# Models
# ----------------------
class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class TavernCreate(BaseModel):
    name: str

class ChannelCreate(BaseModel):
    tavern_id: int
    name: str

class MessageCreate(BaseModel):
    channel_id: int
    content: str

class MessageOut(BaseModel):
    sender: str
    content: str
    timestamp: str

# ----------------------
# JWT Authentication Dependency
# ----------------------
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    if not token:
        raise HTTPException(status_code=401, detail="Token required")

    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    username = payload.get("sub")
    cursor.execute("SELECT id, username FROM users WHERE username = ?", (username,))
    row = cursor.fetchone()
    if not row:
        raise HTTPException(status_code=401, detail="User not found")

    return {"id": row[0], "username": row[1]}

# ----------------------
# Auth Routes
# ----------------------
@app.post("/register")
def register(user: UserCreate):
    try:
        validate_password(user.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    hashed = hash_password(user.password)
    try:
        cursor.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            (user.username, hashed)
        )
        conn.commit()
        return {"message": f"User {user.username} created successfully."}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username already exists.")

@app.post("/login")
def login(user: UserLogin):
    cursor.execute("SELECT password_hash FROM users WHERE username = ?", (user.username,))
    row = cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="User not found.")

    hashed = row[0]
    if not verify_password(user.password, hashed):
        raise HTTPException(status_code=401, detail="Invalid password.")

    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

# ----------------------
# Tavern Routes
# ----------------------
@app.post("/taverns")
def create_tavern(tavern: TavernCreate, user=Depends(get_current_user)):
    cursor.execute(
        "INSERT INTO taverns (name, owner_id) VALUES (?, ?)",
        (tavern.name, user["id"])
    )
    conn.commit()
    tavern_id = cursor.lastrowid
    return {"id": tavern_id, "name": tavern.name, "owner": user["username"]}

@app.get("/taverns")
def list_taverns():
    cursor.execute("""
        SELECT t.id, t.name, u.username 
        FROM taverns t 
        JOIN users u ON t.owner_id = u.id
    """)
    taverns = [{"id": row[0], "name": row[1], "owner": row[2]} for row in cursor.fetchall()]
    return taverns

# ----------------------
# Channel Routes
# ----------------------
@app.post("/channels")
def create_channel(channel: ChannelCreate, user=Depends(get_current_user)):
    # Check tavern ownership
    cursor.execute("SELECT owner_id FROM taverns WHERE id = ?", (channel.tavern_id,))
    row = cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Tavern not found.")
    if row[0] != user["id"]:
        raise HTTPException(status_code=403, detail="Not allowed to add channels to this tavern.")

    cursor.execute(
        "INSERT INTO channels (tavern_id, name) VALUES (?, ?)",
        (channel.tavern_id, channel.name)
    )
    conn.commit()
    return {"id": cursor.lastrowid, "name": channel.name}

@app.get("/taverns/{tavern_id}/channels")
def list_channels(tavern_id: int):
    cursor.execute("SELECT id, name FROM channels WHERE tavern_id = ?", (tavern_id,))
    channels = [{"id": row[0], "name": row[1]} for row in cursor.fetchall()]
    return channels

# ----------------------
# Messaging Routes
# ----------------------
@app.post("/messages")
def send_message(message: MessageCreate, user=Depends(get_current_user)):
    cursor.execute("SELECT id FROM channels WHERE id = ?", (message.channel_id,))
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="Channel not found.")

    timestamp = datetime.utcnow().isoformat()
    cursor.execute(
        "INSERT INTO messages (channel_id, sender_id, content, timestamp) VALUES (?, ?, ?, ?)",
        (message.channel_id, user["id"], message.content, timestamp)
    )
    conn.commit()
    return {"message": "Message sent.", "timestamp": timestamp}

@app.get("/channels/{channel_id}/messages", response_model=List[MessageOut])
def get_messages(channel_id: int):
    cursor.execute("""
        SELECT m.content, m.timestamp, u.username
        FROM messages m
        JOIN users u ON m.sender_id = u.id
        WHERE m.channel_id = ?
        ORDER BY m.id ASC
    """, (channel_id,))
    rows = cursor.fetchall()
    messages = [{"sender": row[2], "content": row[0], "timestamp": row[1]} for row in rows]
    return messages
