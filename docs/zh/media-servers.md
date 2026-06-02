# Plex / Jellyfin / Emby / Kodi

CineRename 生成的目录树可直接与主流媒体服务器兼容。本页面总结了各个服务器的命名约定和最佳实践。

## 命名约定

CineRename 遵循官方约定：

- [Plex 电影命名规范](https://support.plex.tv/articles/naming-and-organizing-your-movie-media-files/)
- [Plex 剧集命名规范](https://support.plex.tv/articles/naming-and-organizing-your-tv-show-files/)
- [Jellyfin 电影/剧集命名规范](https://jellyfin.org/docs/general/server/media/movies/)
- [Emby 命名指南](https://emby.media/support/articles/Movie-Naming.html)

这三个服务器在很大程度上共享相同的约定。因此，`plex`、`jellyfin` 和 `emby` 的预设很接近，但并不完全相同（在特别篇 (Specials)、多集文件、加长版等方面存在细微差别）。

## 电影

```
Films/
├── Mon Film (2023)/
│   ├── Mon Film (2023).mkv
│   ├── Mon Film (2023).fr.srt
│   └── Mon Film (2023).en.srt
└── Autre Film (2024) {edition-Director's Cut}/
    └── Autre Film (2024) {edition-Director's Cut}.mkv
```
**注意**：
- 括号中的年份对于匹配至关重要。
- 多重版本使用 `{edition-...}`（Plex/Jellyfin/Emby 都能识别）。
- 视频文件旁边的 `.lang.srt` 字幕会被自动附加。

## 剧集 (TV Shows)

```
Séries/
├── Ma Série (2020)/
│   ├── Season 01/
│   │   ├── Ma Série (2020) - S01E01 - Pilote.mkv
│   │   ├── Ma Série (2020) - S01E01 - Pilote.fr.srt
│   │   └── Ma Série (2020) - S01E02 - Episode 2.mkv
│   └── Season 02/
│       └── ...
```

**注意**：
- `S01E01` 格式是最通用的。
- `-` 后面的剧集标题是可选的，但有助于显示。
- Plex 要求使用 `Season 01` 文件夹（英文，且数字前补零）。

## 动漫

CineRename 默认将动漫视为电视连续剧处理。特殊情况：

- **绝对编号**（从 1 到 N 的剧集，没有季数）→ CineRename 可以根据您的预设将其转换为 `S01E01..S01EN`。
- **纯动漫服务器**，如带有 AniDB 插件的 Stash 或 Jellyfin → 提供了一个特定的 `anidb` 预设（日语标题，AniDB IDs）。

## 配置 Plex

1. 在 Plex 中，创建两个独立的库：**电影 (Movies)** 和 **剧集 (TV Shows)**。
2. 将它们指向您用作目标的文件夹（例如通过 `organize --to` 命令指定的文件夹）。
3. 激活 **Plex Movie / Plex TV Series** 代理（其他代理不支持 `{edition-...}`）。
4. 运行扫描。

::: tip 如果 Plex 无法识别您的文件
请检查：
1. 标题 + 年份是否与 TheTVDB / TMDB 匹配。
2. 文件夹结构是否正确（每部电影一个文件夹，剧集则需要 `Season XX` 子文件夹）。
3. 是否删除了奇怪的字符（例如 `:` 会自动被替换为 `-`）。
:::

## 配置 Jellyfin

与 Plex 相同，但有一些细微差别：

- Jellyfin 默认使用 **TheTVDB**（而不是 TMDB）进行刮削 —— 这很方便，因为 CineRename 也使用 TheTVDB。
- 实时扫描可以通过 `Library → Real-time monitoring` 启用。

## 配置 Emby

与 Jellyfin 相同（Emby 和 Jellyfin 都是同一个历史代码的分支）。

## 配置 Kodi

1. 在 Kodi 中，转到 **Videos > Files** (视频 > 文件) 部分。
2. 添加您的电影或剧集的源文件夹。
3. 配置刮削器（信息提供者）时：
   - 对于 **电影**：选择 *The Movie Database Python*，或者如果您使用 NFO 文件，则选择 *Local information only*。
   - 对于 **剧集**：选择 *TheTVDB*（推荐，因为 CineRename 默认使用 TVDB 标识符）。
4. 对于电影，如果您使用 CineRename 的默认预设（每个文件夹一部电影），请确保启用 **"Movies are in separate folders that match the movie title" (电影在匹配电影标题的单独文件夹中)** 选项。
5. 确认并更新媒体库。

## 如果识别失败怎么办？

1. 在 **Studio** 中重命名，而不是静默地使用 CLI —— 您将能够看到不确定的匹配项。
2. 如果有疑问（标题与其他电影相似），请强制使用不同的匹配项。
3. 在文件夹名称中显式添加 **TVDB / TMDB ID**：
   - Plex：`Mon Film (2023) {tmdb-12345}` 或 `{tvdb-12345}`
   - Jellyfin：`Mon Film (2023) [tmdbid-12345]` 或 `[tvdbid-12345]`
   *(注意：CineRename 为其内部引擎查询 TheTVDB/TVmaze，但它会保留并传递您手动输入的如 `{tmdb-...}` 这类的标签，以强制 Plex/Jellyfin 端进行匹配)。*
4. 如果问题仍然存在，请执行 Plex Dance（将文件移出媒体库，扫描，放回文件，再次扫描）。
