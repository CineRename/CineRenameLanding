# Instalación

CineRename está disponible para **Windows**, **macOS**, **Linux desktop** y **Linux headless/NAS**.

## Descargas

Usa la página oficial de [Descargas](https://cinerename.app/es/download) o la última release:

https://github.com/CineRename/CineRename-Releases/releases/latest

| Sistema | Formatos recomendados |
| :--- | :--- |
| Windows 10/11 x64 | [Microsoft Store](https://apps.microsoft.com/detail/9N7JL6NXFVGW), instalador `.exe`, `.msi`, `.zip` portable |
| macOS Apple Silicon | `.dmg` o `.pkg` arm64 |
| macOS Intel | `.dmg` o `.pkg` x64 |
| Linux desktop | AppImage, `.deb`, `.rpm`, `.tar.xz` portable |
| NAS / Linux headless | `.tar.xz` x64 o arm64 |
| Docker | archivo de imagen x64 o arm64 |

::: tip
Si tienes dudas, empieza con **Microsoft Store** o el `.exe` en Windows, el `.dmg` en macOS y AppImage en Linux.
:::

## Windows

### Microsoft Store (Recomendado)

Instala CineRename desde la [Microsoft Store](https://apps.microsoft.com/detail/9N7JL6NXFVGW) para recibir actualizaciones a través de la tienda. CineRename sigue siendo una aplicación de escritorio que accede a los archivos con los permisos de tu cuenta de usuario.

### Instalador independiente

1. Descarga el instalador `.exe`.
2. Ejecútalo.
3. Si Windows SmartScreen muestra una advertencia, haz clic en **Más información** -> **Ejecutar de todas formas**.

Los builds directos `.exe` no están firmados por ahora, así que esta advertencia es esperada en el primer inicio.

## macOS

1. Descarga el `.dmg` correcto para tu Mac: Apple Silicon o Intel.
2. Abre el `.dmg`.
3. Arrastra **CineRename** a `Aplicaciones`.
4. En el primer inicio, haz clic derecho en **CineRename** -> **Abrir**, y confirma.

Los builds de macOS no están firmados/notarizados por ahora, así que Gatekeeper puede pedir confirmación en el primer inicio.

## Linux Desktop

### AppImage

1. Descarga la AppImage.
2. Hazla ejecutable:

```bash
chmod +x CineRename_*.AppImage
```

3. Ejecútala:

```bash
./CineRename_*.AppImage
```

### deb / rpm

Usa el paquete `.deb` en Debian/Ubuntu y el paquete `.rpm` en Fedora/openSUSE/RHEL.

### Snap

Instala desde Snap Store:

```bash
sudo snap install cinerename
```

Snap Store gestiona las actualizaciones. Para acceder a volúmenes montados en `/media`, `/run/media` o `/mnt`, conecta la interfaz removable-media:

```bash
sudo snap connect cinerename:removable-media
```

El acceso también depende de los permisos del volumen y de las interfaces Snap.

## NAS / Linux Headless

Descarga el archivo NAS x64 o arm64, extráelo en tu servidor y ejecuta el binario `cinerename` incluido.

Para uso de servidor, consulta [CLI y headless](/es/cli).

## Actualizaciones

Los builds desktop directos incluyen el updater integrado de CineRename. Puedes buscar actualizaciones desde **Preferencias -> General -> Actualizaciones**.

Los builds de Microsoft Store y Snap reciben actualizaciones a través de sus respectivas tiendas. Las demás instalaciones mediante gestores de paquetes utilizan su propio canal.

## Desinstalación

- **Windows**: Configuración → Aplicaciones → CineRename → Desinstalar.
- **macOS**: mueve `CineRename.app` a la papelera.
- **Linux AppImage / portable**: elimina el archivo descargado o la carpeta extraída.
- **Linux deb / rpm**: desinstala con tu gestor de paquetes.

Los ajustes, historial, logs y estado de licencia se guardan en la ubicación app-data de tu sistema. La pantalla Support permite copiar logs/config antes de eliminar datos locales.
