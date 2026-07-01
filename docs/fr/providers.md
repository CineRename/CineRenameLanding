# Clés API et fournisseurs

CineRename peut consulter plusieurs fournisseurs externes selon la fonctionnalité utilisée :

- **TheTVDB** — films, séries, saisons, épisodes, titres localisés, affiches et visuels quand disponibles
- **TVmaze** — complément de TheTVDB pour les séries TV (open data, sans clé)
- **AniList** — recherche anime et numérotation absolue quand disponible
- **Kitsu** — fallback de recherche anime
- **OpenSubtitles** — recherche et téléchargement des sous-titres

Pour que l'application fonctionne dès l'installation, CineRename peut inclure des clés fournisseur au build. Vous n'avez donc rien à configurer pour démarrer, mais vos propres clés peuvent aider pour de gros volumes ou des quotas dédiés.

## Pourquoi fournir sa propre clé ?

- **Quotas plus élevés** — utile pour traiter de très gros volumes
- **Quota dédié** — utile pour TheTVDB ou OpenSubtitles en usage intensif
- **Fonctions liées au compte** — l'upload OpenSubtitles nécessite votre propre clé API et vos identifiants
- **Rotation CI / staging** — équipes qui testent sur un environnement isolé

## Ordre de résolution

Si plusieurs sources fournissent une clé, CineRename utilise la première trouvée selon cet ordre :

1. **Variable d'environnement runtime**
   - `CINERENAME_TVDB_API_KEY`
   - `CINERENAME_OPENSUBTITLES_API_KEY`
2. **Override saisi dans Préférences → Sources et sous-titres** (stocké dans le coffre de secrets / trousseau système quand c'est sensible)
3. **Fichier `providers.toml`** dans le dossier de config local
4. **Clé bundlée par défaut** compilée dans l'app

## Configurer via l'UI

**Préférences → Sources et sous-titres** :

- TheTVDB : champ **API Key**
- OpenSubtitles : champ **API Key** + identifiants (username/password) si vous avez un compte premium

Les valeurs sensibles sont stockées via le coffre de secrets / trousseau du système quand disponible, pas en clair dans la base SQLite locale. Elles ne quittent jamais votre machine sauf lorsqu'elles sont envoyées au fournisseur concerné.

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



## Obtenir vos propres clés

| Provider | Comment |
| --- | --- |
| **TheTVDB** | Créer un compte sur [thetvdb.com](https://thetvdb.com/) → API → Subscriptions |
| **OpenSubtitles** | Créer un compte sur [opensubtitles.com](https://www.opensubtitles.com/) → Consumers → New API consumer |
| **TVmaze** | Pas de clé requise (API publique, rate-limitée à 20 req/s) |
| **AniList** | Pas de clé requise pour les usages publics de CineRename |
| **Kitsu** | Pas de clé requise pour les usages publics de CineRename |
