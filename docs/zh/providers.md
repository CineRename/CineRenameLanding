# 提供商 API 密钥

CineRename 依靠三个外部提供商来运行：

- **TheTVDB** — 剧集元数据（官方标题、季数、集数）
- **TVmaze** — TheTVDB 剧集的补充数据（开放数据，无需密钥）
- **OpenSubtitles** — 搜索和下载字幕

为了让应用程序安装后即可开箱即用，二进制文件中**捆绑了 API 密钥**（在构建期间通过 `src-tauri/build.rs` 加密）。因此，您无需配置任何内容即可开始使用。

## 为什么要提供自己的密钥？

- **更高的配额** — 处理非常大体量文件时很有用
- **自定义行为** — OpenSubtitles 高级 (Premium) 密钥
- **CI / Staging 轮换** — 在隔离环境中测试的团队

## 密钥解析顺序

如果多个来源提供了密钥，CineRename 会按以下顺序使用找到的第一个密钥：

1. **运行时环境变量**
   - `CINERENAME_TVDB_API_KEY`
   - `CINERENAME_OPENSUBTITLES_API_KEY`
2. **在“设置 → Providers”中输入的覆盖值**（持久化保存在 SQLite 中）
3. **`providers.toml` 文件**（在本地配置文件夹中自动生成）
4. **默认捆绑的密钥**（在二进制文件中加密）

## 通过 UI 配置

**设置 → Providers**：

- TheTVDB：**API Key** 字段
- OpenSubtitles：**API Key** 字段 + 凭据 (username/password)，如果您有高级帐户

这些值会加密存储在本地 SQLite 数据库中（在您的用户配置文件下）。它们永远不会离开您的机器。

## 通过文件配置

在配置文件夹中创建（或编辑）`providers.toml` 文件：

| 操作系统 | 路径 |
| --- | --- |
| Windows | `%APPDATA%\CineRename\providers.toml` |
| macOS | `~/Library/Application Support/CineRename/providers.toml` |
| Linux | `~/.config/CineRename/providers.toml` |

格式：

```toml
[tvdb]
api_key = "您的-tvdb-密钥"

[opensubtitles]
api_key = "您的-opensubtitles-密钥"
username = "您的-用户名"
password = "您的-密码"
```

## 自定义构建

若要生成带有不同密钥的 CineRename 二进制文件（用于 CI 轮换、Staging 环境）：

```bash
export CINERENAME_BUNDLED_TVDB_API_KEY="..."
export CINERENAME_BUNDLED_OPENSUBTITLES_API_KEY="..."
npm run dist
```

## 获取您自己的密钥

| 提供商 | 操作方法 |
| --- | --- |
| **TheTVDB** | 在 [thetvdb.com](https://thetvdb.com/) 创建一个帐户 → API → Subscriptions |
| **OpenSubtitles** | 在 [opensubtitles.com](https://www.opensubtitles.com/) 创建一个帐户 → Consumers → New API consumer |
| **TVmaze** | 无需密钥（公共 API，限制速率为 20 req/s） |
