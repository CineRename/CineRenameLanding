# 版本说明

本页面总结了 CineRename 的重要变更。要获取最新版本，请从主页面下载。

## 进行中 — `v0.2`

::: tip 这些功能已在主分支 (main) 中提供。一旦 E2E（端到端）测试全部通过，将会发布正式版本。
:::

### 核心新功能（看齐 FileBot）

- 👁️ **字幕查看器** — 显示 SRT / VTT，按时间轴提示，文本搜索，集成到字幕 Studio 中
- ☁️ **上传 OpenSubtitles** — 从应用程序直接发布本地字幕（需要测试员帐户，请参阅[字幕](/zh/subtitles)）
- 💿 **光盘提取线性配对 (Disc-rip linear pair)** — 自动将 `VOB` / `M2TS` / `BDMV` 与剧集进行配对
- 🔐 **Checksums 清单验证** — 读取 `.sfv` / `.md5` / `.sha1` / `.sha256` 并标记被篡改/缺失的文件
- 📅 **剧集列表导出** — 将剧集的完整时间表导出为 CSV / TSV / JSON
- 👁️ **监控文件夹** — 当新文件到达某个文件夹时自动导入
- 🛠️ **JavaScript 模板** — 内置 QuickJS 引擎，支持高级模式（三元运算符、正则表达式、闭包 — 等同于 FileBot 的 Groovy）
- 🗄️ **NAS 构建** — 提供 `linux-x86_64` 和 `linux-aarch64` 版本（适用于 Synology / QNAP）

### 分支早期的改进

- ✅ OpenSubtitles **字幕**模块
- ✅ 多画质**重复项**模块
- ✅ 完整流水线的**自动**模式
- ✅ 重复项上的原生右键菜单：打开位置、播放视频、强制删除
- ✅ Svelte 5 列表虚拟化（针对大容量文件的性能优化）
- ✅ 带有翻译代码的错误重构
- ✅ 提取出 `PreviewEntryRow` 和 `HistoryEntryRow` 组件
- ✅ 开箱即用的 **Plex / Kodi / Jellyfin / Emby** 预设
- ✅ 针对噪声大文件的**投机 (opportunistic)** 匹配模式
- ✅ 文件操作：**Move (移动) / Copy (复制) / Hardlink (硬链接) / Symlink (符号链接)**
- ✅ **FileBot 格式**导入器（token-to-token 转换器）
- ✅ Checksums：**CRC32 / MD5 / SHA-1 / SHA-256** 支持 sidecar 清单

## v0.1.0 — 首个 Beta 版

- 🎬 **Studio** — 重命名功能，包含“修改前/修改后”预览
- 📝 通过 TheTVDB 和 TVmaze 识别电影 / 剧集 / 动漫
- ⏳ 具有一键撤销功能的**历史记录**
- 🛠️ Plex / Jellyfin / Emby / Kodi 命名预设
- 🌍 法语 / 英语 多语言界面
- 💻 初始 CLI 命令：`preview`, `rename`, `organize`

## 未来路线图

| 版本 | 计划内容 |
| --- | --- |
| **v0.3** | 设备间命名规则的云端同步 |
| **v0.4** | 原生 Plex / Jellyfin 连接器（重命名后触发重新扫描） |
| **v0.5** | 自动更新和增量更新 |
| **后续** | 检测多重版本（导演剪辑版、加长版），支持 AniDB 的动漫数据库 |

## 版本控制约定

CineRename 遵循 [SemVer](https://semver.org/) 规范：

- **Major**（主版本号 `x.0.0`）— 与早期版本不兼容的重大变更
- **Minor**（次版本号 `0.x.0`）— 向后兼容的新功能
- **Patch**（补丁版本号 `0.0.x`）— 仅包含错误修复

只要版本处于 `0.x.x`，API（CLI 命令、SQLite 数据库格式）就可能会演变。从 `1.0.0` 开始，将会保证稳定性。

## SQLite 数据库历史记录

每次进行内部数据库迁移时，CineRename 都会在启动时自动执行迁移。无需手动干预 — 您的操作历史记录将在各个版本之间保留。

::: warning 降级警告
不保证在启动较新版本后能够恢复到早期版本：数据库可能处于未来的模式，而旧版本无法识别。降级之前，请先备份 `~/Library/Application Support/CineRename/cinerename.sqlite`。
:::
