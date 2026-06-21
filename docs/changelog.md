# Changelog

This page summarizes the major changes in CineRename. For the latest release, download from the main page.

## v0.5.0 — Initial Release

### Features

- 👁️ **Subtitle Viewer** — display SRT / VTT cue by cue, text search, integrated into the Subtitles Studio
- ☁️ **OpenSubtitles Upload** — publish a local subtitle from the app (requires a tester account, see [Subtitles](/subtitles))
- 💿 **Disc-rip linear pair** — automatic pairing of `VOB` / `M2TS` / `BDMV` with episodes of a series season
- 🔐 **Checksums manifest verification** — read a `.sfv` / `.md5` / `.sha1` / `.sha256` and flag altered/missing files
- 📅 **Episode list export** — export the complete schedule of a series to CSV / TSV / JSON
- 👁️ **Watch folders** — auto-import when new files arrive in a folder
- 🛠️ **JavaScript Templates** — embedded QuickJS engine for advanced patterns (ternaries, regex, closures — direct equivalent of FileBot's Groovy)
- 🗄️ **NAS Builds** — available for `linux-x86_64` and `linux-aarch64` (Synology / QNAP)

- ✅ **Subtitles** OpenSubtitles module
- ✅ Multi-quality **Duplicates** module
- ✅ Full pipeline **Auto** mode
- ✅ Native context menu (right-click) on duplicates: open location, play video, force delete
- ✅ Virtualization of Svelte 5 lists (performance on large volumes)
- ✅ Errors refactor with translation codes
- ✅ `PreviewEntryRow` and `HistoryEntryRow` components extracted
- ✅ **Plex / Kodi / Jellyfin / Emby** presets ready to use
- ✅ **Opportunistic** match-mode for highly noisy filenames
- ✅ File operations: **Move / Copy / Hardlink / Symlink**
- ✅ **FileBot format** importer (token-to-token converter)
- ✅ Checksums: **CRC32 / MD5 / SHA-1 / SHA-256** with sidecar manifest

- 🎬 **Studio** — renaming with Before / After preview
- 📝 Recognition of movies / series / animes via TheTVDB and TVmaze
- ⏳ **History** with one-click undo
- 🛠️ Naming presets for Plex / Jellyfin / Emby / Kodi
- 🌍 Multilingual interface EN / FR
- 💻 Initial CLI: `preview`, `rename`, `organize`

## Upcoming Roadmap

| Version | What's planned |
| --- | --- |
| **v0.6** | Release packaging and direct updater channels |
| **v0.7** | Store / package-manager publishing (Microsoft Store, Flatpak, Snap, winget, Homebrew) |
| **v0.8** | Metadata and subtitle matching polish |
| **Later** | Detection of multiple editions (Director's Cut, Extended), deeper anime provider support |

## Versioning Conventions

CineRename follows [SemVer](https://semver.org/):

- **Major** (`x.0.0`) — changes incompatible with previous versions
- **Minor** (`0.x.0`) — new backward-compatible features
- **Patch** (`0.0.x`) — bug fixes only

While the version is in `0.x.x`, the API (CLI commands, SQLite database format) may evolve. From `1.0.0`, stability will be guaranteed.

## SQLite Database History

On every internal database migration, CineRename automatically performs the migration at launch. No manual intervention is required — your operations history is preserved across versions.

::: warning Downgrade
Reverting to an older version after running a newer version is **not** guaranteed: the database might be at a future schema that the older version doesn't recognize. Backup `~/Library/Application Support/CineRename/cinerename.sqlite` before a downgrade.
:::
