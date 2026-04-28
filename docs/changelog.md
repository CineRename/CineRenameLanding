# Notes de version

Cette page récapitule les changements importants de CineRename. Pour les notes complètes, consultez la page [Releases GitHub](https://github.com/Epikaigle/CineRename/releases).

## En cours — `v0.2`

::: tip Ces fonctionnalités sont disponibles dans la branche principale. Une release officielle suivra dès que les tests E2E seront verts.
:::

- ✅ Module **Sous-titres** OpenSubtitles
- ✅ Module **Doublons** multi-qualités
- ✅ Mode **Automatique** pipeline complet
- ✅ Menu contextuel natif (clic droit) sur les doublons : ouvrir l'emplacement, lire la vidéo, forcer la suppression
- ✅ Virtualisation des listes Svelte 5 (perf sur grands volumes)
- ✅ Refactor des erreurs avec codes de traduction
- ✅ Composants `PreviewEntryRow` et `HistoryEntryRow` extraits

## v0.1.0 — Première bêta

- 🎬 **Studio** — renommage avec aperçu Avant / Après
- 📝 Reconnaissance films / séries / animes via TheTVDB et TVmaze
- ⏳ **Historique** avec undo en un clic
- 🛠️ Presets de nommage Plex / Jellyfin / Emby / Kodi
- 🌍 Interface multilingue FR / EN
- 💻 CLI initiale : `preview`, `rename`, `organize`

## Roadmap à venir

| Version | Ce qui est prévu |
| --- | --- |
| **v0.3** | Synchro cloud des règles de nommage entre appareils |
| **v0.4** | Connecteur natif Plex / Jellyfin (déclencher un rescan après renommage) |
| **v0.5** | Auto-update et mises à jour différentielles |
| **Plus tard** | Détection des éditions multiples (Director's Cut, Extended), support des bases AniDB pour animes |

## Conventions de versioning

CineRename suit [SemVer](https://semver.org/) :

- **Major** (`x.0.0`) — changements incompatibles avec les versions précédentes
- **Minor** (`0.x.0`) — nouvelles fonctionnalités rétro-compatibles
- **Patch** (`0.0.x`) — bug fixes uniquement

Tant que la version est en `0.x.x`, l'API (commandes CLI, format de la base SQLite) peut évoluer. À partir de `1.0.0`, la stabilité sera garantie.

## Historique de la base SQLite

À chaque migration de la base interne, CineRename effectue automatiquement la migration au lancement. Aucune intervention manuelle n'est requise — l'historique de vos opérations est préservé entre versions.

::: warning Downgrade
Revenir à une version antérieure après avoir lancé une version plus récente n'est **pas** garanti : la base peut être à un schéma futur que l'ancienne version ne reconnaît pas. Sauvegardez `~/Library/Application Support/CineRename/cinerename.sqlite` avant un downgrade.
:::
