---
layout: home

hero:
  name: CineRename
  text: Documentation
  tagline: 重命名并组织您的电影、剧集和动漫 — 完全在您的本地机器上完成。
  image:
    src: /favicon.svg
    alt: CineRename
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/getting-started
    - theme: alt
      text: 下载
      link: /zh/download


features:
  - icon: 🎬
    title: Studio
    details: 批量重命名您的电影、剧集和动漫，提供安全的“修改前/修改后”预览。在您确认之前，不会修改任何文件。
    link: /zh/studio
  - icon: 📝
    title: 字幕
    details: OpenSubtitles 搜索，内置 SRT/VTT 查看器，并支持将本地字幕上传至社区。
    link: /zh/subtitles
  - icon: 👯
    title: 重复项
    details: 检测多画质副本（1080p, 4K 等）。建议保留最佳版本，可通过右键菜单直接删除。
    link: /zh/duplicates
  - icon: ⏳
    title: 历史记录与撤销
    details: 追踪每一项修改。一键撤销任何重命名操作，即使过了好几天也能恢复。
    link: /zh/history
  - icon: ⚡
    title: 自动化流水线
    details: 完整工作流 — 重命名、字幕、移动到最终媒体库。兼容 Plex、Jellyfin 和 Emby。
    link: /zh/auto-mode
  - icon: 👁️
    title: 监控文件夹
    details: 让 CineRename 指向您的下载文件夹 — 任何新视频都会自动导入到 Studio 中。
    link: /zh/watch-folders
  - icon: 🔐
    title: Checksums
    details: 使用 sidecar 清单计算 CRC32 / MD5 / SHA-1 / SHA-256，并进行验证以检测位元衰减 (bit rot)。
    link: /zh/checksums
  - icon: 📊
    title: 数据导出
    details: 将缺失剧集的时间表或重命名报告导出为 JSON 和 CSV 格式。
    link: /zh/export
  - icon: 🛠️
    title: JavaScript 模板
    details: 内置 QuickJS 引擎，支持高级模式 — 三元运算符、正则表达式、闭包和条件清理规则。
    link: /zh/templates
  - icon: 🖥️
    title: CLI 与 NAS 构建
    details: 提供 preview / rename / organize / auto 等命令，以及适用于 Synology、QNAP 和无头服务器的 Linux x86_64 / aarch64 二进制文件。
    link: /zh/cli
---

## 为什么选择 CineRename？

CineRename 是一款 **100% 本地化**的桌面应用程序，可让您重新掌控您的视频库。不会上传视频文件，也没有专有云服务 — 只会向已配置的元数据和字幕提供商发出请求，例如 TheTVDB、TVmaze、AniList、Kitsu 和 OpenSubtitles。

使用 **Rust**（为了磁盘性能和安全性）和 **Svelte 5**（为了即使有数千个文件也能保持流畅的 UI）构建，CineRename 借助于 Tauri v2，可原生运行在 Windows、macOS 和 Linux 上。

## 从哪里开始？

| 如果您想… | 请前往 |
| --- | --- |
| 安装应用程序 | [安装](/zh/installation) |
| 重命名第一个文件夹 | [快速开始](/zh/getting-started) |
| 了解 Studio | [Studio](/zh/studio) |
| 持续监控文件夹 | [监控文件夹](/zh/watch-folders) |
| 确保文件完整性 | [Checksums](/zh/checksums) |
| 用 JavaScript 编写高级模式 | [模板](/zh/templates) |
| 在 NAS / Seedbox 上自动重命名 | [CLI](/zh/cli) |
| 连接 Plex 或 Jellyfin | [Plex / Jellyfin / Emby](/zh/media-servers) |
