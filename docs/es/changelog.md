# Notas de la version

Esta pagina enumera las versiones de CineRename de la mas reciente a la mas antigua. Las descargas estan disponibles desde la pagina principal.

<!-- CINERENAME_RELEASE_HISTORY_START -->

## CineRename v0.5.9

Publicado el 2026-10-26.

### Cambios destacados

- Los archivos de los ZIP se muestran antes de que termine la importación, con un progreso más preciso de la extracción y la verificación de la caché.
- Studio utiliza la fuente y el preajuste guardados para buscar coincidencias, conservando tus elecciones al añadir archivos o actualizar las coincidencias.
- El guardado de ajustes y el acceso al llavero de macOS son más fiables, con menos solicitudes repetidas de contraseña.

## CineRename v0.5.8

Publicado el 2026-10-23.

### Cambios destacados

- Jikan / MyAnimeList se incorpora a las fuentes de anime y episodios, sin cuenta ni clave API personal. AniList, Kitsu o Jikan pueden elegirse como fuente de anime predeterminada.
- Al volver a abrir la aplicación, las carpetas vigiladas recuperan los archivos añadidos mientras estaba cerrada, con mayor fiabilidad y menos duplicados.
- El progreso de las transferencias refleja la cantidad de datos transferidos y la barra de estado muestra el nuevo nombre del archivo.
- Diversas correcciones en Studio, la navegación, la apariencia al iniciar, el guardado de ajustes y las traducciones de la interfaz.

## CineRename v0.5.7

Publicado el 2026-10-18.

### Cambios destacados

- Elija un destino guardado para los archivos seleccionados directamente en Studio, con una vista previa de la ruta y sin cambiar sus ajustes de automatización.
- Consulte las novedades traducidas sin conexión haciendo clic en la versión instalada.
- Los ajustes siguen disponibles mientras se inicializa el índice local al arrancar.

## CineRename v0.5.6

Publicado el 2026-10-16.

### Cambios destacados

- Preajustes con destinos separados para películas, series y anime.
- Progreso más preciso y mejor cancelación de transferencias de archivos grandes.
- Mejoras en la integridad de los instaladores de macOS.
- Notificaciones de actualización más claras y discretas.

## CineRename v0.5.5

Publicado el 2026-10-15.

### Cambios destacados

- **Compatibilidad NAS / SMB en macOS**: añade una alternativa cuando el volumen de red no admite el renombrado exclusivo, durante la preparación, la finalización, la recuperación y la acción de deshacer.
- **Copias a volúmenes de red**: la copia puede continuar si el destino no admite explícitamente conservar los permisos POSIX; los errores reales de acceso y de entrada/salida siguen deteniendo la operación.
- **Plantillas de nombres**: admite espacios dentro de etiquetas como `{ title }` y conserva el texto parecido a etiquetas que forma parte de los títulos.
- **Información técnica**: corrige la detección de profundidad de bits de vídeo en formatos como NV12 y en archivos que indican una profundidad bruta desconocida.
- **Sincronización de subtítulos**: corrige un desbordamiento con desplazamientos grandes y mejora la precisión de la corrección de deriva en duraciones largas.
- **Caché de archivos comprimidos**: evita fallos durante la limpieza cuando los marcadores contienen fechas fuera de rango.
- **Seguridad**: actualiza las dependencias TLS y de la interfaz y bloquea las redirecciones automáticas de los hooks y las solicitudes de actualización de Plex/Jellyfin para proteger los datos de autenticación. Configure directamente la URL final del servicio.
- **Rendimiento**: reduce las asignaciones de memoria al ordenar rutas de forma natural y generar nombres desde plantillas.
- **Estadísticas de uso**: restaura la atribución entre el sitio web y la aplicación y añade eventos de navegación entre pantallas y ajustes.

## CineRename v0.5.4

Publicado el 2026-09-13.

### Cambios destacados

- Localización completa en español y chino simplificado: traducción integral de la aplicación, detección automática del idioma del sistema y búsqueda de subtítulos dedicada.
- Compatibilidad con NAS Synology y Docker: soluciona el inicio del servidor WebUI (puerto 8787) y elimina los reinicios en bucle en kernels de Linux sin soporte Landlock.
- Recursos de red de Windows (UNC): resuelve el falso aviso «el archivo ya no está disponible en el disco» al renombrar en carpetas compartidas (\\servidor\recurso).
- Rutas largas y soporte en la nube: compatibilidad nativa con rutas de más de 260 caracteres en Windows y mayor estabilidad con carpetas sincronizadas (OneDrive, Dropbox).

## CineRename v0.5.3

Publicado el 2026-09-12.

### Cambios destacados

- Habilita los tokens de MediaInfo (`{resolution}`, `{source}`, `{video_codec}`, `{audio_codec}`, `{audio_language}`, `{dynamic_range}`, `{bit_depth}`) de forma nativa y permanente en todos los sistemas operativos, solucionando las limitaciones previas en Windows.
- Optimiza el editor de plantillas con acceso directo a todos los tokens técnicos, previsualización en tiempo real y unos ajustes avanzados más claros y simplificados.
- Incorpora un sistema persistente de alertas de actualización con banner superior, widget en la barra lateral e indicadores directos en la barra de estado.
- Armoniza la tipografía y coherencia lingüística en francés e inglés (espacios de no separación, apóstrofos y terminología técnica).
- Actualiza la documentación completa para la CLI portátil, el servidor headless y las instalaciones en NAS y Docker.

## CineRename v0.5.2

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

## CineRename v0.5.1

Publicado el 2026-09-02.

### Cambios destacados

- Hace más seguros los renombrados al mejorar la recuperación y la reversión cuando se interrumpe un movimiento, una copia o un renombrado.
- Hace más fiable el historial, para revisar acciones completadas y deshacer cambios con más tranquilidad.
- Mejora el actualizador integrado con comprobaciones de firma más estrictas y un reinicio más seguro después de instalar una actualización.
- Importante en macOS: los usuarios en 0.5.0 deben instalar 0.5.1 manualmente desde el DMG o PKG; Windows y Linux pueden seguir usando el actualizador integrado.
- Mantiene un comportamiento de renombrado coherente entre la aplicación de escritorio, la CLI, los builds NAS y los archivos Docker.
- Mejora la estabilidad diaria de la interfaz.
- Añade descargas más claras y archivos de verificación para elegir el instalador correcto y comprobarlo si hace falta.

## CineRename v0.5.0

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
