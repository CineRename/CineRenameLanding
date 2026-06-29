# Checksums

CineRename can calculate and verify cryptographic hashes of your files — useful for detecting disk corruption, validating a download, or ensuring the integrity of a library archive.

## Calculating Checksums

In the Studio, select one or more entries then click **Calculate checksums** (toolbar). The dialog offers four algorithms:

| Algorithm | Speed | Robustness | Typical Use |
| :--- | :--- | :--- | :--- |
| **CRC32** | ⚡⚡⚡ | Low | Basic error detection (legacy `.sfv` manifests) |
| **MD5** | ⚡⚡ | Medium | Compatibility with `md5sum`, older torrents |
| **SHA-1** | ⚡⚡ | Good | Compatible `sha1sum`, Git repositories |
| **SHA-256** | ⚡ | Excellent | Recommended choice for long-term archives |

Hashes are computed **in parallel** (rayon) and displayed in the list. Each row exposes a **Copy** button to retrieve the hash into the clipboard.

## Exporting a Manifest

Once the hashes are calculated, **Save manifest…** writes a sidecar file next to your media:

| Algorithm | Format | Compatible with |
| :--- | :--- | :--- |
| CRC32 | `.sfv` | `cksfv`, scene release tools, legacy media tools |
| MD5 | `.md5` | `md5sum -c` (Linux), HashCheck (Windows) |
| SHA-1 | `.sha1` | `sha1sum -c` |
| SHA-256 | `.sha256` | `sha256sum -c` |

The manifest stores paths **relative** to the folder where it is saved, making it portable.

## Verifying a Manifest

The **Verify a manifest…** button in the same dialog reads an existing manifest and compares the hashes to the current files:

1. Choose the manifest file (`.sfv`, `.md5`, `.sha1`, `.sha256`)
2. The algorithm is **automatically inferred** from the extension
3. CineRename hashes each referenced file and compares it to the stored hashes
4. Three possible statuses:
   - ✅ **OK** — hash matches
   - ❌ **Altered** — computed hash differs from the stored one (corruption, involuntary modification)
   - ⚠️ **Missing** — the referenced file no longer exists

The summary at the top of the dialog indicates `N matched / M mismatched / K missing`.

## Use Cases

- **Long-term archiving**: generate a SHA-256 manifest per season folder, then verify every 6 months to detect *bit rot*.
- **Post-download validation**: if your source provides a `.sfv` or an `.md5`, verify that no file was corrupted during transfer.
- **Library audit**: before moving to a new disk or NAS migration, snapshot the entire library in SHA-256 then re-verify on the new target.

## Performance

On a modern SSD, reading is the bottleneck — expect:

- ~500 MB/s for SHA-256 (single thread)
- ~1.5 GB/s for MD5
- ~2 GB/s for CRC32

CineRename uses `rayon` to hash multiple files **in parallel**, so a batch of 10 files will saturate the disk, not the CPU. On HDD, expect time proportional to the total size.
