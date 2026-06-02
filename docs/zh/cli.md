# 命令行 (CLI)

CineRename 提供了一个原生的 CLI，非常适合用于编写 NAS、Seedbox 或 Plex 服务器工作流的脚本。

## 安装

在 **Windows / macOS / Linux** 上，CLI 与主应用程序一起提供。它可以通过 `cinerename` 命令调用（在安装过程中已添加到 PATH）。

### NAS 构建（Synology / QNAP / 无头 Linux）

我们为 NAS 服务器生成了两个 Linux 压缩包（tarballs）：

| 架构 | 工件 | Triple |
| :--- | :--- | :--- |
| Intel / AMD 64-bit | `cinerename-linux-x86_64` | `x86_64-unknown-linux-gnu` |
| ARM 64-bit | `cinerename-linux-aarch64` | `aarch64-unknown-linux-gnu` (cross) |

下载与您的 NAS 对应的压缩包，将其提取到 `/volume1/@appstore/cinerename/`，并使用下面的标志调用该二进制文件。对于 NAS 上的持续监控，请优先在 CLI 上使用 **cron**，而不是需要 GUI 的“监控文件夹”功能。

对于有关 NAS 安装的任何问题，请联系支持人员。

### 检查版本

```bash
cinerename --version
```

### 帮助

```bash
cinerename --help
cinerename rename --help
```

## 主要命令

| 命令 | 操作 |
| --- | --- |
| `cinerename preview <路径>` | 显示“修改前/修改后”渲染，不修改任何内容 |
| `cinerename rename <路径>` | 就地重命名 |
| `cinerename organize <路径> --to <媒体库>` | 重命名 + 移动到媒体库 |
| `cinerename auto <路径> --to <媒体库>` | 完整流水线：重命名 + 字幕 + 移动 |
| `cinerename subs <路径>` | 为文件夹中的文件下载字幕 |
| `cinerename duplicates <路径>` | 显示 / 清理重复项 |
| `cinerename history` | 列出最近的操作及其 ID |
| `cinerename undo <id>` | 撤销历史记录中的某项操作 |

### 示例

```bash
# 预览重命名而不修改任何内容
cinerename preview /path/to/video.mkv

# 就地重命名整个文件夹
cinerename rename /path/to/folder

# 重命名并移动到 Plex/Jellyfin 媒体库
cinerename organize /path/to/downloads --to /Plex/Series

# 完整流水线：重命名 + 法语字幕 + 移动
cinerename auto /path/to/downloads --to /Plex/Series --subs fr

# 仅下载字幕
cinerename subs /Plex/Series --lang fr,en

# 列出重复项而不删除它们
cinerename duplicates /Plex --dry-run

# 查找最近操作的 ID 以撤销它
cinerename history --limit 5
cinerename undo 12345
```

## 实用标志

| 标志 | 描述 |
| --- | --- |
| `--dry-run` | 模拟一切，不写入任何内容 |
| `--preset <名称>` | 强制使用预设（`plex`, `jellyfin`, `emby`, `kodi`, `custom`） |
| `--subs <代码,代码>` | 字幕语言（以 `,` 分隔） |
| `--on-conflict <skip|overwrite|both>` | 冲突发生时的策略 |
| `--quiet` | 极简输出（在脚本中很有用） |
| `--verbose` | 调试用的详细输出 |
| `--json` | 机器可读的输出 |

## 退出代码

- `0` — 成功
- `1` — 一般错误
- `2` — 参数无效 / 未知预设
- `3` — 未解决的冲突（可通过 `--on-conflict` 处理）
- `4` — 文件访问被拒绝 / 锁定
- `5` — 外部提供商无法连接（TheTVDB / OpenSubtitles 宕机）

对于链式调用很有用：`cinerename auto ... && notify-send "Pipeline OK"`。

## Sonarr / Radarr 集成

在 **Sonarr → Settings → Connect → Custom Scripts** 中：

```bash
#!/usr/bin/env bash
set -e
[ "$sonarr_eventtype" = "Download" ] || exit 0
cinerename auto "$sonarr_episodefile_path" --to /Plex/Series --subs fr --quiet
```

您可以根据 `$radarr_moviefile_path` 适配 Radarr。

## Seedbox / NAS 集成

每 5 分钟处理一次到达文件夹的 cron 示例：

```txt
*/5 * * * * /usr/local/bin/cinerename auto /mnt/incoming --to /mnt/Plex --subs fr --quiet --on-conflict both
```

## 环境变量

| 变量 | 效果 |
| --- | --- |
| `CINERENAME_TVDB_API_KEY` | 自定义 TheTVDB API 密钥 |
| `CINERENAME_OPENSUBTITLES_API_KEY` | 自定义 OpenSubtitles API 密钥 |
| `CINERENAME_CONFIG_DIR` | 覆盖配置文件夹路径 |
| `CINERENAME_LOG_LEVEL` | `error` / `warn` / `info` / `debug` / `trace` |

请参阅[提供商 API 密钥](/zh/providers)了解完整解析。
