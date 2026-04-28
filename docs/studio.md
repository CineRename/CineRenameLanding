# Studio

Le **Studio** est l'écran principal de CineRename : c'est là où vous prévisualisez et validez chaque renommage. Toute opération destructive passe d'abord par lui.

## Anatomie de l'écran

- **Zone de drop** — au centre, accepte fichiers, dossiers et archives.
- **Liste virtuelle** — affiche jusqu'à des milliers de fichiers sans ralentissement (virtualisation Svelte 5).
- **Panneau de détails** — quand vous cliquez sur une ligne, affiche metadata trouvée, alternatives, format de sortie.
- **Actions** — boutons **Renommer**, **Nettoyer la liste**, **Exporter le rapport**.

## Reconnaissance des médias

CineRename utilise une heuristique en plusieurs passes :

1. **Parsing du nom de fichier** — saison/épisode (S01E02, 1x02, Episode 2…), année, qualité, codec, langue.
2. **Identification du type** — film, série, anime — via patterns + bases.
3. **Requête metadata** — TheTVDB pour les films/séries, TVmaze pour les séries TV en complément, base interne pour les animes.
4. **Scoring** — tous les candidats sont notés. Le meilleur est sélectionné, les autres restent disponibles dans le sélecteur.

## Édition manuelle

Pour chaque entrée, vous pouvez :

- **Forcer un match** — sélectionner manuellement le bon film/épisode parmi les candidats.
- **Éditer le titre** — typo, version étendue ("Director's Cut")…
- **Ignorer une ligne** — exclure du renommage final (utile pour les `.txt`, `.nfo` qui se sont glissés).

## Presets de nommage

Configurez dans **Réglages → Presets**. Variables disponibles :

| Variable | Description |
| --- | --- |
| `{title}` | Titre du média |
| `{year}` | Année de sortie |
| `{season}` | Numéro de saison (zero-padded) |
| `{episode}` | Numéro d'épisode (zero-padded) |
| `{episodeTitle}` | Titre de l'épisode |
| `{quality}` | Résolution (`1080p`, `4K`, `720p`…) |
| `{codec}` | Codec vidéo (`x264`, `x265`, `AV1`…) |
| `{ext}` | Extension d'origine |

::: tip Plex friendly
Le preset par défaut est calibré pour Plex et Jellyfin. Si vous changez, vérifiez avec votre scanner de bibliothèque que les fichiers sont toujours reconnus.
:::

## Sécurité

- **Aucune écriture disque** avant validation.
- **Renommage atomique** — si un fichier ne peut pas être renommé (permissions, conflit de nom), l'opération s'arrête proprement et rien n'est laissé à moitié fait.
- **Conflits détectés** — si deux fichiers donneraient le même nom de sortie, CineRename refuse de continuer et signale le conflit.

## Raccourcis clavier

| Action | Windows / Linux | macOS |
| --- | --- | --- |
| Tout sélectionner | `Ctrl + A` | `Cmd + A` |
| Lancer le renommage | `Ctrl + Enter` | `Cmd + Enter` |
| Nettoyer la liste | `Ctrl + Backspace` | `Cmd + Delete` |
| Ouvrir Réglages | `Ctrl + ,` | `Cmd + ,` |
