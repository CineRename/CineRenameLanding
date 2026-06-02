# Notes de version

Cette page récapitule les changements importants de CineRename. Pour la dernière version, téléchargez depuis la page principale.

## En cours — `v0.2`

::: tip Ces fonctionnalités sont disponibles dans la branche principale. Une release officielle suivra dès que les tests E2E seront verts.
:::

### Nouvelles fonctionnalités majeures (parité FileBot)

- 👁️ **Visualiseur de sous-titres** — affichage SRT / VTT cue par cue, recherche texte, intégré au Studio Sous-titres
- ☁️ **Upload OpenSubtitles** — publication d'un sous-titre local depuis l'app (nécessite un compte testeur, voir [Sous-titres](/fr/subtitles))
- 💿 **Disc-rip linear pair** — pairing automatique des `VOB` / `M2TS` / `BDMV` avec les épisodes d'une saison de série
- 🔐 **Vérification de manifeste checksums** — relire un `.sfv` / `.md5` / `.sha1` / `.sha256` et flagger fichiers altérés/manquants
- 📅 **Export liste d'épisodes** — exporter le planning complet d'une série en CSV / TSV / JSON
- 👁️ **Dossiers surveillés** — auto-import quand de nouveaux fichiers arrivent dans un dossier
- 🛠️ **Templates JavaScript** — moteur QuickJS embarqué pour les patterns avancés (ternaires, regex, closures — équivalent direct du Groovy FileBot)
- 🗄️ **Builds NAS** — disponibles pour `linux-x86_64` et `linux-aarch64` (Synology / QNAP)

### Améliorations antérieures de la branche

- ✅ Module **Sous-titres** OpenSubtitles
- ✅ Module **Doublons** multi-qualités
- ✅ Mode **Automatique** pipeline complet
- ✅ Menu contextuel natif (clic droit) sur les doublons : ouvrir l'emplacement, lire la vidéo, forcer la suppression
- ✅ Virtualisation des listes Svelte 5 (perf sur grands volumes)
- ✅ Refactor des erreurs avec codes de traduction
- ✅ Composants `PreviewEntryRow` et `HistoryEntryRow` extraits
- ✅ Présets **Plex / Kodi / Jellyfin / Emby** prêts à l'emploi
- ✅ Match-mode **opportuniste** pour filenames très bruités
- ✅ Opérations fichier : **Move / Copy / Hardlink / Symlink**
- ✅ Importeur **FileBot format** (token-to-token converter)
- ✅ Checksums : **CRC32 / MD5 / SHA-1 / SHA-256** avec manifeste sidecar

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
