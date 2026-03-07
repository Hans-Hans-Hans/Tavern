@echo off
setlocal

cd /d "%~dp0"

echo ==========================================
echo   Tavern Server Launcher (Windows)
echo ==========================================
echo.

if not exist ".\tavern-server\tavern-server.exe" (
  echo ERROR: Could not find .\tavern-server\tavern-server.exe
  echo.
  echo Place this launcher next to the "tavern-server" folder from the build output.
  echo Expected layout:
  echo   start-tavern.bat
  echo   tavern-server\
  echo     tavern-server.exe
  echo.
  pause
  exit /b 1
)

if not exist ".\.env" (
  if exist ".\.env.example" (
    echo No .env found. Creating one from .env.example...
    copy /Y ".\.env.example" ".\.env" >nul
    powershell -NoProfile -Command "$b=New-Object byte[] 32; [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); $s=[Convert]::ToBase64String($b); (Get-Content '.\.env') -replace '^SECRET_KEY=.*$', ('SECRET_KEY=' + $s) | Set-Content '.\.env' -Encoding utf8"
    if errorlevel 1 (
      echo WARNING: Could not auto-generate SECRET_KEY. Edit .env and set SECRET_KEY manually.
    ) else (
      echo Created .env with a generated SECRET_KEY.
    )
    echo.
    echo Review .env if you want to change DATABASE_URL/PORT before sharing.
    echo.
  ) else (
    echo ERROR: Missing .env and .env.example configuration files.
    echo Expected .env.example next to start-tavern.bat
    echo.
    pause
    exit /b 1
  )
)

if "%PORT%"=="" set "PORT=8000"
if "%HOST%"=="" set "HOST=0.0.0.0"
if "%LOG_LEVEL%"=="" set "LOG_LEVEL=info"

echo Starting Tavern...
echo Local URL: http://127.0.0.1:%PORT%
echo LAN URL (replace with your PC IP): http://YOUR-LAN-IP:%PORT%
echo.
echo Close this window to stop the server.
echo.

".\tavern-server\tavern-server.exe"

echo.
echo Tavern server exited.
pause
