# Duplicates

The **Duplicates** module scans your library to spot multiple copies of the same movie or episode, and helps you free up space by keeping only the best version.

## How it works

1. You point to a folder (or several).
2. CineRename indexes all video files, calculates a quality score, and groups them by media identity (title + year for movies, series + season + episode for series).
3. The result is displayed by **clusters**: one cluster = multiple files pointing to the same content.

![Duplicates clusters preview](/assets/img/duplicates-clusters.png)

## The quality score

Each file receives a score based on:

- **Resolution** — 4K > 1440p > 1080p > 720p > 480p
- **Codec** — HEVC/AV1 (efficiency) with penalty for older codecs
- **Source** — BluRay > WEBRip > HDTV > DVDRip
- **Bitrate** — bonus for high bitrates at equal resolution
- **Audio** — DTS-HD MA / TrueHD > DTS / DD+ > AC3 / AAC
- **Size** — to break ties at equal technical quality

The file with the highest score is marked **Keep**, the others **Candidates for deletion**.

::: tip No automatic deletion
No file is ever deleted without your explicit consent. The module only **proposes**.
:::

## Context menu

On each row of the cluster, **right-click** opens:

- **Open location** — Native Finder / Explorer / Files manager
- **Play video** — launches your default player
- **Force keep** — marks this file as "to keep" (overrides scoring)
- **Force delete** — marks for deletion
- **Exclude from cluster** — if CineRename incorrectly grouped it

## Batch deletion

Once your decisions are made on all clusters, the **Delete marked** button:

1. Asks for a final confirmation
2. Moves the files to the system trash (recoverable)
3. Logs the operation in the **History** (to undo)

::: warning Attention for NAS users
Deletion goes through the OS trash. If the **Network Trash (SMB/CIFS)** is not enabled on your Synology or QNAP, files will be permanently deleted. Make sure to enable the "Enable Trash" option on your NAS shared folder before using batch deletion.
:::

## Best practices

- **Always rename first** — otherwise CineRename struggles to match `MovieX.1080p.x264-GROUP.mkv` with `MovieX.4k.HDR.mkv` because the names don't look alike.
- **Run a dry-run** first — explore the clusters, tweak the overrides, and only then delete.
- **Check multiple editions** — for movies, "Director's Cut", "Extended", "Theatrical" are **not** considered duplicates if explicitly named.

## Known limitations

- For **multi-discs** (a movie split into `Movie - cd1.mkv` + `Movie - cd2.mkv`), CineRename groups them correctly only if the `cd1`/`cd2` or `part1`/`part2` convention is respected.
- For **mixed archives** (zips containing multiple versions), you must first extract or use the Studio to normalize them.
