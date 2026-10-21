---
description: "Configuration des fournisseurs de métadonnées dans CineRename : clés API et paramètres pour TheTVDB, TVmaze, AniList, Kitsu et OpenSubtitles."
---

# Clés API et fournisseurs

CineRename peut consulter plusieurs fournisseurs externes selon la fonctionnalité utilisée :

- **TheTVDB** — films, séries, saisons, épisodes, titres localisés, affiches et visuels quand disponibles
- **TVmaze** — complément de TheTVDB pour les séries TV (open data, sans clé)
- **AniList** — recherche anime et numérotation absolue quand disponible
- **Kitsu** — fallback de recherche anime
- **Jikan** — recherche anime issue de MyAnimeList et titres d’épisodes publics, sans clé ni compte
- **OpenSubtitles** — recherche et téléchargement des sous-titres

## Métadonnées anime et langues de repli

[Jikan](https://docs.api.jikan.moe/) ne demande ni clé API personnelle ni compte. Il fournit des variantes du titre de l’anime et, selon les fiches, des titres d’épisodes anglais, japonais ou romanisés. Le français et les autres traductions ne sont pas garantis. CineRename utilise un titre de repli disponible si la traduction demandée manque ; il n’invente ni traduction ni correspondance globale entre saisons à partir des numéros d’une fiche. L’accès technique à une API publique ne vaut pas autorisation de réutilisation commerciale des données MyAnimeList en amont.

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
   - `CINERENAME_TVDB_SUBSCRIBER_PIN`
   - `CINERENAME_OPENSUBTITLES_API_KEY`
   - `CINERENAME_OPENSUBTITLES_USERNAME`
   - `CINERENAME_OPENSUBTITLES_PASSWORD`
   - `CINERENAME_OPENSUBTITLES_USER_AGENT`
2. **Override saisi dans Préférences → Sources et sous-titres** (stocké dans le coffre de secrets / trousseau système quand c'est sensible)
3. **Fichier `providers.toml`** dans le sous-dossier `<config-dir>/providers/`
4. **Clé bundlée par défaut** compilée dans l'app

## Configurer via l'UI

**Préférences → Sources et sous-titres** :

- TheTVDB : champ **API Key** et optionnel **Code PIN abonné**
- OpenSubtitles : champ **API Key** + identifiants (username/password) si vous avez un compte premium

Les valeurs sensibles sont stockées via le coffre de secrets / trousseau du système quand disponible, pas en clair dans la base SQLite locale. Elles ne quittent jamais votre machine sauf lorsqu'elles sont envoyées au fournisseur concerné.

## Configurer via fichier

Créez (ou éditez) `providers.toml` dans le sous-dossier `providers/` de votre répertoire de configuration :

| Système / Mode | Chemin |
| --- | --- |
| Windows (Bureau) | `%APPDATA%\com.cinerename.desktop\providers\providers.toml` |
| macOS (Bureau) | `~/Library/Application Support/com.cinerename.desktop/providers/providers.toml` |
| Linux (Bureau) | `~/.local/share/com.cinerename.desktop/providers/providers.toml` |
| Headless / NAS (Linux) | `~/.config/cinerename/providers/providers.toml` |

Format :

```toml
[thetvdb]
enabled = true
api_key = "votre-clé-tvdb"
subscriber_pin = "votre-code-pin-abonne"

[opensubtitles]
enabled = true
api_key = "votre-clé-opensubtitles"
username = "votre-username"
password = "votre-password"
user_agent = "CineRename"

[jikan]
enabled = true
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
| **Jikan** | Ni clé ni compte pour les lectures publiques utilisées par CineRename ; les conditions des données en amont restent applicables |
