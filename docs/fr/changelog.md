# Notes de version

Cette page liste les versions de CineRename de la plus recente a la plus ancienne. Les telechargements sont disponibles depuis la page principale.

<!-- CINERENAME_RELEASE_HISTORY_START -->

## CineRename v0.5.8

Publie le 2026-10-23.

### Points importants

- Jikan / MyAnimeList rejoint les sources d’animés et d’épisodes, sans compte ni clé API personnelle. AniList, Kitsu ou Jikan peuvent être définis comme source par défaut pour les animés.
- Les fichiers ajoutés aux dossiers surveillés pendant la fermeture de l’application sont récupérés à la réouverture, avec une reprise plus fiable et moins de doublons.
- La progression des transferts tient compte du volume de données transféré, et la barre d’état affiche le nouveau nom du fichier.
- Diverses corrections dans le Studio, la navigation, l’affichage au démarrage, l’enregistrement des réglages et les traductions de l’interface.

## CineRename v0.5.7

Publie le 2026-10-18.

### Points importants

- Choisissez une destination enregistrée pour les fichiers sélectionnés directement dans Studio, avec aperçu du chemin et sans modifier vos réglages d’automatisation.
- Consultez les nouveautés traduites hors ligne en cliquant sur la version installée.
- Les réglages restent accessibles pendant l’initialisation de l’index local au démarrage.

## CineRename v0.5.6

Publie le 2026-10-16.

### Points importants

- Préréglages de destinations séparées pour les films, séries et animés.
- Progression et annulation des gros transferts améliorées.
- Amélioration de l’intégrité des installateurs macOS.
- Notifications de mise à jour plus claires et plus discrètes.

## CineRename v0.5.5

Publie le 2026-10-15.

### Points importants

- **Compatibilité NAS / SMB sous macOS** : ajout d'un repli lorsque le volume réseau ne prend pas en charge le renommage exclusif, pour la préparation, la finalisation, le retour arrière et l'annulation.
- **Copies vers les volumes réseau** : la copie peut continuer si la destination ne prend explicitement pas en charge la conservation des permissions POSIX ; les véritables erreurs d'accès et d'entrée-sortie interrompent toujours l'opération.
- **Modèles de nommage** : prise en charge des espaces dans les balises comme `{ title }` et conservation du texte ressemblant à des balises dans les titres des médias.
- **Métadonnées techniques** : correction de la détection de profondeur vidéo pour des formats comme NV12 et les fichiers dont la profondeur brute est inconnue.
- **Synchronisation des sous-titres** : correction d'un débordement avec de grands décalages et meilleure précision de la correction de dérive sur les longues durées.
- **Cache d'archives** : prévention des plantages du nettoyage lorsque les marqueurs contiennent une date hors plage.
- **Sécurité** : mise à jour des dépendances TLS et frontend et blocage des redirections automatiques pour les hooks et le rafraîchissement Plex/Jellyfin afin de protéger les données d'authentification. Renseignez directement l'URL finale du service.
- **Performances** : réduction des allocations lors du tri naturel des chemins et du rendu des modèles.
- **Statistiques d'utilisation** : rétablissement de l'attribution entre le site et l'application et ajout d'événements de navigation entre les écrans et les paramètres.

## CineRename v0.5.4

Publie le 2026-09-13.

### Points importants

- Traduction intégrale en espagnol et chinois simplifié : prise en charge complète de l'application, détection automatique de la langue du système et recherche de sous-titres dédiée.
- Compatibilité NAS Synology & Docker : correction du démarrage du serveur WebUI (port 8787) et suppression des crashs en boucle sur les noyaux Linux ne supportant pas Landlock.
- Partages réseau Windows (UNC) : résolution des faux positifs « fichier non disponible sur le disque » lors du renommage sur des dossiers partagés (\\serveur\partage).
- Support des chemins longs et du cloud : prise en charge native des chemins de plus de 260 caractères sous Windows et compatibilité renforcée avec les dossiers synchronisés (OneDrive, Dropbox).

## CineRename v0.5.3

Publie le 2026-09-12.

### Points importants

- Active les variables MediaInfo (`{resolution}`, `{source}`, `{video_codec}`, `{audio_codec}`, `{audio_language}`, `{dynamic_range}`, `{bit_depth}`) nativement et en permanence sur tous les systèmes d’exploitation, levant les restrictions antérieures sous Windows.
- Simplifie l’éditeur de modèles avec des puces de variables toujours accessibles, un aperçu instantané en temps réel et un onglet des paramètres avancés épuré.
- Déploie un système persistant de notification des mises à jour avec bannière supérieure, widget dans la barre latérale et badges d’action directe dans la barre d’état.
- Harmonise la typographie et la linguistique française et anglaise (espaces insécables, apostrophes typographiques et alignement terminologique).
- Actualise l’ensemble de la documentation pour le CLI portable, le serveur headless et les déploiements NAS / Docker.

## CineRename v0.5.2

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

## CineRename v0.5.1

Publie le 2026-09-02.

### Points importants

- Rend les renommages plus sûrs grâce à une meilleure récupération et annulation lorsqu'un déplacement, une copie ou un renommage est interrompu.
- Rend l'historique plus fiable, pour revoir les actions terminées et revenir en arrière plus sereinement.
- Améliore la mise à jour intégrée avec des signatures mieux vérifiées et un redémarrage plus sûr après installation.
- Important sur macOS : les utilisateurs en 0.5.0 doivent installer la 0.5.1 manuellement depuis le DMG ou le PKG ; Windows et Linux peuvent continuer à utiliser la mise à jour intégrée.
- Garde un comportement de renommage cohérent entre l'application, la CLI, les builds NAS et les archives Docker.
- Améliore la stabilité de l'interface au quotidien.
- Ajoute des téléchargements plus clairs et des fichiers de vérification pour choisir le bon installateur et le contrôler si besoin.

## CineRename v0.5.0

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
