# HOWTO: Run Tavern on Linux

This file describes minimal steps to run the Tavern backend on a Linux machine (development or simple production).

Prerequisites (Debian/Ubuntu):

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-dev build-essential libpq-dev 
# Docker (optional):
sudo apt install -y docker.io docker-compose
```

Create a Python virtual environment and install dependencies:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` at the repo root (see README). Minimal example:

```
SECRET_KEY=replace-with-a-long-random-secret
DATABASE_URL=sqlite:///./server/tavern.db
COOKIE_SECURE=false
COOKIE_SAMESITE=lax
CORS_ORIGINS=http://127.0.0.1:8000,http://localhost:8000
```

Run the backend (from repository root):

```bash
uvicorn server.app.main:app --host 0.0.0.0 --port 8000
```

Notes:
- On first startup the app will create DB tables and the `server/uploads/` folders.
- If you want Postgres, install and run Postgres, set `DATABASE_URL` to a postgres URL, then run the migration script if moving from SQLite (see README).

Docker option:
- The repo contains `Dockerfile` and `docker-compose.yml`. To run with Docker:

```bash
docker-compose up --build
```

Systemd service example (replace paths and user):

```ini
[Unit]
Description=Tavern backend
After=network.target

[Service]
User=youruser
WorkingDirectory=/path/to/tavern
EnvironmentFile=/path/to/tavern/.env
ExecStart=/path/to/tavern/venv/bin/uvicorn server.app.main:app --host 0.0.0.0 --port 8000
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Common gotchas:
- Install system packages (`libpq-dev`, build tools) before `pip install` when using Postgres or packages needing compilation.
- Ensure file permissions allow the process to create `server/uploads/`.
- If static client files are missing, confirm `client/public/` exists; `server/app/main.py` will raise if not found.

Troubleshooting quick checks:
- Confirm Python version: `python3 --version`.
- Check DB dialect in Python: `python -c "from app.db.session import engine; print(engine.dialect.name)"` (run inside venv with correct working dir).

If you want, I can add a ready-to-use `systemd` unit file, a small `start.sh` wrapper, or a docker-compose example tuned for production.
