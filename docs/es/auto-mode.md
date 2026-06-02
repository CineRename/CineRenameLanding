# Modo automático

El **modo automático** encadena en pipeline las funciones principales de CineRename:

```
Carpeta de origen  →  renombrado  →  subtítulos  →  movimiento  →  biblioteca final
```

Ideal para procesar una carpeta de descargas sin intervención manual.

## A quién va dirigido

- **Usuarios de Plex / Jellyfin** que quieren que los nuevos archivos aterricen automáticamente bien nombrados y con subtítulos.
- **Administradores de NAS** que usan scripts de post-procesamiento de Sonarr / Radarr.
- **Usuarios de Seedbox** que transfieren descargas a una biblioteca remota.

## Configuración

En **Ajustes → Modo automático**:

| Opción | Descripción |
| --- | --- |
| **Carpeta de origen** | De dónde vienen los archivos a procesar (ej. `~/Downloads/Plex`) |
| **Biblioteca de películas** | Destino final de las películas (ej. `/media/Plex/Films`) |
| **Biblioteca de series** | Destino final de las series (ej. `/media/Plex/Séries`) |
| **Biblioteca de animes** | Destino final de los animes (separada si lo deseas) |
| **Preset de nombrado** | Plex / Jellyfin / Emby / Personalizado |
| **Subtítulos** | Activar / desactivar, idioma preferido |
| **Duplicados** | Si un archivo de mejor calidad ya existe en la biblioteca, acción a tomar (`reemplazar` / `guardar ambos` / `ignorar`) |
| **En caso de conflicto** | Si el destino ya existe: `skip` / `overwrite` / `keep both` |

## Iniciar el pipeline

Tres formas:

1. **Desde Studio** — botón **Iniciar el pipeline automático** en los archivos cargados.
2. **Desde el CLI** — `cinerename auto /ruta --to /Plex/...` (ver [CLI](/es/cli)).
3. **En segundo plano** — opción **Vigilar la carpeta de origen**: CineRename vigila la carpeta y se activa automáticamente cada vez que detecta un nuevo archivo.

## Seguridad

El modo automático respeta las mismas garantías que el Studio:

- **Vista previa registrada** — cada acción se anuncia en la consola / historial antes de su ejecución.
- **Sin sobreescritura** por defecto — el modo `keep both` se selecciona si no se especifica nada.
- **Cancelación posible** — cada operación se registra individualmente en el [Historial](/es/history), por lo que se puede deshacer.

::: warning Vigilancia y flujos de trabajo de torrents
Si activas la vigilancia de una carpeta donde los torrents escriben durante la descarga (`*.part`, `.!ut`), filtra solo por la extensión final. De lo contrario, CineRename puede intentar procesar un archivo incompleto.
:::

## Ejemplos de escenarios

### Escenario 1 — Transferencia de Seedbox a NAS

1. `rsync` transfiere `seedbox:downloads/` a `/mnt/nas/incoming/`
2. CineRename vigila `/mnt/nas/incoming/`
3. Pipeline automático:
   - renombra
   - descarga subtítulos en ES
   - mueve a `/mnt/nas/Plex/Films` o `/mnt/nas/Plex/Séries`
4. Plex escanea `/mnt/nas/Plex/` → contenido reconocido al instante

### Escenario 2 — Post-proceso Sonarr

1. Sonarr descarga un episodio
2. Al finalizar, Sonarr llama a un script `post-process.sh`
3. Este script ejecuta `cinerename auto $sonarr_episodefile_path --to /Plex/Séries --subs es`
4. No es necesaria ninguna acción manual

### Escenario 3 — Mac familiar

1. Un miembro de la familia arrastra una carpeta a `~/Movies/Inbox`
2. CineRename para Mac, ejecutándose en segundo plano, vigila esta carpeta
3. El pipeline automático mueve los archivos limpios a `~/Movies/Plex/...`

## Logs

Todos los eventos del pipeline se escriben en:

| OS | Ruta |
| --- | --- |
| Windows | `%APPDATA%\CineRename\logs\auto-pipeline.log` |
| macOS | `~/Library/Application Support/CineRename/logs/auto-pipeline.log` |
| Linux | `~/.config/CineRename/logs/auto-pipeline.log` |

Nivel de log configurable en **Ajustes → Avanzado → Verbosidad**.
