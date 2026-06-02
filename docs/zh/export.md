# 数据导出

CineRename 不仅能重命名您的文件，还允许您以标准化格式导出有用的数据，以便为其他工具（电子表格、脚本、数据库）提供支持。

## 导出重命名报告

在 **Studio** 中，完成模拟或确认重命名后，您可以点击工具栏上的 **导出报告 (Export report)** 按钮。

生成的文件包含精确的修改历史，可选择以下格式：

- **CSV** (逗号分隔值)：非常适合在 Excel 或 Google Sheets 中打开。
- **JSON**：如果您想要编写自动化脚本来读取重命名结果，这是理想之选。

导出的每一行包含：
- 绝对原始路径 (`original_path`)
- 新文件名 (`new_filename`)
- 状态 (`renamed`, `ignored`, `conflict`)
- 检测到的元数据 (TheTVDB ID、分辨率、编解码器)

### JSON 报告示例

```json
[
  {
    "original_path": "/Users/kirito/Downloads/Breaking.Bad.S01E01.mkv",
    "new_filename": "Breaking Bad (2008) - S01E01 - Pilot.mkv",
    "status": "renamed",
    "metadata": {
      "tvdb_id": 81189,
      "resolution": "1080p",
      "video_codec": "x264"
    }
  }
]
```

## 导出剧集列表（时间表）

如果您在 CineRename 中加载了一部剧集，软件会从 TheTVDB 或 TVmaze 获取该剧集的完整结构（包括缺失的或尚未播出的剧集）。

您可以导出这个完整的列表来追踪您的观看进度或计划您的下载：

1. 点击侧面板中剧集名称旁边的 **剧集选项 (Series options)** 图标（三个小点）。
2. 点击 **导出剧集列表 (Export episodes list)**。
3. 选择格式：
   - `CSV`
   - `TSV` (制表符分隔值)
   - `JSON`

导出内容包括：
- 剧集标题
- 季数和集数
- 剧集标题（使用您首选的语言）
- 官方首播日期 (Air Date)
- 绝对标识符（对于动漫很有用）

::: tip 自动化
如果您使用 CLI (`cinerename`)，您可以使用 `--json` 标志强制以 JSON 格式输出，以在标准输出 (`stdout`) 上检索所有元数据，这相当于自动导出。
:::
