# Plex / Jellyfin / Emby / Kodi

CineRename produces a folder structure directly compatible with the main media servers. This page summarizes the conventions and best practices per server.

## Naming conventions

CineRename follows the official conventions:

- [Plex Movie naming](https://support.plex.tv/articles/naming-and-organizing-your-movie-media-files/)
- [Plex TV naming](https://support.plex.tv/articles/naming-and-organizing-your-tv-show-files/)
- [Jellyfin Movie/TV naming](https://jellyfin.org/docs/general/server/media/movies/)
- [Emby naming guide](https://emby.media/support/articles/Movie-Naming.html)

All three servers largely share the same convention. The `plex`, `jellyfin` and `emby` presets are therefore close but not identical (subtleties on `Specials`, multi-episodes, extended editions).

## Movies

```
Movies/
├── My Movie (2023)/
│   ├── My Movie (2023).mkv
│   ├── My Movie (2023).en.srt
│   └── My Movie (2023).fr.srt
└── Other Movie (2024) {edition-Director's Cut}/
    └── Other Movie (2024) {edition-Director's Cut}.mkv
```

**Notes**:
- The year in parentheses is essential for matching.
- Multiple editions use `{edition-...}` (Plex/Jellyfin/Emby understand this).
- Subtitles `.lang.srt` next to the video file are automatically attached.

## TV Series

```
Series/
├── My Series (2020)/
│   ├── Season 01/
│   │   ├── My Series (2020) - S01E01 - Pilot.mkv
│   │   ├── My Series (2020) - S01E01 - Pilot.en.srt
│   │   └── My Series (2020) - S01E02 - Episode 2.mkv
│   └── Season 02/
│       └── ...
```

**Notes**:
- The `S01E01` format is the most universal.
- The episode title after the `-` is optional but helps with display.
- The `Season 01` folder (in English, zero-padded) is required by Plex.

## Animes

CineRename processes animes as TV series by default. Special cases:

- **Absolute numbering** (episodes from 1 to N without a season) → CineRename can convert to `S01E01..S01EN` depending on your preset.
- **Anime-only servers** like Stash or Jellyfin with the AniDB plugin → a specific `anidb` preset is available (Japanese titles, AniDB IDs).

## Configure Plex

1. In Plex, create two distinct libraries: **Movies** and **Series**.
2. Point them to the folders you use as targets (`organize --to`).
3. Enable the **Plex Movie / Plex TV Series** agent (the others do not support `{edition-...}`).
4. Run a scan.

::: tip If Plex doesn't recognize your files
Check:
1. The title + year match TheTVDB / TMDB.
2. The folder structure is correct (one folder per movie, `Season XX` subfolders for series).
3. No weird characters have been removed (e.g., `:` is automatically replaced by `-`).
:::

## Configure Jellyfin

Identical to Plex, with a few nuances:

- Jellyfin scrapes with **TheTVDB** by default (rather than TMDB) — handy since CineRename also uses TheTVDB.
- Real-time scanning can be enabled via `Library → Real-time monitoring`.

## Configure Emby

Identical to Jellyfin (Emby and Jellyfin are forks of the same historical code).

## Configure Kodi

1. In Kodi, navigate to the **Videos > Files** section.
2. Add your source folder for movies or series.
3. When configuring the scraper (Information provider):
   - For **Movies**: Choose *The Movie Database Python* or *Local information only* if you use NFOs.
   - For **Series**: Choose *TheTVDB* (recommended since CineRename uses TVDB IDs by default).
4. For movies, if you use the default CineRename preset (one movie per folder), make sure to enable the **"Movies are in separate folders"** option.
5. Confirm and update the library.

## What to do if recognition fails?

1. Rename via the **Studio** rather than a silent CLI — you will see uncertain matches.
2. Force a different match when in doubt (title similar to another).
3. Add the **TVDB / TMDB ID** explicitly in the folder name:
   - Plex: `My Movie (2023) {tmdb-12345}` or `{tvdb-12345}`
   - Jellyfin: `My Movie (2023) [tmdbid-12345]` or `[tvdbid-12345]`
   *(Note: CineRename queries TheTVDB/TVmaze for its own internal engine, but it preserves and transfers tags like `{tmdb-...}` entered manually to force matching on the Plex/Jellyfin side).*
4. If it persists, do the Plex Dance (move file out of library, scan, put it back, rescan).
