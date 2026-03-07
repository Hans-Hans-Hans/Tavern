# Tavern Docker + Portainer Guide

This guide covers production deployment on Docker/Portainer, with either SQLite (simple) or PostgreSQL (recommended long-term).

## 1. Requirements
- Docker Engine + Compose plugin
- Portainer (optional but recommended)
- Reverse proxy with HTTPS (Nginx/Caddy/Traefik)
- Public DNS name (example: `tavern.example.com`)

## 2. Prepare `.env`
Create `tavern/.env`:

```env
SECRET_KEY=replace-with-a-long-random-secret
DATABASE_URL=sqlite:////data/tavern.db
COOKIE_SECURE=true
COOKIE_SAMESITE=none
CORS_ORIGINS=https://tavern.example.com
APP_VERSION=1.1.0
```

Notes:
- SQLite path `sqlite:////data/tavern.db` maps into Docker volume `tavern_db`.
- For Postgres, set:
  - `DATABASE_URL=postgresql+psycopg2://user:pass@postgres-host:5432/tavern`
- Do not commit `.env`.

## 3. Deploy with Docker Compose
From repo root:

```bash
docker compose up -d --build
```

Check status:
```bash
docker compose ps
docker compose logs -f tavern
```

Health probe:
- `http://<host>:8000/health`

## 4. Deploy with Portainer Stack
1. Portainer -> `Stacks` -> `Add stack`.
2. Name stack: `tavern`.
3. Paste `docker-compose.yml`.
4. Add env vars from `.env`.
5. Deploy stack.

## 5. Reverse Proxy
- Route `443 -> tavern:8000`.
- Enable WebSocket upgrade forwarding.
- Keep HTTPS end-to-end.
- If using Cloudflare, prefer Full (strict) TLS.

## 6. Persistence (Critical)
Current compose mounts named volumes:
- `tavern_db` -> `/data`
- `tavern_uploads` -> `/app/server/uploads`
- `tavern_logs` -> `/app/server/logs`

Do not run production without persistent volumes.

## 7. PostgreSQL Cutover from SQLite
If you started on SQLite and want Postgres:

1. Stop writes (maintenance window).
2. Back up:
- `/data/tavern.db`
- `/app/server/uploads`
- `.env`
3. Create Postgres DB/user.
4. Run migration from project root:
```bash
python scripts/migrate_sqlite_to_postgres.py \
  --source "sqlite:////data/tavern.db" \
  --target "postgresql+psycopg2://user:pass@postgres-host:5432/tavern"
```
5. Update `.env` `DATABASE_URL` to Postgres URL.
6. Restart stack:
```bash
docker compose up -d
```
7. Verify backend health and login/message flow.

## 8. Backup Strategy
Back up both database and uploads together.

SQLite deployment:
- `/data/tavern.db`
- `/app/server/uploads`

Postgres deployment:
- `pg_dump` output
- `/app/server/uploads`

Keep regular snapshots and test restore periodically.

## 9. Update Flow
```bash
git pull
docker compose build tavern
docker compose up -d
```

## 10. Troubleshooting
- Login/session issues:
  - verify HTTPS and `COOKIE_SECURE=true`
  - verify `COOKIE_SAMESITE` policy matches your host/proxy setup
- Realtime issues:
  - confirm WebSocket upgrade headers are forwarded
- Missing uploads:
  - check `tavern_uploads` volume mount and container write permissions
- Wrong DB backend:
  - inspect `DATABASE_URL` in `.env`
  - verify runtime via app logs or DB dialect check
