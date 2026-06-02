# Auto Mode

The **auto mode** chains together the main functions of CineRename in a pipeline:

```
Source folder  →  renaming  →  subtitles  →  moving  →  final library
```

Ideal for processing a downloads folder without manual intervention.

## Who is it for

- **Plex / Jellyfin users** who want new files to land automatically well-named and with subtitles.
- **NAS Admins** who script Sonarr / Radarr post-processing.
- **Seedbox users** who pull downloads to a remote library.

## Configuration

In **Settings → Auto Mode**:

| Option | Description |
| --- | --- |
| **Source folder** | Where the files to process come from (e.g. `~/Downloads/Plex`) |
| **Movies library** | Final destination for movies (e.g. `/media/Plex/Movies`) |
| **Series library** | Final destination for series (e.g. `/media/Plex/Series`) |
| **Anime library** | Final destination for animes (separated if you wish) |
| **Naming preset** | Plex / Jellyfin / Emby / Custom |
| **Subtitles** | Enable / disable, preferred language |
| **Duplicates** | If a better quality file already exists in the library, action to take (`replace` / `keep both` / `ignore`) |
| **On conflict** | If the target already exists: `skip` / `overwrite` / `keep both` |

## Run the pipeline

Three ways:

1. **From the Studio** — **Run auto pipeline** button on the loaded files.
2. **From the CLI** — `cinerename auto /path --to /Plex/...` (see [CLI](/cli)).
3. **In the background** — **Watch source folder** option: CineRename watches the folder and automatically triggers on each new file detected.

## Security

The auto mode respects the same guarantees as the Studio:

- **Logged preview** — each action is announced in the console / history before execution.
- **No overwrite** by default — `keep both` mode is selected if nothing is specified.
- **Reversible** — each operation is tracked individually in the [History](/history), therefore undoable.

::: warning Surveillance and torrent workflows
If you enable surveillance on a folder where torrents write during download (`*.part`, `.!ut`), filter on the final extension only. Otherwise CineRename may attempt to process an incomplete file.
:::

## Example Scenarios

### Scenario 1 — Seedbox pull to NAS

1. `rsync` pulls `seedbox:downloads/` to `/mnt/nas/incoming/`
2. CineRename watches `/mnt/nas/incoming/`
3. Auto pipeline:
   - renames
   - downloads EN subtitles
   - moves to `/mnt/nas/Plex/Movies` or `/mnt/nas/Plex/Series`
4. Plex scans `/mnt/nas/Plex/` → content recognized instantly

### Scenario 2 — Sonarr post-processing

1. Sonarr downloads an episode
2. At the end, Sonarr calls a script `post-process.sh`
3. This script runs `cinerename auto $sonarr_episodefile_path --to /Plex/Series --subs en`
4. No manual action required

### Scenario 3 — Family Mac

1. A family member drags a folder into `~/Movies/Inbox`
2. CineRename Mac, running in the background, watches this folder
3. Auto pipeline moves it to a clean `~/Movies/Plex/...`

## Logs

All pipeline events are written to:

| OS | Path |
| --- | --- |
| Windows | `%APPDATA%\CineRename\logs\auto-pipeline.log` |
| macOS | `~/Library/Application Support/CineRename/logs/auto-pipeline.log` |
| Linux | `~/.config/CineRename/logs/auto-pipeline.log` |

Log level is configurable in **Settings → Advanced → Verbosity**.
