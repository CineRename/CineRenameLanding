# Checksums

CineRename puede calcular y verificar huellas criptográficas de tus archivos — útil para detectar corrupción de disco, validar una descarga o garantizar la integridad de un archivo de la biblioteca.

## Calcular checksums

En el Studio, selecciona una o más entradas y luego haz clic en **Calcular checksums** (barra de herramientas). El diálogo ofrece cuatro algoritmos:

| Algoritmo | Velocidad | Robustez | Uso típico |
| :--- | :--- | :--- | :--- |
| **CRC32** | ⚡⚡⚡ | Baja | Detección de errores básica (manifiestos `.sfv` heredados) |
| **MD5** | ⚡⚡ | Media | Compatibilidad con `md5sum`, torrents antiguos |
| **SHA-1** | ⚡⚡ | Buena | Compatible con `sha1sum`, repositorios Git |
| **SHA-256** | ⚡ | Excelente | Opción recomendada para archivos a largo plazo |

Las huellas se calculan **en paralelo** (rayon) y se muestran en la lista. Cada línea muestra un botón **Copiar** para recuperar la huella en el portapapeles.

## Exportar un manifiesto

Una vez calculadas las huellas, **Save manifest…** escribe un archivo sidecar junto a tus medios:

| Algoritmo | Formato | Compatible con |
| :--- | :--- | :--- |
| CRC32 | `.sfv` | `cksfv`, FileBot, scene release tools |
| MD5 | `.md5` | `md5sum -c` (Linux), HashCheck (Windows) |
| SHA-1 | `.sha1` | `sha1sum -c` |
| SHA-256 | `.sha256` | `sha256sum -c` |

El manifiesto almacena las rutas **relativas** a la carpeta donde se guarda, lo que lo hace portable.

## Verificar un manifiesto

El botón **Verificar un manifiesto…** en el mismo diálogo lee un manifiesto existente y compara las huellas con los archivos actuales:

1. Elige el archivo de manifiesto (`.sfv`, `.md5`, `.sha1`, `.sha256`)
2. El algoritmo se **infiere automáticamente** desde la extensión
3. CineRename hace hash a cada archivo referenciado y lo compara con las huellas almacenadas
4. Tres estados posibles:
   - ✅ **OK** — huella conforme
   - ❌ **Alterado** — la huella calculada difiere de la almacenada (corrupción, modificación involuntaria)
   - ⚠️ **Faltante** — el archivo referenciado ya no existe

El resumen en la parte superior del diálogo indica `N matched / M mismatched / K missing`.

## Casos de uso

- **Archivo a largo plazo**: generar un manifiesto SHA-256 por carpeta de temporada, y luego verificar cada 6 meses para detectar el *bit rot*.
- **Validación post-descarga**: si tu fuente proporciona un `.sfv` o un `.md5`, verifica que ningún archivo se haya corrompido durante la transferencia.
- **Auditoría de biblioteca**: antes de una mudanza de disco o migración de NAS, toma una instantánea de toda la biblioteca en SHA-256 y luego vuelve a verificar en el nuevo destino.

## Rendimiento

En un SSD moderno, la lectura es el cuello de botella — calcula:

- ~500 MB/s para SHA-256 (un solo hilo)
- ~1.5 GB/s para MD5
- ~2 GB/s para CRC32

CineRename utiliza `rayon` para procesar varios archivos **en paralelo**, por lo que un lote de 10 archivos saturará el disco, no la CPU. En HDD, prevé un tiempo proporcional al tamaño total.
