# Exportación de datos

CineRename no solo renombra tus archivos, también te permite exportar datos útiles en formatos estandarizados para alimentar otras herramientas (hojas de cálculo, scripts, bases de datos).

## Exportar el informe de renombrado

En **Studio**, una vez que hayas simulado o validado un renombrado, puedes hacer clic en el botón **Exportar informe** ubicado en la barra de herramientas.

El archivo generado contiene el historial exacto de las modificaciones, formateado a tu elección:

- **CSV** (Comma-Separated Values): Perfecto para abrir en Excel o Google Sheets.
- **JSON**: Ideal si deseas automatizar un script que lea el resultado del renombrado.

Cada línea de la exportación contiene:
- La ruta original absoluta (`original_path`)
- El nuevo nombre de archivo (`new_filename`)
- El estado (`renamed`, `ignored`, `conflict`)
- Los metadatos detectados (ID de TheTVDB, resolución, códec)

### Ejemplo de informe JSON

```json
[
  {
    "original_path": "/Users/kirito/Downloads/Breaking.Bad.S01E01.mkv",
    "new_filename": "Breaking Bad (2008) - S01E01 - Pilot.mkv",
    "status": "renamed",
    "metadata": {
      "tvdb_id": 81189,
      "resolution": "1080p",
      "video_codec": "x264"
    }
  }
]
```

## Exportar una lista de episodios (Planificación)

Si has cargado una serie en CineRename, el software ha recuperado la estructura completa de la serie desde TheTVDB o TVmaze (incluyendo los episodios faltantes o aún no emitidos).

Puedes exportar esta lista completa para hacer un seguimiento de tus visualizaciones o planificar tus descargas:

1. Haz clic en el icono **Opciones de la serie** (los tres puntitos) junto al nombre de la serie en el panel lateral.
2. Haz clic en **Exportar la lista de episodios**.
3. Elige el formato:
   - `CSV`
   - `TSV` (Tab-Separated Values)
   - `JSON`

La exportación incluye:
- El título de la serie
- La temporada y el número de episodio
- El título del episodio (en tu idioma preferido)
- La fecha de emisión oficial (Air Date)
- El identificador absoluto (útil para animes)

::: tip Automatización
Si usas la CLI (`cinerename`), puedes forzar una salida en JSON con el flag `--json` para recuperar todos los metadatos en la salida estándar (`stdout`), lo que equivale a una exportación automatizada.
:::
