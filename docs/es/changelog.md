# Notas de la versión

Esta página resume los cambios importantes de CineRename. Para la última versión, descárgala desde la página principal.

## En progreso — `v0.2`

::: tip Estas características están disponibles en la rama principal. Una versión oficial seguirá tan pronto como las pruebas E2E estén en verde.
:::

### Nuevas características principales (paridad con FileBot)

- 👁️ **Visor de subtítulos** — visualización de SRT / VTT cue a cue, búsqueda de texto, integrado en el Studio de Subtítulos
- ☁️ **Subida a OpenSubtitles** — publicación de un subtítulo local desde la app (requiere una cuenta de tester, ver [Subtítulos](/es/subtitles))
- 💿 **Disc-rip linear pair** — emparejamiento automático de `VOB` / `M2TS` / `BDMV` con los episodios de una temporada de serie
- 🔐 **Verificación de manifiesto de checksums** — relectura de un `.sfv` / `.md5` / `.sha1` / `.sha256` y marcado de archivos alterados/faltantes
- 📅 **Exportación de lista de episodios** — exportar la planificación completa de una serie en CSV / TSV / JSON
- 👁️ **Carpetas vigiladas** — auto-importación cuando llegan nuevos archivos a una carpeta
- 🛠️ **Templates JavaScript** — motor QuickJS integrado para patrones avanzados (ternarios, regex, closures — equivalente directo al Groovy de FileBot)
- 🗄️ **Builds NAS** — disponibles para `linux-x86_64` y `linux-aarch64` (Synology / QNAP)

### Mejoras anteriores de la rama

- ✅ Módulo **Subtítulos** OpenSubtitles
- ✅ Módulo **Duplicados** multi-calidad
- ✅ Modo **Automático** pipeline completo
- ✅ Menú contextual nativo (clic derecho) en los duplicados: abrir ubicación, reproducir video, forzar eliminación
- ✅ Virtualización de las listas de Svelte 5 (rendimiento en grandes volúmenes)
- ✅ Refactorización de errores con códigos de traducción
- ✅ Componentes `PreviewEntryRow` e `HistoryEntryRow` extraídos
- ✅ Presets **Plex / Kodi / Jellyfin / Emby** listos para usar
- ✅ Modo de coincidencia **oportunista** para nombres de archivo con mucho ruido
- ✅ Operaciones de archivo: **Move / Copy / Hardlink / Symlink**
- ✅ Importador de **formato FileBot** (conversor token-a-token)
- ✅ Checksums: **CRC32 / MD5 / SHA-1 / SHA-256** con manifiesto sidecar

## v0.1.0 — Primera beta

- 🎬 **Studio** — renombrado con vista previa Antes / Después
- 📝 Reconocimiento de películas / series / animes vía TheTVDB y TVmaze
- ⏳ **Historial** con undo en un solo clic
- 🛠️ Presets de nombrado Plex / Jellyfin / Emby / Kodi
- 🌍 Interfaz multilingüe ES / EN / FR
- 💻 CLI inicial: `preview`, `rename`, `organize`

## Próxima hoja de ruta

| Versión | Qué está planeado |
| --- | --- |
| **v0.3** | Sincronización en la nube de reglas de nombrado entre dispositivos |
| **v0.4** | Conector nativo Plex / Jellyfin (desencadenar un reescaneo después del renombrado) |
| **v0.5** | Auto-update y actualizaciones diferenciales |
| **Más adelante** | Detección de múltiples ediciones (Director's Cut, Extended), soporte para bases AniDB para animes |

## Convenciones de versionado

CineRename sigue [SemVer](https://semver.org/) :

- **Major** (`x.0.0`) — cambios incompatibles con versiones anteriores
- **Minor** (`0.x.0`) — nuevas características retro-compatibles
- **Patch** (`0.0.x`) — correcciones de errores únicamente

Mientras la versión esté en `0.x.x`, la API (comandos de la CLI, formato de la base SQLite) puede evolucionar. A partir de `1.0.0`, la estabilidad estará garantizada.

## Historial de la base de datos SQLite

Con cada migración de la base de datos interna, CineRename realiza automáticamente la migración al iniciarse. No se requiere intervención manual — el historial de tus operaciones se conserva entre versiones.

::: warning Downgrade
Volver a una versión anterior después de haber iniciado una versión más reciente **no** está garantizado: la base de datos puede estar en un esquema futuro que la versión antigua no reconoce. Haz una copia de seguridad de `~/Library/Application Support/CineRename/cinerename.sqlite` antes de un downgrade.
:::
