# Clés API providers

CineRename consulte trois providers externes pour fonctionner :

- **TheTVDB** — métadonnées de séries TV (titres officiels, saisons, épisodes)
- **TVmaze** — complément de TheTVDB pour les séries TV (open data, sans clé)
- **OpenSubtitles** — recherche et téléchargement des sous-titres

Pour que l'application fonctionne dès l'installation, des **clés API sont bundlées** dans le binaire (chiffrées au build via `src-tauri/build.rs`). Vous n'avez donc rien à configurer pour démarrer.

## Pourquoi fournir sa propre clé ?

- **Quotas plus élevés** — utile pour traiter de très gros volumes
- **Comportements personnalisés** — clé Premium OpenSubtitles
- **Rotation CI / staging** — équipes qui testent sur un environnement isolé

## Ordre de résolution

Si plusieurs sources fournissent une clé, CineRename utilise la première trouvée selon cet ordre :

1. **Variable d'environnement runtime**
   - `CINERENAME_TVDB_API_KEY`
   - `CINERENAME_OPENSUBTITLES_API_KEY`
2. **Override saisi dans Réglages → Providers** (persisté en SQLite)
3. **Fichier `providers.toml`** (généré automatiquement dans le dossier de config local)
4. **Clé bundlée par défaut** (chiffrée dans le binaire)

## Configurer via l'UI

**Réglages → Providers** :

- TheTVDB : champ **API Key**
- OpenSubtitles : champ **API Key** + identifiants (username/password) si vous avez un compte premium

Les valeurs sont chiffrées dans la base SQLite locale (sous votre profil utilisateur). Elles ne quittent jamais votre machine.

## Configurer via fichier

Créez (ou éditez) `providers.toml` dans le dossier de config :

| OS | Chemin |
| --- | --- |
| Windows | `%APPDATA%\CineRename\providers.toml` |
| macOS | `~/Library/Application Support/CineRename/providers.toml` |
| Linux | `~/.config/CineRename/providers.toml` |

Format :

```toml
[tvdb]
api_key = "votre-clé-tvdb"

[opensubtitles]
api_key = "votre-clé-opensubtitles"
username = "votre-username"
password = "votre-password"
```

## Build personnalisé

Pour générer un binaire CineRename avec des clés différentes (rotation CI, staging) :

```bash
export CINERENAME_BUNDLED_TVDB_API_KEY="..."
export CINERENAME_BUNDLED_OPENSUBTITLES_API_KEY="..."
npm run dist
```

Voir le [README du projet](https://github.com/Epikaigle/CineRename#readme) pour les détails du processus de build.

## Obtenir vos propres clés

| Provider | Comment |
| --- | --- |
| **TheTVDB** | Créer un compte sur [thetvdb.com](https://thetvdb.com/) → API → Subscriptions |
| **OpenSubtitles** | Créer un compte sur [opensubtitles.com](https://www.opensubtitles.com/) → Consumers → New API consumer |
| **TVmaze** | Pas de clé requise (API publique, rate-limitée à 20 req/s) |
