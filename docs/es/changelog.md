# Notas de la version

Esta pagina enumera las versiones de CineRename de la mas reciente a la mas antigua. Las descargas estan disponibles desde la pagina principal.

<!-- CINERENAME_RELEASE_HISTORY_START -->

## v0.5.4 - CineRename 0.5.4

Publicado el 2026-09-13.

### Cambios destacados

- Localización completa de la aplicación en español (`Español`) y chino simplificado (`简体中文`), abarcando los 24 módulos de la interfaz (previsualización, plantillas, proveedores, carpetas vigiladas, subtítulos, sumas de verificación, historial, ajustes, diálogos y errores).
- Soluciona la incompatibilidad de Landlock (`ENOSYS`) en NAS Synology (DSM) y kernels antiguos de Linux: degradación automática y segura cuando el kernel no soporta Landlock, evitando reinicios en bucle de Docker y asegurando el inicio del servidor WebUI en el puerto 8787. Se agregan los argumentos `--no-sandbox` (`--no-landlock`) y la variable `CINERENAME_DISABLE_LANDLOCK=1`.
- Soluciona el falso positivo «el archivo ya no está disponible en el disco» en recursos de red Windows (UNC) al normalizar adecuadamente los prefijos extendidos (`\\?\UNC\...` convertidos a `\\servidor\recurso\...`), asegurando la importación, exportación CSV dry-run y deshacer historial.
- Refuerzo integral del sistema de archivos: soporte de rutas largas en Windows (> 260 caracteres) mediante la API Win32 y el manifiesto `<longPathAware>`, límite estricto en nombres de archivos temporales (< 255 bytes), compatibilidad transparente con archivos en la nube (OneDrive, Dropbox) y uniones NTFS, mayor fiabilidad de renombrado en Linux sobre montajes CIFS/SMB/NFS y preservación best-effort de marcas de tiempo en NAS.
- Detección automática del idioma nativo del sistema operativo al iniciar, adaptando la interfaz de forma fluida a inglés, francés, español o chino simplificado.
- Soporte integrado de búsqueda y descarga de subtítulos en español y chino a través de OpenSubtitles y SubDL.
- Pruebas automatizadas de paridad lingüística que garantizan el 100 % de equivalencia de claves, interpolación correcta de variables y rigurosidad tipográfica en todos los idiomas admitidos.

## v0.5.3 - CineRename 0.5.3

Publicado el 2026-09-12.

### Cambios destacados

- Habilita los tokens de MediaInfo (`{resolution}`, `{source}`, `{video_codec}`, `{audio_codec}`, `{audio_language}`, `{dynamic_range}`, `{bit_depth}`) de forma nativa y permanente en todos los sistemas operativos, solucionando las limitaciones previas en Windows.
- Optimiza el editor de plantillas con acceso directo a todos los tokens técnicos, previsualización en tiempo real y unos ajustes avanzados más claros y simplificados.
- Incorpora un sistema persistente de alertas de actualización con banner superior, widget en la barra lateral e indicadores directos en la barra de estado.
- Armoniza la tipografía y coherencia lingüística en francés e inglés (espacios de no separación, apóstrofos y terminología técnica).
- Actualiza la documentación completa para la CLI portátil, el servidor headless y las instalaciones en NAS y Docker.

## v0.5.2 - CineRename 0.5.2

Publicado el 2026-09-03.

### Cambios destacados

- Hace que las carpetas vigiladas sean totalmente resistentes: los discos desconectados o rutas inaccesibles ya no bloquean la vigilancia ni la gestión de carpetas.
- Elimina definitivamente los bucles infinitos de reimportación de subtítulos en descargas manuales, Modo Automático y renombrado de archivos adjuntos.
- Mejora la ergonomía en segundo plano: la detección de nuevos archivos ya no cambia de pantalla ni cierra diálogos de revisión abiertos.
- Resuelve la carga infinita y el bloqueo de cierre en el visor de subtítulos.
- Optimiza la barra de herramientas del Studio con contadores de estado detallados y alineación perfecta de acciones por fila.
- Corrige el posicionamiento y desbordamiento de los menús desplegables de selección.
- Reduce el consumo de CPU en reposo en el coordinador de estabilidad de archivos.
- Enriquece la pestaña de carpetas vigiladas con apertura directa en el gestor de archivos nativo y edición de etiquetas personalizadas.

## v0.5.1 - CineRename 0.5.1

Publicado el 2026-09-02.

### Cambios destacados

- Hace más seguros los renombrados al mejorar la recuperación y la reversión cuando se interrumpe un movimiento, una copia o un renombrado.
- Hace más fiable el historial, para revisar acciones completadas y deshacer cambios con más tranquilidad.
- Mejora el actualizador integrado con comprobaciones de firma más estrictas y un reinicio más seguro después de instalar una actualización.
- Importante en macOS: los usuarios en 0.5.0 deben instalar 0.5.1 manualmente desde el DMG o PKG; Windows y Linux pueden seguir usando el actualizador integrado.
- Mantiene un comportamiento de renombrado coherente entre la aplicación de escritorio, la CLI, los builds NAS y los archivos Docker.
- Mejora la estabilidad diaria de la interfaz.
- Añade descargas más claras y archivos de verificación para elegir el instalador correcto y comprobarlo si hace falta.

## v0.5.0 - CineRename 0.5.0

Publicado el 2026-07-09.

### Cambios destacados

- Renombra y organiza peliculas, series y anime con una vista previa segura antes de tocar los archivos.
- Perfiles Plex, Jellyfin y Kodi listos para usar, con carpetas multimedia y formatos capaces de incluir IDs.
- Soporte de anime con numeracion absoluta, busqueda AniList/Kitsu y titulos de episodios localizados mediante TheTVDB cuando estan disponibles.
- Exportaciones dry-run, historial de renombrado y undo/rollback para trabajar bibliotecas grandes con mas confianza.
- Busqueda de subtitulos con OpenSubtitles, seleccion de idioma, vista previa, conversion y herramientas de ajuste de tiempo.
- Auditoria de biblioteca, generacion NFO, descarga de poster/fanart y archivos de metadatos para servidores multimedia.
- Carpetas vigiladas, pipeline automatico prudente, integraciones qBittorrent / Transmission / JDownloader y flujos Pre-Arr.
- CLI headless, WebUI, TUI, scheduler, archivos NAS y Docker para uso en servidores.

<!-- CINERENAME_RELEASE_HISTORY_END -->
