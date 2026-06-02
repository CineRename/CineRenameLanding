# API Providers

CineRename queries three external providers to function:

- **TheTVDB** — TV series metadata (official titles, seasons, episodes)
- **TVmaze** — TheTVDB supplement for TV series (open data, no key)
- **OpenSubtitles** — search and download subtitles

For the application to work out of the box, **API keys are bundled** within the binary (encrypted at build time via `src-tauri/build.rs`). You therefore don't need to configure anything to get started.

## Why provide your own key?

- **Higher quotas** — useful for processing very large volumes
- **Custom behaviors** — Premium OpenSubtitles key
- **CI / staging rotation** — teams testing in an isolated environment

## Resolution order

If multiple sources provide a key, CineRename uses the first one found according to this order:

1. **Runtime environment variable**
   - `CINERENAME_TVDB_API_KEY`
   - `CINERENAME_OPENSUBTITLES_API_KEY`
2. **Override entered in Settings → Providers** (persisted in SQLite)
3. **`providers.toml` file** (automatically generated in the local config folder)
4. **Default bundled key** (encrypted in the binary)

## Configure via the UI

**Settings → Providers**:

- TheTVDB: **API Key** field
- OpenSubtitles: **API Key** field + credentials (username/password) if you have a premium account

Values are encrypted in the local SQLite database (under your user profile). They never leave your machine.

## Configure via file

Create (or edit) `providers.toml` in the config folder:

| OS | Path |
| --- | --- |
| Windows | `%APPDATA%\CineRename\providers.toml` |
| macOS | `~/Library/Application Support/CineRename/providers.toml` |
| Linux | `~/.config/CineRename/providers.toml` |

Format:

```toml
[tvdb]
api_key = "your-tvdb-key"

[opensubtitles]
api_key = "your-opensubtitles-key"
username = "your-username"
password = "your-password"
```

## Custom build

To generate a CineRename binary with different keys (CI rotation, staging):

```bash
export CINERENAME_BUNDLED_TVDB_API_KEY="..."
export CINERENAME_BUNDLED_OPENSUBTITLES_API_KEY="..."
npm run dist
```



## Get your own keys

| Provider | How |
| --- | --- |
| **TheTVDB** | Create an account on [thetvdb.com](https://thetvdb.com/) → API → Subscriptions |
| **OpenSubtitles** | Create an account on [opensubtitles.com](https://www.opensubtitles.com/) → Consumers → New API consumer |
| **TVmaze** | No key required (public API, rate-limited to 20 req/s) |
