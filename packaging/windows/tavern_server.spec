# PyInstaller spec for a Windows Tavern server build (onedir).
# Run from the repository root: `pyinstaller packaging/windows/tavern_server.spec`

from pathlib import Path

from PyInstaller.utils.hooks import collect_submodules


_cwd = Path.cwd().resolve()
ROOT = _cwd if (_cwd / "server").exists() else _cwd.parents[1]

hiddenimports = []
hiddenimports += collect_submodules("uvicorn")
hiddenimports += collect_submodules("anyio")

a = Analysis(
    [str(ROOT / "packaging" / "windows" / "server_exe_entry.py")],
    pathex=[str(ROOT / "server")],
    binaries=[],
    datas=[
        (str(ROOT / "client" / "public"), "client/public"),
        (str(ROOT / "requirements.txt"), "."),
    ],
    hiddenimports=hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name="tavern-server",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name="tavern-server",
)
