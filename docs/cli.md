# Command Line (CLI)

CineRename exposes a native CLI, ideal for scripting NAS, Seedbox or Plex server workflows.

## Installation

On **Windows / macOS / Linux**, the CLI is bundled with the main application. It can be invoked via the `cinerename` command (added to the PATH during installation).

### NAS Builds (Synology / QNAP / Headless Linux)

We produce two Linux tarballs for NAS servers:

| Architecture | Artifact | Triple |
| :--- | :--- | :--- |
| Intel / AMD 64-bit | `cinerename-linux-x86_64` | `x86_64-unknown-linux-gnu` |
| ARM 64-bit | `cinerename-linux-aarch64` | `aarch64-unknown-linux-gnu` (cross) |

Download the tarball corresponding to your NAS, extract it to `/volume1/@appstore/cinerename/`, and invoke the binary with the flags below. For continuous monitoring on NAS, prefer **cron** over the CLI rather than the Watch Folders feature which requires the GUI.

For any installation questions on NAS, contact support.

### Check the version

```bash
cinerename --version
```

### Help

```bash
cinerename --help
cinerename rename --help
```

## Main Commands

| Command | Action |
| --- | --- |
| `cinerename preview <path>` | Displays the Before / After preview without modifying anything |
| `cinerename rename <path>` | Renames in place |
| `cinerename organize <path> --to <lib>` | Renames + moves to a library |
| `cinerename auto <path> --to <lib>` | Full pipeline: renames + subtitles + moves |
| `cinerename subs <path>` | Downloads subtitles for files in the folder |
| `cinerename duplicates <path>` | Displays / cleans duplicates |
| `cinerename history` | Lists recent operations and their IDs |
| `cinerename undo <id>` | Undoes an operation from the history |

### Examples

```bash
# Preview a renaming without touching anything
cinerename preview /path/to/video.mkv

# Rename in place an entire folder
cinerename rename /path/to/folder

# Rename and move to the Plex/Jellyfin library
cinerename organize /path/to/downloads --to /Plex/Series

# Full pipeline: renaming + EN subtitles + moving
cinerename auto /path/to/downloads --to /Plex/Series --subs en

# Download subtitles only
cinerename subs /Plex/Series --lang en,fr

# List duplicates without deleting them
cinerename duplicates /Plex --dry-run

# Find the ID of a recent operation to undo it
cinerename history --limit 5
cinerename undo 12345
```

## Useful Flags

| Flag | Description |
| --- | --- |
| `--dry-run` | Simulate everything, write nothing |
| `--preset <name>` | Force a preset (`plex`, `jellyfin`, `emby`, `kodi`, `custom`) |
| `--subs <code,code>` | Subtitle languages (comma-separated) |
| `--on-conflict <skip\|overwrite\|both>` | Strategy in case of conflict |
| `--quiet` | Minimal output (useful in scripts) |
| `--verbose` | Detailed output for debugging |
| `--json` | Machine-readable output |

## Exit Codes

- `0` — success
- `1` — generic error
- `2` — invalid argument / unknown preset
- `3` — unresolved conflict (handle with `--on-conflict`)
- `4` — file access denied / lock
- `5` — external provider unreachable (TheTVDB / OpenSubtitles down)

Useful for chaining: `cinerename auto ... && notify-send "Pipeline OK"`.

## Sonarr / Radarr Integration

In **Sonarr → Settings → Connect → Custom Scripts**:

```bash
#!/usr/bin/env bash
set -e
[ "$sonarr_eventtype" = "Download" ] || exit 0
cinerename auto "$sonarr_episodefile_path" --to /Plex/Series --subs en --quiet
```

Adapt for Radarr by using `$radarr_moviefile_path`.

## Seedbox / NAS Integration

Cron example to process an incoming folder every 5 minutes:

```txt
*/5 * * * * /usr/local/bin/cinerename auto /mnt/incoming --to /mnt/Plex --subs en --quiet --on-conflict both
```

## Environment Variables

| Variable | Effect |
| --- | --- |
| `CINERENAME_TVDB_API_KEY` | Custom TheTVDB API key |
| `CINERENAME_OPENSUBTITLES_API_KEY` | Custom OpenSubtitles API key |
| `CINERENAME_CONFIG_DIR` | Config folder override |
| `CINERENAME_LOG_LEVEL` | `error` / `warn` / `info` / `debug` / `trace` |

See [API Providers](/providers) for full resolution details.
