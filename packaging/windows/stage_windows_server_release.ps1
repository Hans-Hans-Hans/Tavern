param(
  [string]$Version = "dev"
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$BuildDir = Join-Path $RepoRoot "dist\tavern-server"
$ReleaseRoot = Join-Path $RepoRoot "release\windows-server"
$OutDir = Join-Path $ReleaseRoot ("tavern-windows-server-" + $Version)

if (!(Test-Path $BuildDir)) {
  throw "Build output not found: $BuildDir`nRun .\packaging\windows\build_server_exe.ps1 first."
}

if (Test-Path $OutDir) {
  Remove-Item $OutDir -Recurse -Force
}

New-Item -ItemType Directory -Path $OutDir | Out-Null

Copy-Item $BuildDir -Destination (Join-Path $OutDir "tavern-server") -Recurse
Copy-Item (Join-Path $PSScriptRoot "start-tavern.bat") -Destination $OutDir
Copy-Item (Join-Path $PSScriptRoot ".env.example") -Destination (Join-Path $OutDir ".env.example")
Copy-Item (Join-Path $PSScriptRoot "WINDOWS_SERVER_RELEASE_README.txt") -Destination $OutDir

Write-Host "Staged Windows server release:"
Write-Host "  $OutDir"
