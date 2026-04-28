# Sous-titres

CineRename intègre un module dédié à la **recherche et au téléchargement automatique de sous-titres** via [OpenSubtitles](https://www.opensubtitles.com/).

## À quoi ça sert

Au lieu de :
1. Identifier le bon hash vidéo
2. Chercher manuellement sur OpenSubtitles
3. Télécharger le bon fichier
4. Le renommer correctement à côté de la vidéo

… CineRename fait tout en un clic, pour des centaines de fichiers à la fois.

## Fonctionnement

1. **Hash vidéo** — CineRename calcule l'empreinte OpenSubtitles standard (`OSDb hash`) sur les premiers et derniers Mo du fichier.
2. **Recherche par hash + fallback metadata** — si aucun sous-titre n'est trouvé via le hash, CineRename retombe sur une recherche par titre, saison et épisode.
3. **Téléchargement** — récupère les fichiers correspondant à votre langue préférée.
4. **Nommage Plex-friendly** — `Mon Film (2023).fr.srt` à côté du `.mkv`, ce qui permet à Plex / Jellyfin de les rattacher automatiquement.

## Configuration

Dans **Réglages → Sous-titres** :

- **Langue préférée** — `fr`, `en`, `es`, `ja`… (codes ISO 639-1)
- **Langues de secours** — si la principale n'est pas trouvée
- **Hearing impaired** — inclure ou non les sous-titres SDH
- **Limite par fichier** — ne télécharger qu'un seul `.srt` ou plusieurs versions

## Clé API OpenSubtitles

CineRename embarque une clé API par défaut, suffisante pour un usage courant. Pour des volumes plus importants ou pour obtenir un quota dédié :

1. Créez un compte sur [OpenSubtitles](https://www.opensubtitles.com/).
2. Récupérez votre clé API personnelle.
3. Saisissez-la dans **Réglages → Providers → OpenSubtitles**, ou via la variable d'environnement `CINERENAME_OPENSUBTITLES_API_KEY`.

Voir [Clés API providers](/providers) pour la résolution complète.

## Workflow recommandé

1. Renommer d'abord les vidéos avec le **Studio** (titres officiels = meilleurs hits OpenSubtitles).
2. Lancer le module **Sous-titres** sur le même dossier.
3. Lancer Plex / Jellyfin → tous les sous-titres sont déjà bien nommés et reconnus.

## Limitations connues

- Les **sous-titres forcés** ne sont pas distingués automatiquement. Il faudra parfois renommer en `.forced.srt` pour Plex.
- Les **animes peu connus** ont parfois peu ou pas de matchs. Dans ce cas, OpenSubtitles fallback vers une recherche externe (ex. Anidb) — non couvert par CineRename pour l'instant.
- Les **sous-titres embarqués** dans le `.mkv` ne sont pas extraits ; CineRename ne fait que rajouter des `.srt` externes.
