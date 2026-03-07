param(
  [switch]$Clean
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $RepoRoot

if ($Clean) {
  if (Test-Path ".\build") { Remove-Item ".\build" -Recurse -Force }
  if (Test-Path ".\dist\tavern-server") { Remove-Item ".\dist\tavern-server" -Recurse -Force }
}

Write-Host "Installing build dependency (PyInstaller)..."
python -m pip install pyinstaller
if ($LASTEXITCODE -ne 0) { throw "Failed to install/verify PyInstaller." }

Write-Host "Building tavern-server.exe (onedir)..."
python -m PyInstaller .\packaging\windows\tavern_server.spec --noconfirm
if ($LASTEXITCODE -ne 0) { throw "PyInstaller build failed." }

Write-Host ""
Write-Host "Build complete:"
Write-Host "  $RepoRoot\dist\tavern-server\tavern-server.exe"
Write-Host ""
Write-Host "Run with optional env vars:"
Write-Host "  HOST=0.0.0.0  PORT=8000  LOG_LEVEL=info"
