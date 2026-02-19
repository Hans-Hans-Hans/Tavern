# Import FastAPI and settings
from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:8000"],  # or "*" for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Database Setup ---

from app.db.session import engine
from app.db.base import Base

# IMPORT ALL MODELS FIRST
from app.features.users import models as users_models
from app.features.servers import models as servers_models
from app.features.channels import models as channels_models
from app.features.messages import models as messages_models

# THEN create tables
Base.metadata.create_all(bind=engine)


# --- Routers ---

from app.features.auth.router import router as auth_router
from app.features.users.router import router as users_router
from app.features.servers.router import router as servers_router
from app.features.channels.router import router as channels_router
from app.features.messages.router import router as messages_router
from app.features.websockets.messages_ws import router as messages_ws_router

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(servers_router)
app.include_router(channels_router)
app.include_router(messages_router)
app.include_router(messages_ws_router)

# Serve static files
from fastapi.staticfiles import StaticFiles
from pathlib import Path

# Get the root of the project
ROOT_DIR = Path(__file__).parent.parent.parent  # server/app/main.py -> root
CLIENT_PUBLIC_DIR = ROOT_DIR / "client" / "public"

# Verify that the path exists
if not CLIENT_PUBLIC_DIR.exists():
    raise RuntimeError(f"Client public folder not found: {CLIENT_PUBLIC_DIR}")

# Serve static frontend files
app.mount("/", StaticFiles(directory=CLIENT_PUBLIC_DIR, html=True), name="frontend")


# --- Health Check Route ---

@app.get("/health")
async def health_check():
    return {"status": "Tavern backend is running"}
