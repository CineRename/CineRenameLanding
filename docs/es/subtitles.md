# Subtítulos

CineRename integra un módulo dedicado a la **búsqueda y descarga automática de subtítulos** a través de [OpenSubtitles](https://www.opensubtitles.com/).

## Para qué sirve

### Visor integrado

Antes de descargar, el botón **Mostrar** abre un reproductor de texto integrado.
Puedes comprobar la sincronización, leer las líneas y usar la barra de búsqueda para encontrar una palabra clave específica.

![Visor de subtítulos](/assets/img/subtitle-visualizer.png)

## Opciones de nombrado

1. **Hash de video** — CineRename calcula la huella estándar de OpenSubtitles (`OSDb hash`) en los primeros y últimos MB del archivo.
2. **Búsqueda por hash + fallback a metadatos** — si no se encuentra ningún subtítulo mediante el hash, CineRename recurre a una búsqueda por título, temporada y episodio.
3. **Descarga** — recupera los archivos correspondientes a tu idioma preferido.
4. **Nombrado Plex-friendly** — `Mi Pelicula (2023).es.srt` junto al `.mkv`, lo que permite a Plex / Jellyfin adjuntarlos automáticamente.

## Configuración

En **Ajustes → Subtítulos**:

- **Idioma preferido** — `es`, `en`, `fr`, `ja`… (códigos ISO 639-1)
- **Idiomas de respaldo** — si no se encuentra el principal
- **Personas con discapacidad auditiva (SDH)** — incluir o no los subtítulos SDH
- **Límite por archivo** — descargar solo un `.srt` o varias versiones

## Clave API de OpenSubtitles

CineRename incluye una clave API por defecto, suficiente para un uso normal. Para volúmenes mayores o para obtener una cuota dedicada:

1. Crea una cuenta en [OpenSubtitles](https://www.opensubtitles.com/).
2. Obtén tu clave API personal.
3. Introdúcela en **Ajustes → Proveedores → OpenSubtitles**, o a través de la variable de entorno `CINERENAME_OPENSUBTITLES_API_KEY`.

Ver [Claves API de proveedores](/es/providers) para la resolución completa.

## Flujo de trabajo recomendado

1. Renombra primero los videos con el **Studio** (títulos oficiales = mejores coincidencias en OpenSubtitles).
2. Ejecuta el módulo **Subtítulos** en la misma carpeta.
3. Inicia Plex / Jellyfin → todos los subtítulos ya están bien nombrados y reconocidos.

## Visor de subtítulos integrado

Cada subtítulo local listado en el Studio de Subtítulos muestra un botón **Visualizar**. Se abre una ventana que:

- Analiza el archivo `.srt` o `.vtt` en el lado de Rust (UTF-8 + BOM, fallback a Latin-1)
- Elimina el marcado (`<i>`, `<b>`, `{\an8}`) para una visualización limpia
- Muestra las líneas de diálogo con sus marcas de tiempo (`HH:MM:SS.mmm → HH:MM:SS.mmm`)
- Permite filtrar texto en tiempo real (útil para comprobar que una línea concreta está presente)
- Anuncia la duración total y el número de líneas analizadas

Práctico para comprobar que un subtítulo no está desincronizado o truncado antes de desplegarlo en toda la biblioteca.

## Subida de un subtítulo local a OpenSubtitles

Si tienes un subtítulo que has vuelto a traducir o resincronizado, puedes compartirlo directamente con la comunidad:

1. En el Studio de Subtítulos, haz clic en el botón **Enviar** junto a un subtítulo local
2. Rellena el **código de idioma** (ISO 639-1: `es`, `en`, `fr`…), la marca para **discapacidad auditiva**, el nombre de la **release** y un posible comentario para la moderación
3. Valida — la app se conecta a OpenSubtitles (login de Bearer token), codifica el archivo en base64 y hace un POST en `/api/v1/upload`

::: warning Cuenta de OpenSubtitles requerida
La subida requiere una **clave API + cuenta de usuario** (login + password) en **Ajustes → Proveedores → OpenSubtitles**. La clave API incluida por defecto no es suficiente — necesitas una cuenta que haya aceptado los términos de colaborador de OpenSubtitles.
:::

Cuando la subida tiene éxito, CineRename devuelve la URL pública de la página del subtítulo (sobre la que se puede hacer clic para abrirla en el navegador).

## Limitaciones conocidas

- Los **subtítulos forzados** no se distinguen automáticamente. A veces será necesario renombrarlos a `.forced.srt` para Plex.
- Los **animes poco conocidos** a veces tienen pocas o ninguna coincidencia. En este caso, OpenSubtitles recurre a una búsqueda externa (ej. Anidb) — por el momento no cubierto por CineRename.
- Los **subtítulos integrados** en el `.mkv` no se extraen; CineRename solo añade `.srt` externos.
