---
description: "History and Undo in CineRename: 1-click full rollback of renaming batches, detailed transaction logs and accidental rename protection."
---

# History & Undo

The **History** tab records rename batches and shows whether they can be undone.

## What is recorded

Batches from the Studio, CLI and automation pipeline include their dates, status,
original and resulting paths, operation details and undo availability. History
is stored in the local SQLite database and is not automatically synchronized
between devices.

## Undo a batch

Open a completed batch and check whether **Undo** is available. After you confirm,
CineRename checks that the current files match the recorded files and that the
original destinations can be restored.

- Rename and move operations restore the original names and locations.
- Copy and link operations remove the created destination while preserving the original source.
- A successful undo marks the existing batch as `undone` and keeps its record.

Separate subtitle downloads, subtitle timing edits and duplicate deletions are
independent actions; they are not automatically reversible through rename history.

## When undo is unavailable

A failed or unfinished batch is not automatically undoable. Undo can also be
blocked by missing or modified files, an occupied original path, an unmounted
volume or an interrupted operation that still requires recovery. History shows
the reason and keeps the record for inspection.

For successive changes to the same files, undo the newest batches first. Multiple
selection processes batches successively. Use **Ctrl/Cmd + click** to select batches
and **Ctrl/Cmd+A** outside the search field to select restorable batches.

## Browse and preserve history

History supports date grouping, search, status filters and chronological sorting.
Keep the local database to preserve older records and undo information. Removing
CineRename's local data also removes that history. Use the Support screen to copy
diagnostics before resetting an installation when needed.
