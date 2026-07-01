# Plex / Jellyfin / Emby / Kodi

CineRename produit une arborescence directement compatible avec les principaux serveurs médias. Cette page récapitule les conventions et les bonnes pratiques par serveur.

## Conventions de nommage

CineRename suit les conventions officielles :

- [Plex Movie naming](https://support.plex.tv/articles/naming-and-organizing-your-movie-media-files/)
- [Plex TV naming](https://support.plex.tv/articles/naming-and-organizing-your-tv-show-files/)
- [Jellyfin Movie/TV naming](https://jellyfin.org/docs/general/server/media/movies/)
- [Emby naming guide](https://emby.media/support/articles/Movie-Naming.html)

Les trois serveurs partagent en très grande partie la même convention. Les presets `plex`, `jellyfin` et `emby` sont donc proches mais pas identiques (subtilités sur les `Specials`, les multi-épisodes, les éditions étendues).

## Films

```
Films/
├── Mon Film (2023)/
│   ├── Mon Film (2023).mkv
│   ├── Mon Film (2023).fr.srt
│   └── Mon Film (2023).en.srt
└── Autre Film (2024) {edition-Director's Cut}/
    └── Autre Film (2024) {edition-Director's Cut}.mkv
```

**Notes** :
- L'année entre parenthèses est essentielle pour le matching.
- Les éditions multiples utilisent `{edition-...}` (Plex/Jellyfin/Emby comprennent).
- Les sous-titres `.lang.srt` à côté du fichier vidéo sont automatiquement attachés.

## Séries TV

```
Séries/
├── Ma Série (2020)/
│   ├── Season 01/
│   │   ├── Ma Série (2020) - S01E01 - Pilote.mkv
│   │   ├── Ma Série (2020) - S01E01 - Pilote.fr.srt
│   │   └── Ma Série (2020) - S01E02 - Episode 2.mkv
│   └── Season 02/
│       └── ...
```

**Notes** :
- Le format `S01E01` est le plus universel.
- Le titre d'épisode après le `-` est optionnel mais aide à l'affichage.
- Le dossier `Season 01` (en anglais, zéro-padded) est requis par Plex.

## Animes

CineRename traite les animes comme des séries TV par défaut. Cas particuliers :

- **Numérotation absolue** (épisodes de 1 à N sans saison) → CineRename peut convertir vers `S01E01..S01EN` selon votre preset.
- **Numérotation saison/épisode** → utilisez un preset anime SxxEyy quand votre serveur et vos sources sont d'accord sur les saisons.
- **Titres localisés** → AniList et Kitsu aident à retrouver l'anime, et TheTVDB peut fournir des titres d'épisodes localisés quand ils existent.

## Configurer Plex

1. Dans Plex, créez deux bibliothèques distinctes : **Films** et **Séries**.
2. Pointez-les vers les dossiers que vous utilisez comme cible (`organize --to`).
3. Activez l'agent **Plex Movie / Plex TV Series** (les autres ne supportent pas les `{edition-...}`).
4. Lancez un scan.

::: tip Si Plex ne reconnaît pas vos fichiers
Vérifiez :
1. Le titre + année correspondent au fournisseur utilisé par votre serveur média.
2. La structure de dossiers est correcte (un dossier par film, sous-dossiers `Season XX` pour les séries).
3. Aucun caractère bizarre n'a été retiré (ex. `:` est remplacé par `-` automatiquement).
:::

## Configurer Jellyfin

Identique à Plex, avec quelques nuances :

- Jellyfin scrape avec **TheTVDB** par défaut (plutôt que TMDB) — pratique car CineRename utilise aussi TheTVDB.
- Le scan en temps réel peut être activé via `Library → Real-time monitoring`.

## Configurer Emby

Identique à Jellyfin (Emby et Jellyfin sont des forks du même code historique).

## Configurer Kodi

1. Dans Kodi, accédez à la section **Vidéos > Fichiers**.
2. Ajoutez votre dossier source de films ou de séries.
3. Lors de la configuration du scraper (Fournisseur d'informations) :
   - Pour les **Films** : Choisissez *The Movie Database Python* ou *Local information only* si vous utilisez NFOs.
   - Pour les **Séries** : Choisissez *TheTVDB* (recommandé car CineRename utilise les identifiants TVDB par défaut).
4. Pour les films, si vous utilisez le preset par défaut de CineRename (un film par dossier), assurez-vous d'activer l'option **"Les films sont dans des dossiers séparés"**.
5. Validez et lancez la mise à jour de la médiathèque.

## Que faire si la reconnaissance échoue ?

1. Renommez via le **Studio** plutôt qu'en CLI silencieux — vous verrez les matches incertains.
2. Forcez un match différent en cas de doute (titre similaire à un autre).
3. Ajoutez l'**ID TVDB / TMDB** explicitement dans le nom du dossier :
   - Plex : `Mon Film (2023) {tmdb-12345}` ou `{tvdb-12345}`
   - Jellyfin : `Mon Film (2023) [tmdbid-12345]` ou `[tvdbid-12345]`
   *(Note : CineRename interroge TheTVDB/TVmaze pour son propre moteur interne, mais il préserve et transfère les tags de type `{tmdb-...}` entrés manuellement pour forcer le matching du côté de Plex/Jellyfin).*
4. Si ça persiste, lancez Plex Dance (sortir le fichier de la bibliothèque, scanner, remettre, rescanner).
