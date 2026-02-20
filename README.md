# Tavern

Self-hosted realtime chat with servers, channels, DMs, voice, roles, and rich client customization.

## Highlights
- Server/channel chat with WebSocket realtime updates
- Direct messages and direct calling
- Voice channels (mute/deafen/per-user volume)
- Reactions, replies, threads, editing, deleting
- Role-based server permissions and admin panel
- Presence + typing indicators
- Theme system, Labs toggles, and client customization

## Tech Stack
- Backend: FastAPI, SQLAlchemy, WebSockets
- Frontend: HTML/CSS/Vanilla JS
- DB: SQLite by default (PostgreSQL can be added later)

## Quick Start (Local Python)
1. Create `.env` at repo root:
   - `SECRET_KEY=<strong-random-secret>`
   - `DATABASE_URL=sqlite:///./server/tavern.db`
   - `COOKIE_SECURE=false`
   - `CORS_ORIGINS=http://127.0.0.1:8000,http://localhost:8000`
2. Install dependencies:
   - `pip install -r requirements.txt`
3. Run:
   - `uvicorn server.app.main:app --host 0.0.0.0 --port 8000`
4. Open:
   - `http://localhost:8000`

## Docker and Portainer
Production-oriented Docker files are included:
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

Full deployment instructions are in `HOWTO_DOCKER_PORTAINER.md`.

## Security Notes
- Do not commit `.env`.
- Use a strong `SECRET_KEY`.
- Set `COOKIE_SECURE=true` behind HTTPS.
- Restrict `CORS_ORIGINS` to your real domain(s).
- Persist volumes for DB/uploads/logs.

## Default Bootstrap Admin
- Username: `admin`
- Password: `admin`
- First login requires password reset.

Change this immediately in production.
