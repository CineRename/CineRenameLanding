# Démarrage rapide

Cette page vous accompagne sur votre premier renommage. Comptez **5 minutes** pour traiter un dossier de 100 épisodes.

## Pré-requis

- CineRename installé ([Installation](/fr/installation))
- Un dossier contenant des fichiers vidéo (films, épisodes de séries ou animes)
- Une connexion internet pour interroger TheTVDB / TVmaze (les fichiers ne sont jamais envoyés, seules les requêtes de métadonnées sortent)

## 1. Lancer l'app et ouvrir le Studio

Au démarrage, CineRename ouvre l'écran **Studio**. C'est ici que tout commence.

<img src="/assets/img/screen-studio.png" alt="Studio CineRename">

::: info Studio = sandbox sécurisée
Aucun fichier n'est touché tant que vous n'avez pas validé. Tout ce qui se passe dans le Studio est une **prévisualisation**.
:::

::: tip Zéro Risque : La machine à remonter le temps
Même après validation, l'onglet **Historique** vous permet d'annuler n'importe quelle opération en un seul clic. Vous avez fait une erreur de format ? Cliquez sur Annuler et vos fichiers reprennent leur nom original instantanément.
:::

## 2. Glisser-déposer vos fichiers

Vous avez trois options :

- **Glisser-déposer** un dossier entier (ou plusieurs fichiers) directement dans la fenêtre du Studio.
- Cliquer sur **Ajouter des fichiers** ou **Ajouter des dossiers**.
- Glisser une **archive ZIP / RAR / 7z** : CineRename extrait les archives supportées dans un cache local avant de traiter les vidéos. Les archives protégées par mot de passe ne sont pas supportées.

CineRename propose un type pour chaque fichier, que vous pouvez corriger manuellement si un dossier mixte le trompe :
- **Film** — matching titre/année avec les fournisseurs de métadonnées.
- **Épisode de série** — parsing saison/épisode et recherche de série.
- **Anime** — matching orienté anime, avec numérotation absolue quand le preset choisi l'utilise.

## 3. Vérifier l'aperçu Avant / Après

Chaque fichier apparaît dans la liste avec :

| Avant | Après |
| --- | --- |
| `Mon.Film.2023.1080p.BluRay.x264-GROUP.mkv` | `Mon Film (2023).mkv` |

Cliquez sur n'importe quelle ligne pour voir les détails ou modifier manuellement.

::: tip Choisir le bon match
Si CineRename hésite entre plusieurs résultats, un sélecteur s'affiche. Sélectionnez le bon film/épisode et le rendu se met à jour instantanément.
:::

## 4. Configurer le format (optionnel)

Avant de valider, vous pouvez choisir un **preset de nommage** :

- **Plex** (par défaut) — `Series Name (Year)/Season 01/Series Name - S01E01 - Episode Title.mkv`
- **Jellyfin** — convention identique à Plex avec quelques ajustements
- **Emby** — encore proche
- **Kodi** — variantes pour XBMC/Kodi
- **Personnalisé** — éditez le pattern dans **Préférences → Modèles de nommage**.

## 5. Valider le renommage

Quand vous êtes satisfait, cliquez sur **Renommer**. CineRename :

1. Demande confirmation (ergonomie zéro-regret)
2. Renomme tous les fichiers en parallèle
3. Affiche un récap
4. Enregistre l'opération dans l'**Historique** (récupérable indéfiniment)

## 6. Et après ?

- Pour ajouter automatiquement des sous-titres → [Module Sous-titres](/fr/subtitles)
- Pour nettoyer les copies multiples → [Module Doublons](/fr/duplicates)
- Pour annuler ou réviser → [Historique & Undo](/fr/history)
- Pour automatiser un dossier entier → [Pipeline d'automatisation](/fr/auto-mode)
- Pour scripter sur un NAS → [CLI](/fr/cli)

::: tip Aller plus loin
Si vous gérez un Plex / Jellyfin, lisez [Plex / Jellyfin / Emby](/fr/media-servers) pour calibrer les presets selon votre serveur.
:::
