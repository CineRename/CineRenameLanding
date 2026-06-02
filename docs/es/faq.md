# Preguntas Frecuentes (FAQ)

## ¿En qué sistemas funciona CineRename?

CineRename es una aplicación nativa para **Windows 10/11**, **macOS 11+** y **Linux** (vía AppImage). El motor está escrito en Rust con Tauri v2, por lo que el rendimiento es equivalente a nativo en los tres sistemas operativos.

## ¿Mis archivos salen de mi ordenador?

**No.** Todo el procesamiento (análisis, renombrado, cálculo de hashes, movimiento) se realiza localmente. Las únicas peticiones de red son a **bases de datos de metadatos públicas** (TheTVDB, TVmaze, OpenSubtitles) y solo contienen títulos o hashes — nunca los archivos en sí.

## ¿Puedo deshacer un renombrado accidental?

Sí. La pestaña de [Historial](/es/history) mantiene un registro de cada operación y te permite deshacer con un solo clic, incluso varios días después.

## ¿Es CineRename compatible con Plex / Jellyfin / Emby?

Sí. CineRename produce nombres y una estructura de carpetas conformes a estos servidores. Ver [Plex / Jellyfin / Emby](/es/media-servers) para más detalles.

## ¿CineRename soporta archivos ZIP / RAR?

Sí. CineRename puede leer el interior de archivos ZIP y RAR para identificar el contenido. Según tus ajustes, puede:

- Extraer automáticamente los videos antes de procesarlos,
- Procesar el contenido sin extracción (lectura indexada).

*(Nota: Los archivos protegidos con contraseña no están soportados. Además, extraer archivos muy grandes puede llevar tiempo y requerir temporalmente el doble de espacio en disco).*

## ¿Hay una CLI disponible?

Sí. Consulta la página de la [CLI](/es/cli). Disponible en los tres sistemas operativos, es perfecta para automatizar con Sonarr / Radarr / cron / scripts NAS.

## ¿Cuál es la diferencia entre Gratis y Pro?

| Funcionalidad | Gratis | Pro |
| --- | --- | --- |
| Studio (renombrado) | ✅ 2 archivos / día | ✅ ilimitado |
| Vista previa Antes / Después | ✅ | ✅ |
| Emparejamiento básico de metadatos | ✅ | ✅ |
| Subtítulos de OpenSubtitles | ✅ 2 archivos / día | ✅ ilimitado |
| Duplicados multi-calidad | ❌ | ✅ |
| Modo automático pipeline | ❌ | ✅ |
| Sincronización en la nube de reglas | ❌ | ✅ |
| Soporte prioritario | ❌ | ✅ |
| CLI (todos los comandos) | ⚠️ limitada | ✅ |

Visita la página de [Precios](/es/pro) para obtener detalles sobre la licencia Pro.

## ¿Puedo seguir usando CineRename gratis?

Sí. La versión gratuita **no tiene límite de tiempo**. Puedes usarla indefinidamente para renombrar o añadir subtítulos a **un máximo de 2 archivos por día**. Las funciones completas e ilimitadas requieren activar una licencia Pro.

## ¿Cómo funciona la búsqueda de duplicados?

CineRename detecta las múltiples copias de una misma película/episodio basándose en:

- título + año (películas) o serie + temporada + episodio (series)
- resolución, códec, fuente, bitrate, audio, tamaño para puntuar la calidad

Te propone conservar la mejor versión. No hay eliminación sin tu validación. Ver [Duplicados](/es/duplicates).

## ¿Puede CineRename funcionar 100% offline?

Sí y no. La aplicación en sí (la interfaz, el análisis inteligente de nombres vía QuickJS, el historial, la limpieza de duplicados locales) funciona perfectamente sin conexión a internet.

Sin embargo, las funciones de emparejamiento (obtención de los títulos oficiales reales y números de episodios) requieren consultar TheTVDB o TVmaze. Sin internet, CineRename limpiará el nombre del archivo (eliminando etiquetas de grupos de release, etc.) a través de su motor interno, pero no podrá garantizar el título oficial completo. La descarga de subtítulos es, por supuesto, imposible sin conexión.

## ¿Qué pasa si TheTVDB / OpenSubtitles se caen?

CineRename sigue funcionando:
- Los **renombrados ya previsualizados** en Studio se pueden validar (los metadatos están en caché).
- Los **nuevos archivos** muestran una advertencia en caso de resultados no encontrados — aún puedes renombrar manualmente.
- El **modo automático** registra el error en el log y reintenta con los archivos fallidos cuando el proveedor vuelve a estar en línea.

## He encontrado un error. ¿Cómo os lo reporto?

Escribe a [cinerename@gmail.com](mailto:cinerename@gmail.com). Si es posible, adjunta:

- Tu sistema operativo y la versión de CineRename (`Ayuda → Acerca de`)
- Un ejemplo de nombre de archivo que causa el problema
- El log (`Ajustes → Avanzado → Abrir la carpeta de logs`)

## ¿Cómo puedo contribuir?

- **Reportando errores** o solicitando funciones por correo electrónico
- **Sugiriendo mejoras** en los presets de renombrado
- **Traduciendo la interfaz** a un nuevo idioma
- **Comprando una licencia Pro**, que apoya directamente el desarrollo
