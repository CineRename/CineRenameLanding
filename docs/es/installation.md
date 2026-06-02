# Instalación

CineRename está disponible de forma nativa para **Windows**, **macOS** y **Linux** gracias a Tauri v2.

## Descargas

Puedes descargar los binarios desde la página de descarga oficial.

| OS | Formato |
| :--- | :--- |
| Windows 10/11 (x64) | `.exe` (instalador) |
| macOS (Intel + Apple Silicon) | `.dmg` |
| Linux (universal) | `.AppImage` |

::: tip También puedes ir a la página de [Descargas](/es/download) del sitio, que detecta automáticamente tu sistema.
:::

## Windows

1. Descarga el instalador `CineRename-Setup.exe`.
2. Ejecútalo. Si Windows SmartScreen muestra una advertencia, haz clic en **Más información** → **Ejecutar de todas formas** *(el certificado de firma extendida está en proceso de validación)*.
3. El instalador coloca CineRename en `%LOCALAPPDATA%\Programs\CineRename`.

## macOS

1. Abre el `.dmg` y arrastra **CineRename** a `Aplicaciones`.
2. En el primer inicio, haz **clic derecho → Abrir** (y confirma) para autorizar la ejecución *(la aplicación está en proceso de notarización con Apple)*.
3. Para las siguientes ejecuciones, un doble clic será suficiente.

::: warning Apple Silicon
La versión actual está compilada como un universal binary. Si experimentas problemas de rendimiento, comprueba en **Acerca de este Mac → Sistema** que la aplicación se ejecuta de forma nativa (no a través de Rosetta).
:::

## Linux

1. Descarga `CineRename.AppImage`.
2. Haz el archivo ejecutable:
   ```bash
   chmod +x CineRename.AppImage
   ```
3. Ejecútalo:
   ```bash
   ./CineRename.AppImage
   ```

::: tip
Para integrar CineRename en tu menú de aplicaciones, utiliza [`AppImageLauncher`](https://github.com/TheAssassin/AppImageLauncher).
:::

## Gestores de paquetes (Próximamente)

CineRename estará disponible muy pronto a través de los gestores de paquetes estándar:

- **macOS** : `brew install --cask cinerename`
- **Windows** : `winget install CineRename`

## Compilar desde el código fuente

También puedes compilar CineRename localmente.

```bash
npm install
npm run tauri:dev
```

## Actualización

La actualización automática aún no está activada. Para actualizar, descarga la última versión y sobrescribe la instalación anterior.

## Desinstalación

- **Windows**: Configuración → Aplicaciones → CineRename → Desinstalar.
- **macOS**: mueve `CineRename.app` a la papelera.
- **Linux**: elimina el `.AppImage`.

Los ajustes locales (presets de nombrado, historial, claves API personalizadas) se almacenan en:

| OS | Carpeta |
| --- | --- |
| Windows | `%APPDATA%\CineRename\` |
| macOS | `~/Library/Application Support/CineRename/` |
| Linux | `~/.config/CineRename/` |

Elimínalo si quieres empezar de cero.
