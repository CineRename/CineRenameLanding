# Duplicados

El módulo **Duplicados** escanea tu biblioteca para detectar múltiples copias de una misma película o episodio, y te ayuda a liberar espacio manteniendo solo la mejor versión.

## Cómo funciona

1. Señalas una carpeta (o varias).
2. CineRename indexa todos los archivos de video, calcula un puntaje de calidad y los agrupa por identidad de medio (título + año para películas, serie + temporada + episodio para series).
3. El resultado se muestra por **clústeres**: un clúster = varios archivos que apuntan al mismo contenido.

![Vista previa de los clústeres de duplicados](/assets/img/duplicates-clusters.png)

## El puntaje de calidad

Cada archivo recibe un puntaje basado en:

- **Resolución** — 4K > 1440p > 1080p > 720p > 480p
- **Códec** — HEVC/AV1 (eficiencia) con penalización para códecs antiguos
- **Fuente** — BluRay > WEBRip > HDTV > DVDRip
- **Bitrate** — bonificación para bitrates altos a igual resolución
- **Audio** — DTS-HD MA / TrueHD > DTS / DD+ > AC3 / AAC
- **Tamaño** — para desempatar con calidad técnica equivalente

El archivo con la puntuación más alta se marca como **A conservar**, los demás como **Candidatos a eliminación**.

::: tip Sin eliminación automática
Ningún archivo se elimina sin tu acuerdo explícito. El módulo solo hace **propuestas**.
:::

## Menú contextual

En cada línea del clúster, el **clic derecho** abre:

- **Abrir ubicación** — Finder / Explorer / Gestor de archivos nativo
- **Reproducir video** — inicia tu reproductor predeterminado
- **Forzar conservación** — marca este archivo como "a conservar" (anula la puntuación)
- **Forzar eliminación** — marca para eliminar
- **Excluir del clúster** — si CineRename ha agrupado incorrectamente

## Eliminación por lotes

Una vez que hayas tomado tus decisiones en todos los clústeres, el botón **Eliminar los marcados**:

1. Pide una última confirmación
2. Mueve los archivos a la papelera del sistema (recuperables)
3. Registra la operación en el **Historial** (para poder deshacer)

::: warning Atención para los usuarios de NAS
La eliminación pasa por la papelera del SO. Si la **Papelera de red (SMB/CIFS)** no está activada en tu Synology o QNAP, los archivos se eliminarán permanentemente. Asegúrate de activar la opción "Habilitar la papelera de reciclaje" en tu carpeta compartida de NAS antes de usar la eliminación masiva.
:::

## Buenas prácticas

- **Renombrar siempre antes** — de lo contrario, a CineRename le costará emparejar `MovieX.1080p.x264-GROUP.mkv` con `MovieX.4k.HDR.mkv` porque los nombres no se parecen.
- **Ejecutar un dry-run** primero — explora los clústeres, ajusta las excepciones y solo entonces elimina.
- **Comprobar las múltiples ediciones** — para las películas, "Director's Cut", "Extended", "Theatrical" **no** se consideran duplicados si están nombrados explícitamente.

## Limitaciones conocidas

- Para los **multi-discos** (una película cortada en `Movie - cd1.mkv` + `Movie - cd2.mkv`), CineRename los agrupa correctamente solo si se respeta la convención `cd1`/`cd2` o `part1`/`part2`.
- Para los **archivos mixtos** (zips que contienen varias versiones), primero hay que extraerlos o usar el Studio para normalizarlos.
