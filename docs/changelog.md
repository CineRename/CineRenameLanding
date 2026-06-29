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
- 🛠️ **JavaScript Templates** — embedded QuickJS engine for advanced patterns (ternaries, regex, closures and conditional cleanup rules)
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
- ✅ Legacy format importer (token-to-token converter)
- ✅ Checksums: **CRC32 / MD5 / SHA-1 / SHA-256** with sidecar manifest

- 🎬 **Studio** — renaming with Before / After preview
- 📝 Recognition of movies / series / animes via TheTVDB and TVmaze
- ⏳ **History** with one-click undo
- 🛠️ Naming presets for Plex / Jellyfin / Emby / Kodi
- 🌍 Multilingual interface EN / FR
- 💻 Initial CLI: `preview`, `rename`, `organize`
