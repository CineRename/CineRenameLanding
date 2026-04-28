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
      link: /getting-started
    - theme: alt
      text: Télécharger
      link: /fr/download
    - theme: alt
      text: GitHub
      link: https://github.com/Epikaigle/CineRename

features:
  - icon: 🎬
    title: Studio
    details: Renommez en masse vos films, séries et animes avec un aperçu avant/après sécurisé. Aucun fichier n'est touché tant que vous n'avez pas validé.
    link: /studio
  - icon: 📝
    title: Sous-titres
    details: Téléchargement automatique via OpenSubtitles. Correspondance exacte avec la vidéo, multi-langues, nommage compatible Plex.
    link: /subtitles
  - icon: 👯
    title: Doublons
    details: Détection des copies multi-qualités (1080p, 4K, etc.). Suggestion de la meilleure version, suppression directe via menu contextuel.
    link: /duplicates
  - icon: ⏳
    title: Historique & Undo
    details: Chaque modification est tracée. Annulez n'importe quel renommage en un clic, même plusieurs jours après.
    link: /history
  - icon: ⚡
    title: Mode automatique
    details: Pipeline complet — renommage, sous-titres, déplacement vers la bibliothèque finale. Compatible Plex, Jellyfin, Emby.
    link: /auto-mode
  - icon: 🖥️
    title: CLI
    details: Commandes preview / rename / organize / auto pour vos workflows NAS, Seedbox et serveurs Plex.
    link: /cli
---

## Pourquoi CineRename ?

CineRename est une application de bureau **100 % locale** pour reprendre le contrôle de votre bibliothèque vidéo. Aucun upload, aucun cloud propriétaire, aucune donnée transmise — uniquement les requêtes vers les bases publiques (TheTVDB, TVmaze, OpenSubtitles) pour récupérer les métadonnées.

Construit avec **Rust** (pour la performance disque et la sécurité) et **Svelte 5** (pour une UI fluide même avec des milliers de fichiers), CineRename fonctionne nativement sur Windows, macOS et Linux grâce à Tauri v2.

## Par où commencer ?

| Si vous voulez… | Allez à |
| --- | --- |
| Installer l'application | [Installation](/installation) |
| Renommer votre premier dossier | [Démarrage rapide](/getting-started) |
| Comprendre le Studio | [Studio](/studio) |
| Automatiser vos renommages NAS / Seedbox | [CLI](/cli) |
| Brancher Plex ou Jellyfin | [Plex / Jellyfin / Emby](/media-servers) |
