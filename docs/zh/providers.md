# API 提供商与密钥

CineRename 会根据你使用的功能查询不同的外部提供商：

- **TheTVDB** — 电影、剧集、季、集、本地化标题、海报和可用的图片
- **TVmaze** — TheTVDB 剧集的补充数据（开放数据，无需密钥）
- **AniList** — 动漫搜索和可用时的绝对集数支持
- **Kitsu** — 动漫搜索备用来源
- **Jikan** — 基于 MyAnimeList 的公开动漫搜索和单集标题，无需密钥或账号
- **AniDB** — 多语言动漫标题和单集元数据；已实现，但默认停用
- **OpenSubtitles** — 搜索和下载字幕

## 动漫元数据与语言回退

[Jikan](https://docs.api.jikan.moe/) 无需个人 API 密钥或账号。它提供动漫的不同标题，以及可用的英语、日语或罗马字单集标题。不保证提供法语、中文或其他语言的翻译。CineRename 会在缺少所需翻译时保留可用的回退标题，不会编造翻译，也不会根据单个条目的集数推断全局季度对应关系。公开 API 的技术访问权限本身并不代表获准将上游 MyAnimeList 数据用于商业用途。

**AniDB 默认保持停用。** 其[政策](https://anidb.net/policy)禁止付费／免费增值应用使用，除非获得例外许可。只有取得所需许可后，才能在 CineRename 中启用。搜索公开标题文件不需要密钥；获取单集信息需要**已注册的应用名称和版本**，而非用户密码。这些客户端标识是公开的。在偏好设置中填写标识不会启用提供商：获得许可后，还需要在 `providers.toml` 中设置 `[anidb] enabled = true`。CineRename 不会索取或发送 AniDB 账号密码。

为了让应用安装后即可使用，CineRename 可以在构建时包含提供商密钥。普通使用无需配置；如果你处理很大的库或需要独立配额，也可以使用自己的密钥。

## 为什么要提供自己的密钥？

- **独立配额** — 高频使用 TheTVDB 或 OpenSubtitles 时很有用
- **账号功能** — 上传到 OpenSubtitles 需要你自己的 API 密钥和账号凭据
- **CI / Staging 轮换** — 在隔离环境中测试的团队

## 密钥解析顺序

如果多个来源提供了密钥，CineRename 会按以下顺序使用找到的第一个密钥：

1. **运行时环境变量**
   - `CINERENAME_TVDB_API_KEY`
   - `CINERENAME_TVDB_SUBSCRIBER_PIN`
   - `CINERENAME_OPENSUBTITLES_API_KEY`
   - `CINERENAME_OPENSUBTITLES_USERNAME`
   - `CINERENAME_OPENSUBTITLES_PASSWORD`
   - `CINERENAME_OPENSUBTITLES_USER_AGENT`
   - `CINERENAME_ANIDB_CLIENT_NAME`
   - `CINERENAME_ANIDB_CLIENT_VERSION`
2. **在“偏好设置 → 来源和字幕”中输入的值**（敏感内容会尽量保存在系统凭据库/钥匙串中）
3. **配置子目录中的 `providers/providers.toml` 文件**
4. **应用内置的默认密钥**

## 通过 UI 配置

**偏好设置 → 来源和字幕**：

- TheTVDB：**API Key** 字段与可选的 **Subscriber PIN**
- OpenSubtitles：**API Key** 字段 + 凭据 (username/password)，如果您有高级帐户
- AniDB：**已注册的客户端名称**和**客户端版本**，仅用于获准的集成；还需要在 `providers.toml` 中启用

敏感值会尽量保存在系统凭据库/钥匙串中，而不是以明文写入本地 SQLite。它们不会离开你的机器，除非发送给对应的提供商进行认证或查询。

## 通过文件配置

在配置目录的 `providers/` 子文件夹中创建（或编辑）`providers.toml` 文件：

| 操作系统 / 模式 | 路径 |
| --- | --- |
| Windows (桌面版) | `%APPDATA%\com.cinerename.desktop\providers\providers.toml` |
| macOS (桌面版) | `~/Library/Application Support/com.cinerename.desktop/providers/providers.toml` |
| Linux (桌面版) | `~/.local/share/com.cinerename.desktop/providers/providers.toml` |
| Headless / NAS (Linux) | `~/.config/cinerename/providers/providers.toml` |

格式：

```toml
[thetvdb]
enabled = true
api_key = "您的-tvdb-密钥"
subscriber_pin = "您的-tvdb-订阅者pin"

[opensubtitles]
enabled = true
api_key = "您的-opensubtitles-密钥"
username = "您的-用户名"
password = "您的-密码"
user_agent = "CineRename"

[jikan]
enabled = true

[anidb]
# 获得所需许可前，AniDB 保持停用。
enabled = false
client_name = ""
client_version = 1
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
| **AniList** | CineRename 使用的公开功能无需密钥 |
| **Kitsu** | CineRename 使用的公开功能无需密钥 |
| **Jikan** | CineRename 使用的公开只读接口无需密钥或账号；仍须遵守上游数据条款 |
| **AniDB** | 默认停用；此付费／免费增值应用需要许可。单集查询使用已注册客户端的公开名称和版本，不使用密码 |
