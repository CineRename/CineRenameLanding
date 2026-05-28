# Sous-titres

CineRename intègre un module dédié à la **recherche et au téléchargement automatique de sous-titres** via [OpenSubtitles](https://www.opensubtitles.com/).

## À quoi ça sert

### Visualiseur intégré

Avant de télécharger, le bouton **Afficher** ouvre un lecteur texte intégré.
Vous pouvez vérifier la synchronisation, lire les répliques, et utiliser la barre de recherche pour trouver un mot clé spécifique.

![Visualiseur de sous-titres](/assets/img/subtitle-visualizer.png)

## Options de nommage

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

## Visualiseur de sous-titres intégré

Chaque sous-titre local listé dans le Studio Sous-titres expose un bouton **Visualiser**. Il ouvre une fenêtre qui :

- Parse le fichier `.srt` ou `.vtt` côté Rust (UTF-8 + BOM, fallback Latin-1)
- Strippe le markup (`<i>`, `<b>`, `{\an8}`) pour un affichage propre
- Affiche les répliques avec leurs timestamps (`HH:MM:SS.mmm → HH:MM:SS.mmm`)
- Permet de filtrer en direct par texte (utile pour vérifier qu'une réplique précise est bien là)
- Annonce la durée totale et le nombre de répliques parsées

Pratique pour vérifier qu'un sous-titre n'est pas désynchronisé ou tronqué avant de le déployer dans toute la bibliothèque.

## Upload d'un sous-titre local vers OpenSubtitles

Si vous avez un sous-titre que vous avez retraduit ou resynchronisé, vous pouvez le partager directement à la communauté :

1. Dans le Studio Sous-titres, cliquez sur le bouton **Envoyer** à côté d'un sous-titre local
2. Renseignez le **code langue** (ISO 639-1 : `fr`, `en`, `es`…), le flag **malentendant**, le nom de **release** et un éventuel commentaire pour la modération
3. Validez — l'app se connecte à OpenSubtitles (login Bearer token), encode le fichier en base64 et le POST sur `/api/v1/upload`

::: warning Compte OpenSubtitles requis
L'upload nécessite **clé API + compte utilisateur** (login + password) dans **Réglages → Providers → OpenSubtitles**. La clé API embarquée par défaut ne suffit pas — il faut un compte qui a accepté les conditions de contributeur OpenSubtitles.
:::

Quand l'upload réussit, CineRename remonte l'URL publique de la page du sous-titre (cliquable pour ouvrir dans le navigateur).

## Limitations connues

- Les **sous-titres forcés** ne sont pas distingués automatiquement. Il faudra parfois renommer en `.forced.srt` pour Plex.
- Les **animes peu connus** ont parfois peu ou pas de matchs. Dans ce cas, OpenSubtitles fallback vers une recherche externe (ex. Anidb) — non couvert par CineRename pour l'instant.
- Les **sous-titres embarqués** dans le `.mkv` ne sont pas extraits ; CineRename ne fait que rajouter des `.srt` externes.
