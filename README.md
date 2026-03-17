# Tavern

Tavern is a self-hosted realtime chat platform with servers, channels, DMs, voice, roles, presence, and rich client customization.

## What It Includes
- Realtime server/channel chat over WebSockets
- Direct messages and DM calling
- Voice channels (mute/deafen/per-user controls)
- Reactions, replies, threads, pinning, edits, deletes
- Server roles + permission controls
- Admin endpoints and audit/logging features
- Push notifications and installable PWA client

## Stack
- Backend: FastAPI + SQLAlchemy
- Frontend: Vanilla HTML/CSS/JS
- Realtime: WebSockets
- Databases: SQLite and PostgreSQL (`psycopg2`)

## Local Quick Start
1. Create `tavern/.env`:
```env
SECRET_KEY=replace-with-a-long-random-secret
DATABASE_URL=sqlite:///./tavern.db
COOKIE_SECURE=false
COOKIE_SAMESITE=lax
CORS_ORIGINS=http://127.0.0.1:8000,http://localhost:8000
DISCORD_BOT_TOKEN=your-discord-bot-token
```
2. Install dependencies:
```bash
pip install -r requirements.txt
```
3. Start backend from repo root:
```bash
uvicorn server.app.main:app --host 0.0.0.0 --port 8000
```
4. Open:
- `http://127.0.0.1:8000`

## PostgreSQL Migration (SQLite -> Postgres)
1. Back up first:
- `server/tavern.db`
- `server/uploads/`
- `.env`
2. Set/confirm a Postgres URL:
- `postgresql+psycopg2://user:pass@host:5432/tavern`
3. Run migration from repo root:
```bash
python scripts/migrate_sqlite_to_postgres.py \
  --source "sqlite:///./server/tavern.db" \
  --target "postgresql+psycopg2://user:pass@host:5432/tavern"
```
4. Update `.env`:
```env
DATABASE_URL=postgresql+psycopg2://user:pass@host:5432/tavern
```
5. Restart backend.
6. Verify active DB:
```bash
cd server
..\venv\Scripts\python.exe -c "from app.db.session import engine; print(engine.dialect.name)"
```
Expected output: `postgresql`

Notes:
- `--truncate-target` replaces existing target rows.
- Migration preserves IDs and resets Postgres sequences.
- Legacy SQLite FK-orphan rows are tolerated during migration import.

## Backups
- Store backups under `backups/` (already gitignored).
- Keep DB + uploads together for restorable snapshots.

## Deploy / Docker / Portainer
- See [HOWTO_DOCKER_PORTAINER.md](HOWTO_DOCKER_PORTAINER.md).

## Useful Scripts
- Cache/version asset sync:
```bash
python scripts/sync_client_assets.py --version 20260307-hotfix71
```
- Post-deploy smoke test:
```bash
python scripts/smoke_test.py --base-url http://127.0.0.1:8000 --username admin --password <password>
```

## Security Basics
- Never commit `.env`.
- Use a strong `SECRET_KEY`.
- Use HTTPS in production with `COOKIE_SECURE=true`.
- Restrict `CORS_ORIGINS` to real hostnames.
- Persist DB/uploads/log volumes in production.

## Discord Bot Integration
- Set `DISCORD_BOT_TOKEN` in `.env` and restart the backend.
- Install/update dependencies (`pip install -r requirements.txt`) so `discord.py` and `PyNaCl` are available.
- Invite your bot with permissions for:
  - `Send Messages`
  - `Connect` and `Speak` (for voice joins)
  - `Manage Channels` (for voice channel name status updates)

Admin-only API endpoints:
- `GET /discord/status`
- `POST /discord/message` with `{ "channel_id": "...", "content": "..." }`
- `POST /discord/voice/join` with `{ "channel_id": "...", "self_mute": false, "self_deaf": false }`
- `POST /discord/voice/leave` with `{ "guild_id": "..." }` or `{}` for all guild voice sessions
- `POST /discord/voice/sync-name` with `{ "channel_id": "..." }`

Voice status behavior:
- Whenever members join/leave a Discord voice channel, the bot updates that channel's name to include current occupants.
- When a channel empties, its original base name is restored.

## Bootstrap Admin
- Username: `admin`
- Password: `admin`
- First login forces password reset.
