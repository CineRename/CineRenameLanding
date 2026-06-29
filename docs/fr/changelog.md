# Notes de version

Cette page récapitule les changements importants de CineRename. Pour la dernière version, téléchargez depuis la page principale.

## v0.5.0 — Version initiale

### Fonctionnalités

- 👁️ **Visualiseur de sous-titres** — affichage SRT / VTT cue par cue, recherche texte, intégré au Studio Sous-titres
- ☁️ **Upload OpenSubtitles** — publication d'un sous-titre local depuis l'app (nécessite un compte testeur, voir [Sous-titres](/fr/subtitles))
- 💿 **Disc-rip linear pair** — pairing automatique des `VOB` / `M2TS` / `BDMV` avec les épisodes d'une saison de série
- 🔐 **Vérification de manifeste checksums** — relire un `.sfv` / `.md5` / `.sha1` / `.sha256` et flagger fichiers altérés/manquants
- 📅 **Export liste d'épisodes** — exporter le planning complet d'une série en CSV / TSV / JSON
- 👁️ **Dossiers surveillés** — auto-import quand de nouveaux fichiers arrivent dans un dossier
- 🛠️ **Templates JavaScript** — moteur QuickJS embarqué pour les patterns avancés (ternaires, regex, closures et règles de nettoyage conditionnelles)
- 🗄️ **Builds NAS** — disponibles pour `linux-x86_64` et `linux-aarch64` (Synology / QNAP)

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
- ✅ Importeur de formats historiques (token-to-token converter)
- ✅ Checksums : **CRC32 / MD5 / SHA-1 / SHA-256** avec manifeste sidecar

- 🎬 **Studio** — renommage avec aperçu Avant / Après
- 📝 Reconnaissance films / séries / animes via TheTVDB et TVmaze
- ⏳ **Historique** avec undo en un clic
- 🛠️ Presets de nommage Plex / Jellyfin / Emby / Kodi
- 🌍 Interface multilingue FR / EN
- 💻 CLI initiale : `preview`, `rename`, `organize`
