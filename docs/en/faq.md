# FAQ

## What systems does CineRename run on?

CineRename is a native application for **Windows 10/11**, **macOS 11+** and **Linux** (via AppImage). The engine is written in Rust with Tauri v2, so performance is equivalent to native on all three OS.

## Do my files leave my computer?

**No.** All processing (analysis, renaming, hash calculation, moving) is done locally. The only network requests are to the **public metadata databases** (TheTVDB, TVmaze, OpenSubtitles) and only contain titles / hashes — never the files themselves.

## Can I undo a mistaken renaming?

Yes. The [History](/en/history) tab keeps track of every operation and lets you undo it in one click, even days later.

## Is CineRename compatible with Plex / Jellyfin / Emby?

Yes. CineRename produces names and a folder structure compliant with these servers. See [Plex / Jellyfin / Emby](/en/media-servers) for details.

## Does CineRename support ZIP / RAR files?

Yes. CineRename can read inside ZIP and RAR archives to identify the content. Depending on your settings, it can either:

- Automatically extract videos before processing,
- Process the content without extraction (indexed reading).

*(Note: Password-protected archives are not supported. Furthermore, extracting very large archives can take time and temporarily require double the disk space).*

## Is there a CLI?

Yes. See the [CLI](/en/cli) page. Available on all three OS, perfect for automating via Sonarr / Radarr / cron / NAS scripts.

## Is there a difference between Free and Pro?

| Feature | Free | Pro |
| --- | --- | --- |
| Studio (renaming) | ✅ 2 files / day | ✅ unlimited |
| Before / After preview | ✅ | ✅ |
| Basic metadata matching | ✅ | ✅ |
| OpenSubtitles subtitles | ✅ 2 files / day | ✅ unlimited |
| Multi-quality duplicates | ❌ | ✅ |
| Auto pipeline mode | ❌ | ✅ |
| Cloud sync of rules | ❌ | ✅ |
| Priority support | ❌ | ✅ |
| CLI (all commands) | ⚠️ limited | ✅ |

See the [Pricing](/en/pro) page for details on the Pro license.

## Can I continue using CineRename for free?

Yes. The free version has **no time limit**. You can use it indefinitely to rename or add subtitles to **up to 2 files per day**. Full and unlimited features require activating a Pro license.

## How does duplicate hunting work?

CineRename detects multiple copies of the same movie/episode based on:

- title + year (movies) or series + season + episode (series)
- resolution, codec, source, bitrate, audio, size to score the quality

It prompts you to keep the best version. No deletion without validation. See [Duplicates](/en/duplicates).

## Can CineRename work 100% offline?

Yes and no. The application itself (the interface, smart filename parsing via QuickJS, history, local duplicate cleaning) works perfectly without any internet connection.

However, the matching features (fetching the real official titles and episode numbers) require querying TheTVDB or TVmaze. Without internet, CineRename will clean the filename (removing release team tags, etc.) via its internal engine, but won't be able to guarantee the full official title. Downloading subtitles is, of course, impossible offline.

## What happens if TheTVDB / OpenSubtitles is down?

CineRename continues to function:
- **Renames already previewed** in the Studio can be validated (metadata is cached).
- **New files** display a warning in case of missing hits — you can still rename them manually.
- The **auto mode** logs the error and retries the failed files when the provider returns.

## I found a bug. How can I report it?

Write to [cinerename@gmail.com](mailto:cinerename@gmail.com). Include if possible:

- Your OS and CineRename version (`Help → About`)
- An example of a problematic filename
- The log (`Settings → Advanced → Open logs folder`)

## How can I contribute?

- **Report bugs** or request features by email
- **Suggest improvements** to naming presets
- **Translate the interface** into a new language
- **Buy a Pro license** directly supports development
