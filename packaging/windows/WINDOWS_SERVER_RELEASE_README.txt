Tavern Windows Server (Lightweight Install)
===========================================

What is included
----------------
- start-tavern.bat          (double-click this to start)
- tavern-server\            (server executable + bundled files)
- .env.example              (example config; rename/copy to .env if needed)

How to run
----------
1. Double-click start-tavern.bat
2. On first run, it auto-creates `.env` from `.env.example` and generates a secure `SECRET_KEY`
3. Open the URL shown in the window:
   http://127.0.0.1:8000

Optional configuration
----------------------
- Edit `.env` to change:
  - `PORT`
  - `DATABASE_URL`
  - `COOKIE_SECURE`

How to share on your home network (LAN)
---------------------------------------
1. Start the server on the host PC
2. Find the host PC local IP (example: 192.168.1.50)
3. Other users connect to:
   http://192.168.1.50:8000

Notes
-----
- Keep the launcher window open while the server is running.
- Closing the window stops the server.
- If port 8000 is in use, set a different port before launch:
  In Command Prompt:
    set PORT=8080
    start-tavern.bat
