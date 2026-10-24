---
layout: home

hero:
  name: CineRename
  text: Documentación
  tagline: Renombra y organiza tus películas, series y animes — totalmente en tu equipo.
  image:
    src: /favicon.svg
    alt: CineRename
  actions:
    - theme: brand
      text: Inicio rápido
      link: /es/getting-started
    - theme: alt
      text: Descargar
      link: https://cinerename.app/es/download


features:
  - icon: 🎬
    title: Studio
    details: Renombra de forma masiva tus películas, series y animes con una vista previa segura antes/después. Ningún archivo se modifica hasta que lo valides.
    link: /es/studio
  - icon: 📝
    title: Subtítulos
    details: Búsqueda en OpenSubtitles, visor de SRT/VTT integrado y subida de tus subtítulos locales a la comunidad.
    link: /es/subtitles
  - icon: 👯
    title: Duplicados
    details: Detección de copias en múltiples calidades (1080p, 4K, etc.). Sugerencia de la mejor versión y eliminación directa mediante el menú contextual.
    link: /es/duplicates
  - icon: ⏳
    title: Historial & Undo
    details: Cada modificación se registra. Deshaz cualquier renombrado con un solo clic, incluso varios días después.
    link: /es/history
  - icon: ⚡
    title: Automatización
    details: Pipeline completo — renombrado, subtítulos y traslado a la biblioteca final. Compatible con Plex, Jellyfin, Emby.
    link: /es/auto-mode
  - icon: 👁️
    title: Carpetas vigiladas
    details: Apunta CineRename a tu carpeta de descargas — cualquier video nuevo se importa automáticamente a Studio.
    link: /es/watch-folders
  - icon: 🔐
    title: Checksums
    details: Cálculo de CRC32 / MD5 / SHA-1 / SHA-256 con manifiesto sidecar, y verificación para detectar el bit rot.
    link: /es/checksums
  - icon: 📊
    title: Exportación de datos
    details: Exporta tus planes de episodios faltantes o tus informes de renombrado en JSON y CSV.
    link: /es/export
  - icon: 🛠️
    title: Templates JavaScript
    details: Motor QuickJS integrado para patrones avanzados — ternarios, regex, closures y reglas de limpieza condicionales.
    link: /es/templates
  - icon: 🖥️
    title: CLI & Builds NAS
    details: Comandos preview / rename / organize / auto + binarios de Linux x86_64 / aarch64 para Synology, QNAP y servidores headless.
    link: /es/cli
description: "Documentación oficial de CineRename: aprende a renombrar películas y series, gestionar subtítulos, limpiar duplicados y automatizar tu mediateca."
---


## ¿Por qué CineRename?

CineRename procesa los archivos de vídeo localmente. Las búsquedas de metadatos y subtítulos usan los proveedores configurados; la validación de licencias, las integraciones configuradas y las estadísticas de uso también contactan con servicios de red. Consulta las [preguntas frecuentes](/es/faq).

Construido con **Rust** (para rendimiento de disco y seguridad) y **Svelte 5** (para una interfaz de usuario fluida incluso con miles de archivos), CineRename funciona de forma nativa en Windows, macOS y Linux gracias a Tauri v2.

## ¿Por dónde empezar?

| Si quieres… | Ve a |
| --- | --- |
| Instalar la aplicación | [Instalación](/es/installation) |
| Renombrar tu primera carpeta | [Inicio rápido](/es/getting-started) |
| Entender Studio | [Studio](/es/studio) |
| Vigilar una carpeta de forma continua | [Carpetas vigiladas](/es/watch-folders) |
| Garantizar la integridad de tus archivos | [Checksums](/es/checksums) |
| Escribir un patrón avanzado en JavaScript | [Templates](/es/templates) |
| Automatizar tus renombrados en NAS / Seedbox | [CLI](/es/cli) |
| Conectar Plex o Jellyfin | [Plex / Jellyfin / Emby](/es/media-servers) |
