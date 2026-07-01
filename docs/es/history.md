# Historial & Undo

Todo lo que CineRename modifica en tu disco es **rastreable** y **reversible**. La pestaña de **Historial** es tu máquina del tiempo.

## Qué se registra

Con cada operación (renombrado, movimiento, eliminación de duplicados, descarga de subtítulos), CineRename registra:

- **Fecha y hora** exactas
- **Tipo de operación** (rename / move / subtitle-fetch / duplicate-delete / auto-pipeline)
- **Antes / Después** completo (rutas de origen, rutas de destino, tamaño, hash opcional)
- **Estado** (éxito / error / cancelado)
- **Origen** (Studio / pipeline de automatización / CLI)

Los datos se almacenan localmente en una base de datos **SQLite** (a través de `rusqlite` en el lado de Rust). Ningún dato se envía a la nube.

## Pestañas del historial

- **Hoy** — operaciones del día
- **Reciente** — últimos 7 días
- **Todo** — historial completo (filtrable por fecha, por carpeta, por tipo)

## Deshacer (undo)

Selecciona una operación y haz clic en **Deshacer**. CineRename:

1. Comprueba que los archivos sigan existiendo en su destino
2. Pide confirmación
3. Restaura los nombres y las ubicaciones originales
4. Marca la operación como deshecha en el historial (con un nuevo registro de "anulación")

::: tip Anulación en cadena
Puedes deshacer varios días de modificaciones sucesivas — el historial se remonta hasta el inicio de tu instalación.
:::

## Limitaciones del undo

La anulación puede fallar si:

- Los archivos han sido **eliminados manualmente** entretanto (no están en la papelera).
- Has **renombrado manualmente** un archivo después de que CineRename lo procesara — el undo no sabe que se trata del mismo archivo.
- El **disco de origen** ya no está montado (NAS desconectado, llave USB retirada).

En estos casos, CineRename notifica el fallo y conserva el registro original como referencia.

## Selección múltiple

`Ctrl + clic` (o `Cmd + clic`) para seleccionar múltiples operaciones, y luego **Deshacer selección**. Las anulaciones se realizan en orden inverso (LIFO) para respetar las dependencias entre las operaciones.

También puedes pulsar `Ctrl+A` (o `Cmd+A` en macOS) fuera del campo de búsqueda para seleccionar o vaciar todos los lotes restaurables.

## Restablecer el historial local

La aplicación de escritorio no sincroniza el historial con la nube. Si necesitas empezar desde cero, guarda lo importante, copia diagnósticos desde **Preferencias → Soporte** si los necesitas y elimina la carpeta local de datos de CineRename de tu sistema. Eliminar el historial también elimina la posibilidad de deshacer operaciones antiguas.
