from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3

from app.auth.hashing import hash_password, verify_password
from app.auth.validator import validate_password
from app.auth.jwt import create_access_token

app = FastAPI(title="Tavern Auth API")

# Allow your frontend to talk to the backend
origins = [
    "http://127.0.0.1:3000",  # your frontend
    "http://localhost:3000",  # also allow localhost
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],    # allow GET, POST, etc.
    allow_headers=["*"],    # allow headers like Content-Type, Authorization
)

# Database setup
DB_FILE = "users.db"
conn = sqlite3.connect(DB_FILE, check_same_thread=False)
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
)
""")
conn.commit()

# Pydantic models
class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

# Routes
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
    cursor.execute(
        "SELECT password_hash FROM users WHERE username = ?",
        (user.username,)
    )
    row = cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="User not found.")

    hashed = row[0]
    if not verify_password(user.password, hashed):
        raise HTTPException(status_code=401, detail="Invalid password.")

    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
