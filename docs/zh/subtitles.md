# 字幕

CineRename 集成了一个专用模块，用于通过 [OpenSubtitles](https://www.opensubtitles.com/) **搜索、预览、下载和调整外部字幕**。

## 它的作用是什么
### 内置查看器

在下载之前，点击 **显示 (Show)** 按钮会打开一个内置的文本播放器。
您可以阅读台词、检查时间戳，并在把候选字幕保存到视频旁边之前用搜索栏查找关键词。

![字幕查看器](/assets/img/subtitle-visualizer.png)

## 命名选项

1. **视频哈希** — CineRename 会根据文件开头和结尾几兆字节的数据计算标准的 OpenSubtitles 指纹 (`OSDb hash`)。
2. **元数据回退** — 如果哈希没有找到合适候选，CineRename 会通过标题、原始标题、本地化标题、季/集以及可用 ID 搜索。
3. **预览和下载** — 下载前可以先检查候选字幕。
4. **兼容 Plex 的命名** — 在 `.mkv` 旁边生成类似 `Mon Film (2023).fr.srt` 的文件，这使得 Plex / Jellyfin 能够自动识别并将它们关联起来。

## 配置

在 **偏好设置 → 来源和字幕** 中：

- **首选语言** — `fr` (法语), `en` (英语), `es` (西班牙语), `zh` (中文), `ja` (日语)… (ISO 639-1 代码)
- **备用语言** — 如果找不到首选语言时的后备选择
- **听力障碍 (Hearing impaired)** — 是否包含 SDH (听障人士) 字幕
- **每个文件的限制** — 仅下载一个 `.srt` 或下载多个版本

## OpenSubtitles API 密钥

CineRename 默认内置了一个 API 密钥，足以满足日常使用需求。对于更大量的使用或获取专属配额：

1. 在 [OpenSubtitles](https://www.opensubtitles.com/) 创建一个帐户。
2. 获取您的个人 API 密钥。
3. 将其输入到 **偏好设置 → 来源和字幕 → OpenSubtitles** 中，或者通过环境变量 `CINERENAME_OPENSUBTITLES_API_KEY` 进行配置。

请参阅[提供商 API 密钥](/zh/providers)了解完整解析。

## 推荐工作流

1. 首先使用 **Studio** 重命名视频（官方标题 = 更高的 OpenSubtitles 匹配率）。
2. 在同一个文件夹上运行**字幕**模块。
3. 启动 Plex / Jellyfin → 所有字幕都已经有了规范的命名并会被正确识别。

## 内置字幕查看器

在字幕 Studio 中列出的每个本地字幕都会显示一个 **可视化 (Visualize)** 按钮。点击它会打开一个窗口，该窗口会：

- 在 Rust 端解析 `.srt` 或 `.vtt` 文件（UTF-8 + BOM，回退至 Latin-1）
- 剥离标记标签（如 `<i>`, `<b>`, `{\an8}`）以提供干净的显示
- 显示带有时间戳的台词（`HH:MM:SS.mmm → HH:MM:SS.mmm`）
- 允许按文本进行实时过滤（用于检查某句特定台词是否存在非常方便）
- 报告总时长和解析出的台词数量

在将字幕部署到整个媒体库之前，使用此功能来检查字幕是否不同步或被截断非常实用。

## 将本地字幕上传到 OpenSubtitles

如果您对某个字幕进行了重新翻译或重新同步，您可以直接将其分享给社区：

1. 在字幕 Studio 中，点击本地字幕旁边的 **发送 (Send)** 按钮
2. 填写 **语言代码** (ISO 639-1：如 `fr`, `en`, `zh`…)、**听障**标志、**Release (发布组)** 名称以及可能给审核员的评论
3. 确认 —— 应用程序将连接到 OpenSubtitles (使用 Bearer token 登录)，将文件编码为 base64 并通过 POST 请求发送至 `/api/v1/upload`

::: warning 需要 OpenSubtitles 帐户
上传操作需要在 **偏好设置 → 来源和字幕 → OpenSubtitles** 中配置 **API 密钥 + 用户帐户** (用户名 + 密码)。默认捆绑的 API 密钥是不够的 —— 需要一个已接受 OpenSubtitles 贡献者条款的帐户。
:::

当上传成功时，CineRename 会返回该字幕页面的公共 URL（可点击并在浏览器中打开）。

## 已知限制

- 无法自动区分**强制字幕 (forced subtitles)**。有时需要手动重命名为 `.forced.srt` 以供 Plex 使用。
- **不能保证完美同步**。哈希匹配通常是最好的信号，但某些 release 仍然需要其他候选、offset 或 drift 调整。
- **不太知名的动漫**有时在 OpenSubtitles 上很少或没有匹配项。CineRename 可以使用动漫元数据改进搜索，但无法生成不存在的字幕。
- 不会提取内嵌在 `.mkv` 中的**内封字幕**；CineRename 仅负责添加外部 `.srt` 文件。
