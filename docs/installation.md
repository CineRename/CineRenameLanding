# Installation

CineRename is available natively for **Windows**, **macOS**, and **Linux** thanks to Tauri v2.

## Downloads

You can download the binaries from the official download page.

| OS | Format |
| :--- | :--- |
| Windows 10/11 (x64) | `.exe` (installer) |
| macOS (Intel + Apple Silicon) | `.dmg` |
| Linux (universal) | `.AppImage` |

::: tip You can also use the [Download](/download) page on the website, which automatically detects your system.
:::

## Windows

1. Download the installer `CineRename-Setup.exe`.
2. Run it. If Windows SmartScreen displays a warning, click on **More info** → **Run anyway** *(the extended validation certificate is pending)*.
3. The installer places CineRename in `%LOCALAPPDATA%\Programs\CineRename`.

## macOS

1. Open the `.dmg` then drag **CineRename** into `Applications`.
2. On first launch, **right-click → Open** (and confirm) to allow execution *(the application is undergoing notarization with Apple)*.
3. For subsequent launches, double-clicking is sufficient.

::: warning Apple Silicon
The current version is compiled as a universal binary. If you experience performance issues, check in **About This Mac → System Report** that the application is running natively (not via Rosetta).
:::

## Linux

1. Download `CineRename.AppImage`.
2. Make the file executable:
   ```bash
   chmod +x CineRename.AppImage
   ```
3. Run:
   ```bash
   ./CineRename.AppImage
   ```

::: tip
To integrate CineRename into your applications menu, use [`AppImageLauncher`](https://github.com/TheAssassin/AppImageLauncher).
:::

## Package Managers (Coming Soon)

CineRename will soon be available via standard package managers:

- **macOS**: `brew install --cask cinerename`
- **Windows**: `winget install CineRename`

## Build from source

You can also build CineRename locally.

```bash
npm install
npm run tauri:dev
```

## Update

Auto-update is not activated yet. To update, download the latest version and overwrite the old installation.

## Uninstallation

- **Windows**: Settings → Apps → CineRename → Uninstall.
- **macOS**: move `CineRename.app` to the Trash.
- **Linux**: delete the `.AppImage`.

Local settings (naming presets, history, custom API keys) are stored in:

| OS | Folder |
| --- | --- |
| Windows | `%APPDATA%\CineRename\` |
| macOS | `~/Library/Application Support/CineRename/` |
| Linux | `~/.config/CineRename/` |

Delete it if you want to start from scratch.
