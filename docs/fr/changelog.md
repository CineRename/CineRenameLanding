# Notes de version

Cette page liste les versions de CineRename de la plus recente a la plus ancienne. Les telechargements sont disponibles depuis la page principale.

<!-- CINERENAME_RELEASE_HISTORY_START -->

## v0.5.4 - CineRename 0.5.4

Publie le 2026-09-13.

### Points importants

- Traduction intégrale de l'application en espagnol (`Español`) et en chinois simplifié (`简体中文`), couvrant les 24 modules de l'interface (aperçu, modèles de renommage, fournisseurs de métadonnées, dossiers surveillés, sous-titres, sommes de contrôle, historique, paramètres, dialogues et erreurs).
- Résolution de l'incompatibilité Landlock (`ENOSYS`) sur NAS Synology (DSM) et anciens noyaux Linux : repli automatique gracieux lorsque le bac à sable Landlock n'est pas supporté par le noyau hôte, évitant le redémarrage en boucle du conteneur Docker et garantissant le bon démarrage du serveur WebUI (port 8787). Ajout des options `--no-sandbox` (`--no-landlock`) et de la variable `CINERENAME_DISABLE_LANDLOCK=1`.
- Résolution des faux positifs « fichier non disponible sur le disque » sur les partages réseau Windows (UNC) en normalisant les préfixes étendus (`\\?\UNC\...` reconstruits proprement en `\\serveur\partage\...`), sécurisant l'import, la prévisualisation, l'export dry-run CSV et l'annulation d'historique.
- Renforcement majeur de la compatibilité filesystem : support natif des chemins longs Windows (> 260 car.) via l'API Win32 et le manifeste `<longPathAware>`, limitation stricte de la taille des fichiers temporaires (< 255 octets), support transparent des fichiers cloud (OneDrive, Dropbox) et jonctions NTFS, fiabilisation des renommages Linux sur montages CIFS/SMB/NFS et préservation best-effort des dates d'accès sur NAS.
- Détection automatique de la langue native du système au premier lancement, adaptant instantanément l'interface en français, anglais, espagnol ou chinois simplifié.
- Support de la recherche de sous-titres en espagnol et en chinois via les fournisseurs OpenSubtitles et SubDL.
- Suite de tests automatisés de parité linguistique garantissant une correspondance à 100 % des clés, des variables d'interpolation et des règles typographiques entre toutes les langues prises en charge.

## v0.5.3 - CineRename 0.5.3

Publie le 2026-09-12.

### Points importants

- Active les variables MediaInfo (`{resolution}`, `{source}`, `{video_codec}`, `{audio_codec}`, `{audio_language}`, `{dynamic_range}`, `{bit_depth}`) nativement et en permanence sur tous les systèmes d’exploitation, levant les restrictions antérieures sous Windows.
- Simplifie l’éditeur de modèles avec des puces de variables toujours accessibles, un aperçu instantané en temps réel et un onglet des paramètres avancés épuré.
- Déploie un système persistant de notification des mises à jour avec bannière supérieure, widget dans la barre latérale et badges d’action directe dans la barre d’état.
- Harmonise la typographie et la linguistique française et anglaise (espaces insécables, apostrophes typographiques et alignement terminologique).
- Actualise l’ensemble de la documentation pour le CLI portable, le serveur headless et les déploiements NAS / Docker.

## v0.5.2 - CineRename 0.5.2

Publie le 2026-09-03.

### Points importants

- Rend les dossiers surveillés totalement résilients : les disques déconnectés ou chemins inaccessibles ne bloquent plus la surveillance ni la gestion des dossiers.
- Supprime définitivement les boucles de réimportation infinies de sous-titres lors des téléchargements manuels, du Mode Automatique et du renommage de sidecars.
- Améliore l'ergonomie en arrière-plan : la détection de nouveaux fichiers ne détourne plus l'écran courant et préserve les boîtes de dialogue de révision ouvertes.
- Résout le chargement infini et le blocage de fermeture dans le visualiseur de sous-titres.
- Optimise la barre d'outils du Studio avec des compteurs de conformité précis et un alignement vertical parfait des actions par ligne.
- Corrige l'ancrage et le positionnement des menus déroulants de sélection pour éviter tout débordement d'écran.
- Réduit la consommation processeur au repos pour le système de surveillance des fichiers.
- Enrichit l'onglet des dossiers surveillés avec l'ouverture directe dans le gestionnaire de fichiers natif et l'édition des libellés.

## v0.5.1 - CineRename 0.5.1

Publie le 2026-09-02.

### Points importants

- Rend les renommages plus sûrs grâce à une meilleure récupération et annulation lorsqu'un déplacement, une copie ou un renommage est interrompu.
- Rend l'historique plus fiable, pour revoir les actions terminées et revenir en arrière plus sereinement.
- Améliore la mise à jour intégrée avec des signatures mieux vérifiées et un redémarrage plus sûr après installation.
- Important sur macOS : les utilisateurs en 0.5.0 doivent installer la 0.5.1 manuellement depuis le DMG ou le PKG ; Windows et Linux peuvent continuer à utiliser la mise à jour intégrée.
- Garde un comportement de renommage cohérent entre l'application, la CLI, les builds NAS et les archives Docker.
- Améliore la stabilité de l'interface au quotidien.
- Ajoute des téléchargements plus clairs et des fichiers de vérification pour choisir le bon installateur et le contrôler si besoin.

## v0.5.0 - CineRename 0.5.0

Publie le 2026-07-09.

### Points importants

- Renommez et organisez films, series TV et animes avec une previsualisation sure avant de toucher aux fichiers.
- Profils Plex, Jellyfin et Kodi prets a l'emploi, avec dossiers media et formats capables d'inclure les IDs.
- Gestion anime avec numerotation absolue, recherche AniList/Kitsu et titres d'episodes localises via TheTVDB quand ils sont disponibles.
- Exports dry-run, historique de renommage et annulation/rollback pour securiser les grosses bibliotheques.
- Recherche de sous-titres avec OpenSubtitles, choix de langue, previsualisation, conversion et outils de decalage.
- Audit de bibliotheque, generation NFO, telechargement poster/fanart et fichiers de metadonnees pour serveurs media.
- Dossiers surveilles, pipeline automatique prudent, integrations qBittorrent / Transmission / JDownloader et workflows Pre-Arr.
- CLI headless, WebUI, TUI, scheduler, archives NAS et Docker pour les usages serveur.

<!-- CINERENAME_RELEASE_HISTORY_END -->
