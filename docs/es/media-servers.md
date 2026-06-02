# Plex / Jellyfin / Emby / Kodi

CineRename produce una estructura de directorios directamente compatible con los principales servidores multimedia. Esta página resume las convenciones y mejores prácticas por servidor.

## Convenciones de nombrado

CineRename sigue las convenciones oficiales:

- [Nombrado de películas en Plex](https://support.plex.tv/articles/naming-and-organizing-your-movie-media-files/)
- [Nombrado de series de TV en Plex](https://support.plex.tv/articles/naming-and-organizing-your-tv-show-files/)
- [Nombrado de películas/TV en Jellyfin](https://jellyfin.org/docs/general/server/media/movies/)
- [Guía de nombrado de Emby](https://emby.media/support/articles/Movie-Naming.html)

Los tres servidores comparten en gran medida la misma convención. Los presets `plex`, `jellyfin` y `emby` son por tanto similares pero no idénticos (sutilezas con los `Specials`, multi-episodios, ediciones extendidas).

## Películas

```
Películas/
├── Mi Pelicula (2023)/
│   ├── Mi Pelicula (2023).mkv
│   ├── Mi Pelicula (2023).es.srt
│   └── Mi Pelicula (2023).en.srt
└── Otra Pelicula (2024) {edition-Director's Cut}/
    └── Otra Pelicula (2024) {edition-Director's Cut}.mkv
```

**Notas**:
- El año entre paréntesis es esencial para el emparejamiento.
- Las múltiples ediciones usan `{edition-...}` (Plex/Jellyfin/Emby lo entienden).
- Los subtítulos `.lang.srt` junto al archivo de video se adjuntan automáticamente.

## Series de TV

```
Series/
├── Mi Serie (2020)/
│   ├── Season 01/
│   │   ├── Mi Serie (2020) - S01E01 - Piloto.mkv
│   │   ├── Mi Serie (2020) - S01E01 - Piloto.es.srt
│   │   └── Mi Serie (2020) - S01E02 - Episodio 2.mkv
│   └── Season 02/
│       └── ...
```

**Notas**:
- El formato `S01E01` es el más universal.
- El título del episodio después del `-` es opcional pero ayuda con la visualización.
- La carpeta `Season 01` (en inglés, con ceros a la izquierda) es requerida por Plex.

## Animes

CineRename trata los animes como series de TV por defecto. Casos especiales:

- **Numeración absoluta** (episodios del 1 al N sin temporada) → CineRename puede convertir a `S01E01..S01EN` según tu preset.
- **Servidores solo de anime** como Stash o Jellyfin con el plugin AniDB → un preset específico `anidb` está disponible (títulos japoneses, IDs de AniDB).

## Configurar Plex

1. En Plex, crea dos bibliotecas separadas: **Películas** y **Series**.
2. Apúntalas a las carpetas que utilizas como destino (`organize --to`).
3. Activa el agente **Plex Movie / Plex TV Series** (los otros no soportan las `{edition-...}`).
4. Ejecuta un escaneo.

::: tip Si Plex no reconoce tus archivos
Comprueba que:
1. El título + año coincidan con TheTVDB / TMDB.
2. La estructura de carpetas sea correcta (una carpeta por película, subcarpetas `Season XX` para las series).
3. No se hayan eliminado caracteres extraños (ej. `:` se reemplaza por `-` automáticamente).
:::

## Configurar Jellyfin

Idéntico a Plex, con algunos matices:

- Jellyfin obtiene los datos (scrapea) con **TheTVDB** por defecto (en lugar de TMDB) — útil ya que CineRename también usa TheTVDB.
- El escaneo en tiempo real se puede activar vía `Library → Real-time monitoring`.

## Configurar Emby

Idéntico a Jellyfin (Emby y Jellyfin son forks del mismo código base histórico).

## Configurar Kodi

1. En Kodi, ve a la sección **Vídeos > Archivos**.
2. Añade tu carpeta de origen de películas o series.
3. Al configurar el scraper (Proveedor de información):
   - Para las **Películas**: Elige *The Movie Database Python* o *Local information only* si usas NFOs.
   - Para las **Series**: Elige *TheTVDB* (recomendado ya que CineRename utiliza los identificadores de TVDB por defecto).
4. Para las películas, si utilizas el preset por defecto de CineRename (una película por carpeta), asegúrate de activar la opción **"Las películas están en carpetas separadas"**.
5. Valida y actualiza la biblioteca.

## ¿Qué hacer si falla el reconocimiento?

1. Renombra usando **Studio** en lugar del modo silencioso de la CLI — verás las coincidencias dudosas.
2. Fuerza una coincidencia diferente si tienes dudas (título similar a otro).
3. Añade el **ID de TVDB / TMDB** explícitamente en el nombre de la carpeta:
   - Plex: `Mi Pelicula (2023) {tmdb-12345}` o `{tvdb-12345}`
   - Jellyfin: `Mi Pelicula (2023) [tmdbid-12345]` o `[tvdbid-12345]`
   *(Nota: CineRename consulta TheTVDB/TVmaze para su propio motor interno, pero preserva y transfiere las etiquetas del tipo `{tmdb-...}` introducidas manualmente para forzar el emparejamiento por parte de Plex/Jellyfin).*
4. Si el problema persiste, haz el Plex Dance (sacar el archivo de la biblioteca, escanear, volver a ponerlo, volver a escanear).
