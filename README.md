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
- For user OAuth in the dashboard import modal, also set:
  - `DISCORD_OAUTH_CLIENT_ID`
  - `DISCORD_OAUTH_CLIENT_SECRET`
  - `DISCORD_OAUTH_REDIRECT_URI` (example: `https://localhost:8000/discord/oauth/callback`)
  - These are global defaults. Users can now override these in-app per account from the Discord import modal.
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
- `POST /discord/import-layout` to copy a Discord guild channel layout into a Tavern server:
  - Example payload:
    - `{ "server_public_id": "<tavern-server-id>", "guild_id": "<discord-guild-id>", "replace_existing": false, "skip_existing": true, "include_text": true, "include_voice": true, "create_categories": true, "prefix_category": true }`
  - Notes:
    - Imports Discord text/forum/news channels as Tavern `text`
    - Imports Discord voice/stage channels as Tavern `voice`
    - `create_categories=true` creates Tavern channel categories and sidebar grouping separators from Discord categories
    - `prefix_category=true` keeps category context in names when importing without category grouping (e.g., `Category / channel-name`)
    - `replace_existing=true` removes current Tavern channels in the target server before importing

Server-side channel layout:
- Channel sidebar layout tokens and custom separators are persisted server-side via:
  - `GET /channels/server/{server_public_id}/layout`
  - `PUT /channels/server/{server_public_id}/layout`
- Channel categories:
  - `GET /channels/server/{server_public_id}/categories`
  - `POST /channels/server/{server_public_id}/categories`

User OAuth flow endpoints (dashboard modal uses these):
- `GET /discord/oauth/start` (opens Discord login/consent in second tab)
- `GET /discord/oauth/callback` (Discord redirect target)
- `GET /discord/oauth/session`
- `GET /discord/oauth/guilds`
- `POST /discord/oauth/import-layout`
  - Uses OAuth to verify the user/guild selection, then imports layout through the configured Discord bot connection.

Guide:
- See [docs/discord-layout-import.mc](docs/discord-layout-import.mc) for step-by-step setup/import/troubleshooting.

Voice status behavior:
- Whenever members join/leave a Discord voice channel, the bot updates that channel's name to include current occupants.
- When a channel empties, its original base name is restored.

## Bootstrap Admin
- Username: `admin`
- Password: `admin`
- First login forces password reset.
