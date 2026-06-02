# Claves API de proveedores

CineRename consulta tres proveedores externos para funcionar:

- **TheTVDB** — metadatos de series de TV (títulos oficiales, temporadas, episodios)
- **TVmaze** — complemento a TheTVDB para series de TV (datos abiertos, sin clave)
- **OpenSubtitles** — búsqueda y descarga de subtítulos

Para que la aplicación funcione desde la instalación, se **incluyen claves API** en el binario (encriptadas durante la compilación a través de `src-tauri/build.rs`). Por lo tanto, no tienes que configurar nada para empezar.

## ¿Por qué proporcionar tu propia clave?

- **Cuotas más altas** — útil para procesar volúmenes muy grandes
- **Comportamientos personalizados** — clave Premium de OpenSubtitles
- **Rotación en CI / staging** — equipos que prueban en un entorno aislado

## Orden de resolución

Si varias fuentes proporcionan una clave, CineRename utiliza la primera que encuentre según este orden:

1. **Variable de entorno en tiempo de ejecución**
   - `CINERENAME_TVDB_API_KEY`
   - `CINERENAME_OPENSUBTITLES_API_KEY`
2. **Reemplazo introducido en Ajustes → Proveedores** (persistido en SQLite)
3. **Archivo `providers.toml`** (generado automáticamente en la carpeta de configuración local)
4. **Clave incluida por defecto** (encriptada en el binario)

## Configurar a través de la UI

**Ajustes → Proveedores**:

- TheTVDB: campo **API Key**
- OpenSubtitles: campo **API Key** + credenciales (usuario/contraseña) si tienes una cuenta premium

Los valores se encriptan en la base de datos local SQLite (bajo tu perfil de usuario). Nunca salen de tu equipo.

## Configurar a través de un archivo

Crea (o edita) `providers.toml` en la carpeta de configuración:

| OS | Ruta |
| --- | --- |
| Windows | `%APPDATA%\CineRename\providers.toml` |
| macOS | `~/Library/Application Support/CineRename/providers.toml` |
| Linux | `~/.config/CineRename/providers.toml` |

Formato:

```toml
[tvdb]
api_key = "tu-clave-tvdb"

[opensubtitles]
api_key = "tu-clave-opensubtitles"
username = "tu-usuario"
password = "tu-contraseña"
```

## Build personalizado

Para generar un binario de CineRename con claves diferentes (rotación en CI, staging):

```bash
export CINERENAME_BUNDLED_TVDB_API_KEY="..."
export CINERENAME_BUNDLED_OPENSUBTITLES_API_KEY="..."
npm run dist
```

## Obtener tus propias claves

| Proveedor | Cómo hacerlo |
| --- | --- |
| **TheTVDB** | Crea una cuenta en [thetvdb.com](https://thetvdb.com/) → API → Subscriptions |
| **OpenSubtitles** | Crea una cuenta en [opensubtitles.com](https://www.opensubtitles.com/) → Consumers → New API consumer |
| **TVmaze** | No requiere clave (API pública, con límite de tasa de 20 req/s) |
