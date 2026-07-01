# Quick Start

This page guides you through your first renaming process. Small folders usually take a few minutes; very large folders depend on disk speed, provider availability, and whether you also fetch subtitles or artwork.

## Prerequisites

- CineRename installed ([Installation](/installation))
- A folder containing video files (movies, TV show episodes, or anime)
- An internet connection to query metadata providers such as TheTVDB, TVmaze, AniList, Kitsu, and OpenSubtitles when those features are enabled. Video files are not uploaded.

## 1. Launch the app and open the Studio

At startup, CineRename opens the **Studio** screen. This is where everything begins.

<img src="/assets/img/screen-studio.png" alt="CineRename Studio">

::: info Studio = secure sandbox
No files are touched until you validate. Everything that happens in the Studio is a **preview**.
:::

::: tip Zero Risk: The Time Machine
Even after validation, the **History** tab allows you to undo any operation with a single click. Made a format mistake? Click Undo and your files instantly revert to their original names.
:::

## 2. Drag and drop your files

You have three options:

- **Drag and drop** an entire folder (or multiple files) directly into the Studio window.
- Click on **Add files** or **Add folders**.
- Drop a **ZIP / RAR / 7z archive**: CineRename extracts supported archives to a local cache before processing the video files. Password-protected archives are not supported.

CineRename proposes a media type for each file, and you can correct it manually when a mixed folder confuses the detector:
- **Movie** — title/year matching with metadata providers.
- **TV episode** — season/episode parsing and series metadata lookup.
- **Anime** — anime-aware matching, including absolute episode numbering when the selected preset uses it.

## 3. Check the Before / After preview

Each file appears in the list with:

| Before | After |
| --- | --- |
| `My.Movie.2023.1080p.BluRay.x264-GROUP.mkv` | `My Movie (2023).mkv` |

Click on any row to see details or edit manually.

::: tip Choose the right match
If CineRename hesitates between multiple results, a selector appears. Select the correct movie/episode and the preview updates instantly.
:::

## 4. Configure the format (optional)

Before validating, you can choose a **naming preset**:

- **Plex** (default) — `Series Name (Year)/Season 01/Series Name - S01E01 - Episode Title.mkv`
- **Jellyfin** — convention identical to Plex with a few adjustments
- **Emby** — very similar
- **Kodi** — variants for XBMC/Kodi
- **Custom** — edit the pattern in **Preferences → Naming templates**.

## 5. Validate the renaming

When you are satisfied, click **Rename**. CineRename:

1. Asks for confirmation (zero-regret ergonomics)
2. Renames all files in parallel
3. Displays a summary
4. Records the operation in the **History** (indefinitely recoverable)

## 6. What's next?

- To automatically add subtitles → [Subtitles Module](/subtitles)
- To clean up multiple copies → [Duplicates Module](/duplicates)
- To undo or review → [History & Undo](/history)
- To automate an entire folder → [Automation Pipeline](/auto-mode)
- To script on a NAS → [CLI](/cli)

::: tip Go further
If you manage a Plex / Jellyfin server, read [Plex / Jellyfin / Emby](/media-servers) to calibrate presets according to your server.
:::
