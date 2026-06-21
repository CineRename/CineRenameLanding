# History & Undo

Everything that CineRename modifies on your disk is **traceable** and **reversible**. The **History** tab is your time machine.

## What is recorded

For each operation (renaming, moving, duplicate deletion, subtitle download), CineRename records:

- Precise **date and time**
- **Type of operation** (rename / move / subtitle-fetch / duplicate-delete / auto-pipeline)
- Full **Before / After** (source paths, target paths, size, optional hash)
- **Status** (success / failure / canceled)
- **Source** (Studio / Auto mode / CLI)

Data is stored locally in an **SQLite** database (via `rusqlite` on the Rust side). No data is sent to the cloud.

## History tabs

- **Today** — today's operations
- **Recent** — last 7 days
- **All** — full history (filterable by date, folder, type)

## Undo

Select an operation and click **Undo**. CineRename:

1. Verifies that the files still exist at their destination
2. Asks for confirmation
3. Restores the original names / locations
4. Marks the operation as canceled in the history (with a new "undo" record)

::: tip Chained undo
You can undo several days of successive modifications — the history goes back to the beginning of your installation.
:::

## Limitations of undo

Undo may fail if:

- Files have been **manually deleted** in the meantime (not in the trash).
- You have **manually renamed** a file after CineRename processed it — the undo doesn't know it's the same file.
- The **source disk** is no longer mounted (unplugged NAS, removed USB drive).

In these cases, CineRename reports the failure and keeps the original record for reference.

## Multiple selection

`Ctrl + click` (or `Cmd + click`) to select multiple operations, then **Undo selection**. Undos are performed in reverse order (LIFO) to respect dependencies between operations.

You can also press `Ctrl+A` (or `Cmd+A` on macOS) outside the search field to select or clear all restorable batches.

## Purge

To free up the SQLite database, **Settings → Advanced → Purge history** allows you to delete records prior to a given date.

::: warning
Once purged, records are no longer recoverable and undo is no longer possible for these operations.
:::
