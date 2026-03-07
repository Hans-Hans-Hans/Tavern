# Tavern Docker + Portainer Setup

This guide deploys Tavern securely behind your own domain.

## 1. Requirements
- Docker Engine + Docker Compose plugin
- Portainer (optional but recommended)
- Reverse proxy with TLS (Nginx/Caddy/Traefik)
- Domain (example: `tavern.example.com`)

## 2. Prepare `.env`
Create `.env` in repo root:

```env
SECRET_KEY=replace-with-a-long-random-secret
DATABASE_URL=sqlite:////data/tavern.db
COOKIE_SECURE=true
CORS_ORIGINS=https://tavern.hans-homelab.com
APP_VERSION=1.1.0
```

Notes:
- `DATABASE_URL=sqlite:////data/tavern.db` stores DB in a Docker volume.
- `COOKIE_SECURE=true` requires HTTPS at the proxy/domain.
- PostgreSQL is also supported with `DATABASE_URL=postgresql+psycopg2://...`.

## 3. Deploy with Docker Compose
From repo root:

```bash
docker compose up -d --build
```

Check:

```bash
docker compose ps
docker compose logs -f tavern
```

Health endpoint:
- `http://<host>:8000/health`

## 4. Deploy with Portainer (Stack)
1. Open Portainer.
2. Go to `Stacks` -> `Add stack`.
3. Name: `tavern`.
4. Paste `docker-compose.yml` contents.
5. Add environment variables (or upload `.env` if your Portainer setup supports it).
6. Deploy stack.

## 5. Reverse Proxy + Cloudflare
- Proxy external `443 -> tavern:8000`.
- Ensure WebSocket upgrade is enabled.
- Keep Cloudflare record proxied (orange cloud) when TLS is configured correctly.
- Use Full (strict) TLS mode when possible.

## 6. Persistence
Compose creates named volumes for:
- `/data` (SQLite DB)
- `/app/server/uploads` (message/server/user images)
- `/app/server/logs` (app logs)

Do not deploy without persistent volumes unless it is disposable.

## 7. Basic Hardening Checklist
- Strong `SECRET_KEY`
- `COOKIE_SECURE=true` in production
- `CORS_ORIGINS` limited to real domain(s)
- No direct public exposure of port 8000 without reverse proxy/TLS
- Regular backups of DB + uploads
- Keep container image updated

## 8. Backup Example
Inside container, DB path is `/data/tavern.db`.
Back up both:
- DB file (`/data/tavern.db`)
- Uploads (`/app/server/uploads`)

If migrating from SQLite to PostgreSQL:
- Run from repo root:
  - `python scripts/migrate_sqlite_to_postgres.py --source "sqlite:////data/tavern.db" --target "postgresql+psycopg2://user:pass@db:5432/tavern"`

## 9. Update Flow
```bash
git pull
docker compose build --no-cache tavern
docker compose up -d
```

## 10. Troubleshooting
- Cannot login after enabling secure cookies:
  - confirm site is actually HTTPS end-to-end.
- Realtime not working:
  - verify reverse proxy supports WebSocket upgrade.
- Missing avatars/uploads:
  - confirm uploads volume is mounted and writable.
