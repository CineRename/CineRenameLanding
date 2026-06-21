# Notas de la versión

Esta página resume los cambios importantes de CineRename. Para la última versión, descárgala desde la página principal.

## v0.5.0 — Versión inicial

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

- 🎬 **Studio** — renombrado con vista previa Antes / Después
- 📝 Reconocimiento de películas / series / animes vía TheTVDB y TVmaze
- ⏳ **Historial** con undo en un solo clic
- 🛠️ Presets de nombrado Plex / Jellyfin / Emby / Kodi
- 🌍 Interfaz multilingüe ES / EN / FR
- 💻 CLI inicial: `preview`, `rename`, `organize`

## Próxima hoja de ruta

| Versión | Qué está planeado |
| --- | --- |
| **v0.6** | Empaquetado de releases y canales de actualización directa |
| **v0.7** | Publicación en stores / package managers (Microsoft Store, Flatpak, Snap, winget, Homebrew) |
| **v0.8** | Pulido del matching de metadatos y subtítulos |
| **Más adelante** | Detección de múltiples ediciones (Director's Cut, Extended), soporte anime más avanzado |
