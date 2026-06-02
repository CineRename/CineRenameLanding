# Troubleshooting

## The application does not launch

### Windows

- **SmartScreen blocks execution**: click on **More info** → **Run anyway**. The application will be added to the trusted list for subsequent launches.
- **WebView2 error**: make sure `Microsoft Edge WebView2 Runtime` is installed (pre-installed on Windows 11, needs manual installation on older Windows 10 versions).

### macOS

- **"CineRename cannot be opened because the developer cannot be verified"**:
  - **Right-click on the icon → Open** (will only work once)
  - Or: **System Settings → Privacy & Security → Open Anyway**

### Linux

- **AppImage does not launch**: check `chmod +x CineRename.AppImage`. If the error mentions FUSE, install `libfuse2` (`sudo apt install libfuse2` on Ubuntu).
- **WebKit error**: on some minimal distros, install `webkit2gtk-4.0` or `webkit2gtk-4.1`.

## Plex / Jellyfin does not recognize my files

1. Check that the **folder structure** matches the server conventions (see [Plex / Jellyfin / Emby](/media-servers)).
2. Check that the **title + year** are recognized by TheTVDB or TMDB. If not, add the ID explicitly (`{tmdb-12345}`).
3. Run a **full scan** forcing metadata refresh.
4. If nothing works, move the file out of the library, scan, put it back, rescan (Plex Dance).

## Subtitles are not downloading

- Check your **OpenSubtitles API key** (Settings → Providers).
- The **video hash** might not find anything for very uncommon files. The metadata fallback takes over — verify that title + season + episode are properly identified in the Studio.
- Check the **rate limit**: OpenSubtitles limits the number of downloads per day depending on your plan.

## Auto mode loops endlessly

If CineRename reprocesses the same file every cycle:
- Check that the **final library** is different from the **source folder**.
- The watcher should be configured on the source folder only.
- If you use `rsync` to push into the source folder, make sure it finishes its copies before CineRename watches (use an `.in-progress` subfolder).

## Renaming is very slow

- On **mechanical hard drives**, massive operations are I/O-bound. Expect ~5-10s per 100 files.
- On **NAS via SMB / NFS**, latency multiplies operations. For very large volumes, mount the share locally (sshfs / nfs with `noatime`).
- Check the **logs** (`Settings → Advanced → Verbosity = debug`) to identify the slow step.

## "Access denied" error

- On **Windows**, run the application as administrator (right-click → **Run as administrator**).
- On **macOS**, Tauri v2 requires explicit permissions. Go to **System Settings → Privacy & Security → Full Disk Access** and allow CineRename.
- On **Linux**, check folder permissions (`ls -la`) and user ownership.

## Undo failed

See the dedicated section in [History & Undo](/history#limitations-of-undo). Frequent causes:

- File manually deleted outside of CineRename
- Source volume unmounted
- File renamed after CineRename processed it

## How to enable detailed logs?

**Settings → Advanced → Verbosity**:

- `error` — errors only (default)
- `warn` — errors + warnings
- `info` — key events
- `debug` — details useful for diagnosing
- `trace` — extremely verbose, for development

Or via the `CINERENAME_LOG_LEVEL=debug` environment variable.

## Where is my data?

| OS | Config folder | Logs |
| --- | --- | --- |
| Windows | `%APPDATA%\CineRename\` | `%APPDATA%\CineRename\logs\` |
| macOS | `~/Library/Application Support/CineRename/` | ditto `/logs/` |
| Linux | `~/.config/CineRename/` | ditto `/logs/` |

You can delete these folders to start from scratch (will lose history and presets).

## I didn't find my answer


- Write to [cinerename@gmail.com](mailto:cinerename@gmail.com) with:
  - Your OS and CineRename version
  - A precise description of the problem
  - Ideally the logs (`Settings → Advanced → Open logs folder`)
