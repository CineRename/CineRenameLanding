# Inicio rápido

Esta página te acompaña en tu primer renombrado. Calcula unos **5 minutos** para procesar una carpeta de 100 episodios.

## Requisitos previos

- CineRename instalado ([Instalación](/es/installation))
- Una carpeta que contenga archivos de video (películas, episodios de series o animes)
- Una conexión a internet para consultar TheTVDB / TVmaze (los archivos nunca se envían, solo salen las consultas de metadatos)

## 1. Iniciar la app y abrir Studio

Al iniciar, CineRename abre la pantalla **Studio**. Aquí es donde empieza todo.

<img src="/assets/img/screen-studio.png" alt="Studio CineRename">

::: info Studio = sandbox segura
Ningún archivo se modifica hasta que lo valides. Todo lo que sucede en el Studio es una **vista previa**.
:::

::: tip Cero Riesgos: La máquina del tiempo
Incluso después de la validación, la pestaña **Historial** te permite deshacer cualquier operación con un solo clic. ¿Cometiste un error de formato? Haz clic en Deshacer y tus archivos recuperarán su nombre original al instante.
:::

## 2. Arrastrar y soltar tus archivos

Tienes tres opciones:

- **Arrastrar y soltar** una carpeta entera (o varios archivos) directamente en la ventana de Studio.
- Hacer clic en **Añadir archivos** o **Añadir carpetas**.
- Arrastrar un **archivo ZIP / RAR**: CineRename leerá su contenido sin extraerlo.

CineRename detecta automáticamente el tipo de cada archivo:
- 🎬 **Película** — consulta TheTVDB para el título oficial y el año.
- 📺 **Episodio de serie** — detecta temporada/episodio, consulta TVmaze.
- 🎌 **Anime** — utiliza una lógica específica (títulos japoneses, numeración por temporada a veces ausente).

## 3. Comprobar la vista previa Antes / Después

Cada archivo aparece en la lista con:

| Antes | Después |
| --- | --- |
| `Mi.Pelicula.2023.1080p.BluRay.x264-GROUP.mkv` | `Mi Pelicula (2023).mkv` |

Haz clic en cualquier fila para ver los detalles o modificar manualmente.

::: tip Elegir la coincidencia correcta
Si CineRename duda entre varios resultados, se mostrará un selector. Selecciona la película/episodio correcto y el renderizado se actualizará al instante.
:::

## 4. Configurar el formato (opcional)

Antes de validar, puedes elegir un **preset de nombrado**:

- **Plex** (por defecto) — `Series Name (Year)/Season 01/Series Name - S01E01 - Episode Title.mkv`
- **Jellyfin** — convención idéntica a Plex con algunos ajustes
- **Emby** — también muy similar
- **Kodi** — variantes para XBMC/Kodi
- **Personalizado** — edita el pattern en **Ajustes → Presets**.

## 5. Validar el renombrado

Cuando estés satisfecho, haz clic en **Renombrar**. CineRename:

1. Pide confirmación (ergonomía sin arrepentimientos)
2. Renombra todos los archivos en paralelo
3. Muestra un resumen
4. Registra la operación en el **Historial** (recuperable indefinidamente)

## 6. ¿Y después?

- Para añadir subtítulos automáticamente → [Módulo de Subtítulos](/es/subtitles)
- Para limpiar las copias múltiples → [Módulo de Duplicados](/es/duplicates)
- Para deshacer o revisar → [Historial & Undo](/es/history)
- Para automatizar una carpeta entera → [Modo automático](/es/auto-mode)
- Para usar scripts en un NAS → [CLI](/es/cli)

::: tip Ir más allá
Si administras un Plex / Jellyfin, lee [Plex / Jellyfin / Emby](/es/media-servers) para calibrar los presets según tu servidor.
:::
