# Claves API y proveedores

CineRename puede consultar varios proveedores externos según la función que uses:

- **TheTVDB** — películas, series, temporadas, episodios, títulos localizados, posters e imágenes cuando están disponibles
- **TVmaze** — complemento a TheTVDB para series de TV (datos abiertos, sin clave)
- **AniList** — búsqueda de anime y numeración absoluta cuando está disponible
- **Kitsu** — búsqueda alternativa de anime
- **Jikan** — búsqueda de anime basada en MyAnimeList y títulos públicos de episodios, sin clave ni cuenta
- **AniDB** — títulos de anime multilingües y metadatos de episodios; implementado pero desactivado por defecto
- **OpenSubtitles** — búsqueda y descarga de subtítulos

## Metadatos de anime e idiomas alternativos

[Jikan](https://docs.api.jikan.moe/) no requiere una clave API personal ni una cuenta. Proporciona variantes del título del anime y, cuando existen, títulos de episodios en inglés, japonés o romanizados. No garantiza traducciones al francés, español u otros idiomas. CineRename utiliza un título alternativo disponible si falta la traducción solicitada; no inventa traducciones ni deduce una correspondencia global entre temporadas a partir de la numeración de una ficha. El acceso técnico a una API pública no autoriza por sí solo la reutilización comercial de los datos de origen de MyAnimeList.

**AniDB permanece desactivado por defecto.** Su [política](https://anidb.net/policy) excluye las aplicaciones de pago/freemium salvo excepción autorizada. Actívalo en CineRename solo después de obtener el permiso necesario. La búsqueda en el archivo público de títulos no requiere clave; los episodios necesitan un **nombre de aplicación registrado y su versión**, no una contraseña de usuario. Estos identificadores de cliente son públicos. Introducirlos en Preferencias no activa el proveedor: después de obtener permiso, también hay que establecer `[anidb] enabled = true` en `providers.toml`. No se solicita ni se envía ninguna contraseña de AniDB.

Para que la aplicación funcione desde la instalación, CineRename puede incluir claves de proveedor durante la compilación. No necesitas configurar nada para empezar, pero tus propias claves pueden ayudar con grandes volúmenes o cuotas dedicadas.

## ¿Por qué proporcionar tu propia clave?

- **Cuotas más altas** — útil para procesar volúmenes muy grandes
- **Cuota dedicada** — útil para uso intensivo de TheTVDB u OpenSubtitles
- **Funciones de cuenta** — la subida a OpenSubtitles requiere tu propia clave API y credenciales
- **Rotación en CI / staging** — equipos que prueban en un entorno aislado

## Orden de resolución

Si varias fuentes proporcionan una clave, CineRename utiliza la primera que encuentre según este orden:

1. **Variable de entorno en tiempo de ejecución**
   - `CINERENAME_TVDB_API_KEY`
   - `CINERENAME_TVDB_SUBSCRIBER_PIN`
   - `CINERENAME_OPENSUBTITLES_API_KEY`
   - `CINERENAME_OPENSUBTITLES_USERNAME`
   - `CINERENAME_OPENSUBTITLES_PASSWORD`
   - `CINERENAME_OPENSUBTITLES_USER_AGENT`
   - `CINERENAME_ANIDB_CLIENT_NAME`
   - `CINERENAME_ANIDB_CLIENT_VERSION`
2. **Valor introducido en Preferencias → Fuentes y subtítulos** (guardado en el almacén de secretos / llavero del sistema cuando es sensible)
3. **Archivo `providers.toml`** en la subcarpeta `<config-dir>/providers/`
4. **Clave incluida por defecto** compilada en la app

## Configurar a través de la UI

**Preferencias → Fuentes y subtítulos**:

- TheTVDB: campo **API Key** y opcional **PIN de suscriptor**
- OpenSubtitles: campo **API Key** + credenciales (usuario/contraseña) si tienes una cuenta premium
- AniDB: **Nombre del cliente registrado** y **Versión del cliente**, para una integración autorizada; también requiere activación en `providers.toml`

Los valores sensibles se guardan con el almacén de credenciales / llavero del sistema cuando está disponible, no en texto claro en SQLite. Nunca salen de tu equipo salvo cuando se envían al proveedor correspondiente.

## Configurar a través de un archivo

Crea (o edita) `providers.toml` dentro de la subcarpeta `providers/` de tu directorio de configuración:

| Sistema / Modo | Ruta |
| --- | --- |
| Windows (Escritorio) | `%APPDATA%\com.cinerename.desktop\providers\providers.toml` |
| macOS (Escritorio) | `~/Library/Application Support/com.cinerename.desktop/providers/providers.toml` |
| Linux (Escritorio) | `~/.local/share/com.cinerename.desktop/providers/providers.toml` |
| Headless / NAS (Linux) | `~/.config/cinerename/providers/providers.toml` |

Formato:

```toml
[thetvdb]
enabled = true
api_key = "tu-clave-tvdb"
subscriber_pin = "tu-pin-suscriptor"

[opensubtitles]
enabled = true
api_key = "tu-clave-opensubtitles"
username = "tu-usuario"
password = "tu-contraseña"
user_agent = "CineRename"

[jikan]
enabled = true

[anidb]
# AniDB permanece desactivado hasta obtener el permiso necesario.
enabled = false
client_name = ""
client_version = 1
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
| **AniList** | No requiere clave para las funciones públicas usadas por CineRename |
| **Kitsu** | No requiere clave para las funciones públicas usadas por CineRename |
| **Jikan** | Sin clave ni cuenta para las lecturas públicas usadas por CineRename; siguen aplicándose las condiciones de los datos de origen |
| **AniDB** | Desactivado por defecto; esta aplicación de pago/freemium necesita permiso. Nombre/versión públicos del cliente registrado para episodios; sin contraseña |
