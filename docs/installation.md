# Installation

CineRename is available for **Windows**, **macOS**, **Linux desktop**, and **Linux headless/NAS**.

## Downloads

Use the official [Download](https://cinerename.app/download) page or the latest release page:

https://github.com/CineRename/CineRename-Releases/releases/latest

| System | Recommended formats |
| :--- | :--- |
| Windows 10/11 x64 | `.exe` installer, `.msi`, portable `.zip` |
| macOS Apple Silicon | arm64 `.dmg` or `.pkg` |
| macOS Intel | x64 `.dmg` or `.pkg` |
| Linux desktop | AppImage, `.deb`, `.rpm`, portable `.tar.xz` |
| NAS / headless Linux | x64 or arm64 `.tar.xz` |
| Docker | x64 or arm64 image archive |

::: tip
If you are unsure, start with the `.exe` on Windows, `.dmg` on macOS, and AppImage on Linux.
:::

## Windows

1. Download the `.exe` installer.
2. Run it.
3. If Windows SmartScreen displays a warning, click **More info** -> **Run anyway**.

The Windows builds are currently unsigned, so this warning is expected on first launch.

## macOS

1. Download the correct `.dmg` for your Mac: Apple Silicon or Intel.
2. Open the `.dmg`.
3. Drag **CineRename** into `Applications`.
4. On first launch, right-click **CineRename** -> **Open**, then confirm.

The macOS builds are currently unsigned/not notarized, so Gatekeeper may ask you to confirm the first launch.

## Linux Desktop

### AppImage

1. Download the AppImage.
2. Make it executable:

```bash
chmod +x CineRename_*.AppImage
```

3. Run it:

```bash
./CineRename_*.AppImage
```

### deb / rpm

Use the `.deb` package on Debian/Ubuntu-based distributions and the `.rpm` package on Fedora/openSUSE/RHEL-style distributions.

## NAS / Headless Linux

Download the x64 or arm64 NAS archive, extract it on your server, and run the included `cinerename` binary.

For server usage, see [CLI and headless usage](/cli).

## Updates

Direct desktop builds include CineRename's in-app updater. You can check for updates from **Preferences -> General -> Updates**.

Store and package-manager builds should be updated through their own channel when those channels are published.

## Uninstallation

- **Windows**: Settings -> Apps -> CineRename -> Uninstall.
- **macOS**: move `CineRename.app` to the Trash.
- **Linux AppImage / portable**: delete the downloaded app or extracted folder.
- **Linux deb / rpm**: uninstall with your package manager.

Local settings, history, logs, and license state are stored in your operating system's app-data location. Use the app's Support screen to copy logs/config before removing local data.
