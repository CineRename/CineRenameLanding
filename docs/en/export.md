# Data Export

CineRename doesn't just rename your files, it also allows you to export useful data in standardized formats to feed other tools (spreadsheets, scripts, databases).

## Export the renaming report

In the **Studio**, once you have simulated or validated a renaming, you can click the **Export report** button located in the toolbar.

The generated file contains the exact history of modifications, formatted as chosen:

- **CSV** (Comma-Separated Values): Perfect for opening in Excel or Google Sheets.
- **JSON**: Ideal if you want to automate a script that reads the renaming result.

Each line of the export contains:
- The absolute original path (`original_path`)
- The new filename (`new_filename`)
- The status (`renamed`, `ignored`, `conflict`)
- Detected metadata (TheTVDB ID, resolution, codec)

### JSON report example

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

## Export an episode list (Schedule)

If you have loaded a series into CineRename, the software has retrieved the complete structure of the series from TheTVDB or TVmaze (including missing or unaired episodes).

You can export this complete list to track your watch history or plan your downloads:

1. Click on the **Series options** icon (the three little dots) next to the series name in the side panel.
2. Click on **Export episode list**.
3. Choose the format:
   - `CSV`
   - `TSV` (Tab-Separated Values)
   - `JSON`

The export includes:
- The series title
- The season and episode number
- The episode title (in your preferred language)
- The official air date (Air Date)
- The absolute identifier (useful for animes)

::: tip Automation
If you use the CLI (`cinerename`), you can force a JSON output with the `--json` flag to retrieve all metadata on standard output (`stdout`), which is equivalent to an automated export.
:::
