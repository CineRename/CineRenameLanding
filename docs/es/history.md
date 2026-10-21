---
description: "Historial y Deshacer en CineRename: revierte cualquier lote de renombramiento en 1 clic con registros detallados y seguridad total."
---

# Historial y deshacer

La pestaña **Historial** registra los lotes de renombrado e indica si se pueden deshacer.

## Qué se registra

Los lotes de Studio, la CLI y el pipeline automático incluyen fechas, estado,
rutas originales y finales, detalles de las operaciones y disponibilidad para
deshacer. El historial se guarda en la base SQLite local y no se sincroniza
automáticamente entre dispositivos.

## Deshacer un lote

Abre un lote terminado y comprueba si **Deshacer** está disponible. Tras tu
confirmación, CineRename comprueba que los archivos actuales coincidan con los
registrados y que se puedan restaurar los destinos originales.

- El renombrado y el traslado restauran los nombres y las ubicaciones originales.
- Las copias y los enlaces eliminan el destino creado y conservan el archivo original.
- Al completar la anulación, el lote existente se marca como `undone` y se conserva su registro.

Las descargas independientes de subtítulos, los ajustes de tiempo y la eliminación
de duplicados son acciones separadas; el historial de renombrado no las hace
reversibles automáticamente.

## Cuándo no se puede deshacer

Un lote fallido o incompleto no se puede deshacer automáticamente. También pueden
bloquearlo archivos ausentes o modificados, una ruta original ocupada, un volumen
desmontado o una operación interrumpida que requiere recuperación. El historial
muestra el motivo y conserva el registro.

Para cambios sucesivos sobre los mismos archivos, deshaz primero los lotes más
recientes. La selección múltiple procesa los lotes sucesivamente. Usa **Ctrl/Cmd +
clic** para seleccionar lotes y **Ctrl/Cmd+A** fuera del campo de búsqueda para
seleccionar los lotes restaurables.

## Consultar y conservar el historial

El historial ofrece agrupación por fecha, búsqueda, filtros de estado y orden
cronológico. Conserva la base local para mantener los registros antiguos y sus
datos de anulación. Eliminar los datos locales de CineRename elimina también el
historial. Si lo necesitas, copia los diagnósticos desde Soporte antes de
restablecer una instalación.
