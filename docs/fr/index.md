---
layout: home

hero:
  name: CineRename
  text: Documentation
  tagline: Renommez et organisez vos films, séries et animes — entièrement sur votre machine.
  image:
    src: /favicon.svg
    alt: CineRename
  actions:
    - theme: brand
      text: Démarrage rapide
      link: /fr/getting-started
    - theme: alt
      text: Télécharger
      link: /fr/download


features:
  - icon: 🎬
    title: Studio
    details: Renommez en masse vos films, séries et animes avec un aperçu avant/après sécurisé. Aucun fichier n'est touché tant que vous n'avez pas validé.
    link: /fr/studio
  - icon: 📝
    title: Sous-titres
    details: Recherche OpenSubtitles, visualiseur SRT/VTT intégré, et upload de vos sous-titres locaux vers la communauté.
    link: /fr/subtitles
  - icon: 👯
    title: Doublons
    details: Détection des copies multi-qualités (1080p, 4K, etc.). Suggestion de la meilleure version, suppression directe via menu contextuel.
    link: /fr/duplicates
  - icon: ⏳
    title: Historique & Undo
    details: Chaque modification est tracée. Annulez n'importe quel renommage en un clic, même plusieurs jours après.
    link: /fr/history
  - icon: ⚡
    title: Mode automatique
    details: Pipeline complet — renommage, sous-titres, déplacement vers la bibliothèque finale. Compatible Plex, Jellyfin, Emby.
    link: /fr/auto-mode
  - icon: 👁️
    title: Dossiers surveillés
    details: Pointez CineRename vers votre dossier de téléchargement — toute nouvelle vidéo est auto-importée dans le Studio.
    link: /fr/watch-folders
  - icon: 🔐
    title: Checksums
    details: Calcul CRC32 / MD5 / SHA-1 / SHA-256 avec manifeste sidecar, et vérification pour détecter le bit rot.
    link: /fr/checksums
  - icon: 📊
    title: Export de données
    details: Exportez vos plannings d'épisodes manquants ou vos rapports de renommage en JSON et CSV.
    link: /fr/export
  - icon: 🛠️
    title: Templates JavaScript
    details: Moteur QuickJS embarqué pour les patterns avancés — ternaires, regex, closures. Équivalent direct du Groovy FileBot.
    link: /fr/templates
  - icon: 🖥️
    title: CLI & Builds NAS
    details: Commandes preview / rename / organize / auto + binaires Linux x86_64 / aarch64 pour Synology, QNAP et serveurs headless.
    link: /fr/cli
---

## Pourquoi CineRename ?

CineRename est une application de bureau **100 % locale** pour reprendre le contrôle de votre bibliothèque vidéo. Aucun upload, aucun cloud propriétaire, aucune vidéo transmise — uniquement des requêtes vers les fournisseurs de métadonnées et de sous-titres configurés, comme TheTVDB, TVmaze, AniList, Kitsu et OpenSubtitles.

Construit avec **Rust** (pour la performance disque et la sécurité) et **Svelte 5** (pour une UI fluide même avec des milliers de fichiers), CineRename fonctionne nativement sur Windows, macOS et Linux grâce à Tauri v2.

## Par où commencer ?

| Si vous voulez… | Allez à |
| --- | --- |
| Installer l'application | [Installation](/fr/installation) |
| Renommer votre premier dossier | [Démarrage rapide](/fr/getting-started) |
| Comprendre le Studio | [Studio](/fr/studio) |
| Surveiller un dossier en continu | [Dossiers surveillés](/fr/watch-folders) |
| Garantir l'intégrité de vos fichiers | [Checksums](/fr/checksums) |
| Écrire un pattern avancé en JavaScript | [Templates](/fr/templates) |
| Automatiser vos renommages NAS / Seedbox | [CLI](/fr/cli) |
| Brancher Plex ou Jellyfin | [Plex / Jellyfin / Emby](/fr/media-servers) |
