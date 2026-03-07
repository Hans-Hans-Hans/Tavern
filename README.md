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
- DB: SQLite by default, PostgreSQL supported

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

## Migrate SQLite to PostgreSQL
1. Create a PostgreSQL database and connection URL.
2. Run migration script from repo root:
   - `python scripts/migrate_sqlite_to_postgres.py --source "sqlite:///./tavern.db" --target "postgresql+psycopg2://user:pass@host:5432/tavern"`
3. Switch `.env`:
   - `DATABASE_URL=postgresql+psycopg2://user:pass@host:5432/tavern`
4. Restart Tavern.

Notes:
- Use `--truncate-target` only if target DB already has data you want to replace.
- Script preserves IDs and resets PostgreSQL sequences after copy.

## Docker and Portainer
Production-oriented Docker files are included:
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

Full deployment instructions are in `HOWTO_DOCKER_PORTAINER.md`.

## Frontend Build/Sync Workflow
Use the sync script to keep `client/public` and the served dist bundle in lockstep while stamping cache versions:

- `python scripts/sync_client_assets.py --version 20260227-hotfix4`

This will:
- stamp all frontend `?v=` asset query params
- update `SERVICE_WORKER_URL` version in dashboard JS
- copy `client/public` into `dist/tavern-server/_internal/client/public`

## Deploy Smoke Test
Run a quick post-deploy check:

- `python scripts/smoke_test.py --base-url http://127.0.0.1:8000 --username admin --password <password>`

The smoke test now verifies:
- `/api/version` is available
- dashboard footer includes cache meta
- dashboard JS contains cache-meta renderer
- mojibake markers are not present in dashboard HTML/JS/username payload

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
