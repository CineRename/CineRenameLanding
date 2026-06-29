---
layout: home

hero:
  name: CineRename
  text: Documentation
  tagline: Rename and organize your movies, TV shows, and anime — entirely on your machine.
  image:
    src: /favicon.svg
    alt: CineRename
  actions:
    - theme: brand
      text: Quick Start
      link: /getting-started
    - theme: alt
      text: Download
      link: /download


features:
  - icon: 🎬
    title: Studio
    details: Bulk rename your movies, TV shows, and anime with a safe before/after preview. No files are touched until you confirm.
    link: /studio
  - icon: 📝
    title: Subtitles
    details: OpenSubtitles search, built-in SRT/VTT viewer, and local subtitle upload to the community.
    link: /subtitles
  - icon: 👯
    title: Duplicates
    details: Detect multi-quality copies (1080p, 4K, etc.). Get suggestions for the best version and delete directly via context menu.
    link: /duplicates
  - icon: ⏳
    title: History & Undo
    details: Every modification is tracked. Undo any renaming in one click, even days later.
    link: /history
  - icon: ⚡
    title: Auto Mode
    details: Complete pipeline — renaming, subtitles, moving to the final library. Compatible with Plex, Jellyfin, Emby.
    link: /auto-mode
  - icon: 👁️
    title: Watch Folders
    details: Point CineRename to your downloads folder — any new video is auto-imported into the Studio.
    link: /watch-folders
  - icon: 🔐
    title: Checksums
    details: CRC32 / MD5 / SHA-1 / SHA-256 calculation with sidecar manifest, and verification to detect bit rot.
    link: /checksums
  - icon: 📊
    title: Data Export
    details: Export your missing episode schedules or renaming reports in JSON and CSV.
    link: /export
  - icon: 🛠️
    title: JavaScript Templates
    details: Embedded QuickJS engine for advanced patterns — ternaries, regex, closures, and conditional cleanup rules.
    link: /templates
  - icon: 🖥️
    title: CLI & NAS Builds
    details: preview / rename / organize / auto commands + Linux x86_64 / aarch64 binaries for Synology, QNAP, and headless servers.
    link: /cli
---

## Why CineRename?

CineRename is a **100% local** desktop application designed to help you regain control over your video library. No uploads, no proprietary cloud, no transmitted video files — only requests to configured metadata and subtitle providers such as TheTVDB, TVmaze, AniList, Kitsu and OpenSubtitles.

Built with **Rust** (for disk performance and security) and **Svelte 5** (for a fluid UI even with thousands of files), CineRename runs natively on Windows, macOS, and Linux powered by Tauri v2.

## Where to start?

| If you want to… | Go to |
| --- | --- |
| Install the application | [Installation](/installation) |
| Rename your first folder | [Quick Start](/getting-started) |
| Understand the Studio | [Studio](/studio) |
| Continuously monitor a folder | [Watch Folders](/watch-folders) |
| Ensure file integrity | [Checksums](/checksums) |
| Write an advanced pattern in JavaScript | [Templates](/templates) |
| Automate NAS / Seedbox renaming | [CLI](/cli) |
| Connect to Plex or Jellyfin | [Plex / Jellyfin / Emby](/media-servers) |
