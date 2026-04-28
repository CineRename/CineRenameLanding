# Plex / Jellyfin / Emby

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
- **Anime-only servers** comme Stash ou Jellyfin avec le plugin AniDB → un preset spécifique `anidb` est disponible (titres japonais, IDs AniDB).

## Configurer Plex

1. Dans Plex, créez deux bibliothèques distinctes : **Films** et **Séries**.
2. Pointez-les vers les dossiers que vous utilisez comme cible (`organize --to`).
3. Activez l'agent **Plex Movie / Plex TV Series** (les autres ne supportent pas les `{edition-...}`).
4. Lancez un scan.

::: tip Si Plex ne reconnaît pas vos fichiers
Vérifiez :
1. Le titre + année correspondent à TheTVDB / TMDB.
2. La structure de dossiers est correcte (un dossier par film, sous-dossiers `Season XX` pour les séries).
3. Aucun caractère bizarre n'a été retiré (ex. `:` est remplacé par `-` automatiquement).
:::

## Configurer Jellyfin

Identique à Plex, avec quelques nuances :

- Jellyfin scrape avec **TheTVDB** par défaut (plutôt que TMDB) — pratique car CineRename utilise aussi TheTVDB.
- Le scan en temps réel peut être activé via `Library → Real-time monitoring`.

## Configurer Emby

Identique à Jellyfin (Emby et Jellyfin sont des forks du même code historique).

## Que faire si la reconnaissance échoue ?

1. Renommez via le **Studio** plutôt qu'en CLI silencieux — vous verrez les matches incertains.
2. Forcez un match différent en cas de doute (titre similaire à un autre).
3. Ajoutez l'**ID TVDB / TMDB** explicitement dans le nom du dossier :
   - Plex : `Mon Film (2023) {tmdb-12345}`
   - Jellyfin : `Mon Film (2023) [tmdbid-12345]`
4. Si ça persiste, lancez Plex Dance (sortir le fichier de la bibliothèque, scanner, remettre, rescanner).
