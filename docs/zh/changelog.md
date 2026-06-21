# 版本说明

本页面总结了 CineRename 的重要变更。要获取最新版本，请从主页面下载。

## v0.5.0 — 初始版本

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

- 🎬 **Studio** — 重命名功能，包含“修改前/修改后”预览
- 📝 通过 TheTVDB 和 TVmaze 识别电影 / 剧集 / 动漫
- ⏳ 具有一键撤销功能的**历史记录**
- 🛠️ Plex / Jellyfin / Emby / Kodi 命名预设
- 🌍 法语 / 英语 多语言界面
- 💻 初始 CLI 命令：`preview`, `rename`, `organize`
