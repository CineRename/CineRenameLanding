# Línea de comandos (CLI)

CineRename expone una CLI nativa, ideal para usar scripts en flujos de trabajo de NAS, Seedbox o servidores Plex.

## Instalación

En **Windows / macOS / Linux**, la CLI se incluye con la aplicación principal. Se puede invocar mediante el comando `cinerename` (añadido al PATH durante la instalación).

### Builds NAS (Synology / QNAP / Linux headless)

Producimos dos tarballs de Linux para los servidores NAS:

| Arquitectura | Artefacto | Triple |
| :--- | :--- | :--- |
| Intel / AMD 64-bit | `cinerename-linux-x86_64` | `x86_64-unknown-linux-gnu` |
| ARM 64-bit | `cinerename-linux-aarch64` | `aarch64-unknown-linux-gnu` (cross) |

Descarga el tarball correspondiente a tu NAS, extráelo en `/volume1/@appstore/cinerename/`, e invoca el binario con los flags a continuación. Para una vigilancia continua en NAS, prefiere **cron** con la CLI en lugar de la función Carpetas vigiladas que requiere la GUI.

Para cualquier pregunta sobre la instalación en NAS, contacta con el soporte.

### Comprobar la versión

```bash
cinerename --version
```

### Ayuda

```bash
cinerename --help
cinerename rename --help
```

## Comandos principales

| Comando | Acción |
| --- | --- |
| `cinerename preview <ruta>` | Muestra la vista previa Antes / Después sin modificar nada |
| `cinerename rename <ruta>` | Renombra en el lugar |
| `cinerename organize <ruta> --to <bib>` | Renombra + mueve a una biblioteca |
| `cinerename auto <ruta> --to <bib>` | Pipeline completo: renombra + subtítulos + mueve |
| `cinerename subs <ruta>` | Descarga los subtítulos para los archivos de la carpeta |
| `cinerename duplicates <ruta>` | Muestra / limpia los duplicados |
| `cinerename history` | Enumera las operaciones recientes y sus IDs |
| `cinerename undo <id>` | Deshace una operación del historial |

### Ejemplos

```bash
# Previsualizar un renombrado sin tocar nada
cinerename preview /ruta/al/video.mkv

# Renombrar en el lugar toda una carpeta
cinerename rename /ruta/a/la/carpeta

# Renombrar y mover a la biblioteca Plex/Jellyfin
cinerename organize /ruta/a/las/descargas --to /Plex/Series

# Pipeline completo: renombrado + subtítulos ES + movimiento
cinerename auto /ruta/a/las/descargas --to /Plex/Series --subs es

# Descargar solo los subtítulos
cinerename subs /Plex/Series --lang es,en

# Listar los duplicados sin eliminarlos
cinerename duplicates /Plex --dry-run

# Encontrar el ID de una operación reciente para deshacerla
cinerename history --limit 5
cinerename undo 12345
```

## Flags útiles

| Flag | Descripción |
| --- | --- |
| `--dry-run` | Simular todo, no escribir nada |
| `--preset <nombre>` | Fuerza un preset (`plex`, `jellyfin`, `emby`, `kodi`, `custom`) |
| `--subs <codigo,codigo>` | Idiomas de los subtítulos (separados por `,`) |
| `--on-conflict <skip\|overwrite\|both>` | Estrategia en caso de conflicto |
| `--quiet` | Salida mínima (útil en scripts) |
| `--verbose` | Salida detallada para debug |
| `--json` | Salida legible por máquina |

## Códigos de salida

- `0` — éxito
- `1` — error genérico
- `2` — argumento inválido / preset desconocido
- `3` — conflicto no resuelto (solucionar con `--on-conflict`)
- `4` — acceso al archivo denegado / bloqueo
- `5` — proveedor externo inalcanzable (TheTVDB / OpenSubtitles caídos)

Útiles para encadenar: `cinerename auto ... && notify-send "Pipeline OK"`.

## Integración Sonarr / Radarr

En **Sonarr → Settings → Connect → Custom Scripts** :

```bash
#!/usr/bin/env bash
set -e
[ "$sonarr_eventtype" = "Download" ] || exit 0
cinerename auto "$sonarr_episodefile_path" --to /Plex/Series --subs es --quiet
```

Adapta para Radarr usando `$radarr_moviefile_path`.

## Integración Seedbox / NAS

Ejemplo de cron para procesar una carpeta de llegada cada 5 minutos:

```txt
*/5 * * * * /usr/local/bin/cinerename auto /mnt/incoming --to /mnt/Plex --subs es --quiet --on-conflict both
```

## Variables de entorno

| Variable | Efecto |
| --- | --- |
| `CINERENAME_TVDB_API_KEY` | Clave API de TheTVDB personalizada |
| `CINERENAME_OPENSUBTITLES_API_KEY` | Clave API de OpenSubtitles personalizada |
| `CINERENAME_CONFIG_DIR` | Sobrescribe la carpeta de configuración |
| `CINERENAME_LOG_LEVEL` | `error` / `warn` / `info` / `debug` / `trace` |

Ver [Claves API de proveedores](/es/providers) para la resolución completa.
