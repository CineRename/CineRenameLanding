# Changelog

This page lists CineRename releases in reverse chronological order. Downloads are available from the main download page.

<!-- CINERENAME_RELEASE_HISTORY_START -->

## CineRename v0.5.9

Released on 2026-10-26.

### Highlights

- ZIP imports show files before completion and report extraction and cache verification progress more accurately.
- Studio uses your saved source and preset to prepare matches, while preserving your choices when adding files or refreshing matches.
- More reliable settings saving and macOS keychain access, with fewer repeated password prompts.

## CineRename v0.5.8

Released on 2026-10-23.

### Highlights

- Jikan / MyAnimeList is now available as a source for anime and episode metadata, without an account or personal API key. AniList, Kitsu or Jikan can be selected as the default anime source.
- Files added to watch folders while the app was closed are picked up on reopening, with more reliable recovery and fewer duplicate imports.
- Transfer progress reflects the amount of data transferred, and the status bar shows the new filename.
- Various fixes to Studio, navigation, startup appearance, saving settings and interface translations.

## CineRename v0.5.7

Released on 2026-10-18.

### Highlights

- Choose a saved destination for selected files directly in Studio, with a path preview and no changes to your automation settings.
- Read translated release notes offline by clicking the installed version.
- Settings remain accessible while the local index initializes at startup.

## CineRename v0.5.6

Released on 2026-10-16.

### Highlights

- Save separate destinations for movies, TV shows and anime.
- More accurate progress and improved cancellation for large file transfers.
- Improved macOS installer integrity.
- Clearer, less intrusive update notifications.

## CineRename v0.5.5

Released on 2026-10-15.

### Highlights

- **macOS NAS / SMB compatibility**: adds a fallback when a network volume does not support exclusive renaming, covering staging, finalization, rollback and undo.
- **Copies to network volumes**: copying can continue when the destination explicitly does not support preserving POSIX permissions; real access and I/O errors still stop the operation.
- **Naming templates**: handles spaces inside tokens such as `{ title }` and preserves token-like text contained in media titles.
- **Media details**: corrects video bit-depth detection for formats such as NV12 and for files reporting an unknown raw bit depth.
- **Subtitle timing**: fixes an overflow when applying drift correction with large offsets and improves precision over long durations.
- **Archive cache**: prevents cleanup crashes caused by out-of-range timestamps in cache markers.
- **Security**: updates TLS and frontend dependencies and prevents hooks and Plex/Jellyfin refresh requests from automatically forwarding authentication data through redirects. Configure the final endpoint URL directly.
- **Performance**: reduces allocations during natural path sorting and template rendering.
- **Usage analytics**: restores website-to-app attribution and adds screen and settings navigation events.

## CineRename v0.5.4

Released on 2026-09-13.

### Highlights

- Full Spanish and Simplified Chinese localization: complete interface translation, automatic OS language detection on startup, and dedicated subtitle search.
- Synology NAS & Docker compatibility: fixes WebUI server startup (port 8787) and eliminates crash loops on Linux kernels without Landlock support.
- Windows network shares (UNC): resolves false positive "file no longer available on disk" warnings when renaming files on shared network folders (\\server\share).
- Long paths & cloud storage support: native support for Windows paths exceeding 260 characters and improved compatibility with cloud-synced folders (OneDrive, Dropbox).

## CineRename v0.5.3

Released on 2026-09-12.

### Highlights

- Enables MediaInfo tokens (`{resolution}`, `{source}`, `{video_codec}`, `{audio_codec}`, `{audio_language}`, `{dynamic_range}`, `{bit_depth}`) natively and permanently across all operating systems, fixing previous platform-level restrictions on Windows.
- Streamlines the template settings editor with permanent token chips, instant real-time preview, and declutters Advanced Settings by removing redundant toggles.
- Introduces a persistent update notification system with a top notification banner, sidebar widget, and status bar badges for seamless one-click updates.
- Harmonizes French and English linguistic and typographic standards, including proper non-breaking spaces, curly apostrophes, and consistent media terminology.
- Updates comprehensive documentation for the portable CLI, headless background server, and NAS/Docker workflows.

## CineRename v0.5.2

Released on 2026-09-03.

### Highlights

- Makes watched folders fully resilient: disconnected drives or missing paths no longer block watcher startup or folder management.
- Eliminates infinite subtitle re-import loops across manual downloads, Automatic Mode, and sidecar renames.
- Improves background ergonomics: newly detected media no longer steals screen focus or closes open review dialogs.
- Resolves the infinite loading spinner and close button issue in the subtitle preview dialog.
- Enhances Studio toolbar readability with granular batch status counters and perfectly aligned row actions.
- Fixes dropdown menu positioning and overflow behavior across compound controls.
- Eliminates idle CPU wakeups in the file stability coordinator for better battery life.
- Adds direct file manager opening and custom label editing to the Watched Folders settings tab.

## CineRename v0.5.1

Released on 2026-09-02.

### Highlights

- Makes rename jobs safer by improving recovery and undo when a move, copy, or rename is interrupted.
- Makes history more reliable, so completed actions are easier to review and roll back.
- Improves the built-in updater with stronger signature checks and a safer restart after installing an update.
- Important for macOS: users on 0.5.0 must install 0.5.1 manually from the DMG or PKG; Windows and Linux can keep using the built-in updater.
- Keeps rename behavior consistent between the desktop app, CLI, NAS builds, and Docker archives.
- Improves day-to-day stability for the interface.
- Adds clearer release downloads and verification files so users can choose the right installer and check it if needed.

## CineRename v0.5.0

Released on 2026-07-09.

### Highlights

- Rename and organize movies, TV shows and anime with a safe preview before touching files.
- Ready-made Plex, Jellyfin and Kodi naming profiles, including media folders and ID-aware formats.
- Anime support with absolute episode numbering, AniList/Kitsu lookup and localized episode titles through TheTVDB when available.
- Dry-run exports, rename history and undo/rollback for safer bulk operations.
- Subtitle search with OpenSubtitles, language selection, preview, conversion and timing adjustment tools.
- Library audit, NFO generation, poster/fanart download and metadata sidecars for media servers.
- Watch folders, cautious automatic pipeline, qBittorrent / Transmission / JDownloader integrations and Pre-Arr workflows.
- Headless CLI, WebUI, TUI, scheduler, NAS tarballs and Docker archives for server use.

<!-- CINERENAME_RELEASE_HISTORY_END -->
