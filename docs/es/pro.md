# Licencia Pro & Premium

CineRename se puede descargar de forma gratuita y usar **indefinidamente sin pagar**, con un límite de 2 archivos renombrados por día en Studio.

Sin embargo, para los usuarios avanzados, los administradores de servidores NAS y aquellos que deseen automatizar todo su flujo de trabajo, ofrecemos una **Licencia Pro**.

## Comparativa Gratis vs Pro

| Funcionalidad | Versión Gratuita | Versión Pro |
| --- | :---: | :---: |
| Studio (renombrado manual) | ✅ 2 archivos / día | ✅ Ilimitado |
| Vista previa Antes / Después | ✅ | ✅ |
| Metadatos TheTVDB / TVmaze | ✅ | ✅ |
| Emparejamiento lineal (VOB/BDMV) | ✅ | ✅ |
| **Subtítulos OpenSubtitles** | ✅ 2 archivos / día | ✅ |
| **Duplicados multi-calidad** | ❌ | ✅ |
| **Modo Automático (Pipeline)** | ❌ | ✅ |
| **CLI completa (auto, subs, etc.)**| ⚠️ Limitada | ✅ |
| **Sincronización en la nube de reglas**| ❌ | ✅ *(Próximamente)* |
| **Soporte prioritario** | ❌ | ✅ |

::: info Política de licencia justa
La licencia Pro no está vinculada a ninguna suscripción obligatoria (aunque existe una opción mensual/anual, la compra **Pro de por vida** es la más popular). Pagas una vez y la aplicación es tuya. 
Sin DRM abusivo: la licencia es válida para **2 dispositivos simultáneamente** (por ejemplo, tu PC principal y tu NAS).
:::

## Funciones desbloqueadas

### 1. Subtítulos OpenSubtitles
La versión Pro desbloquea la pestaña y el módulo `Subtítulos`. Permite buscar y descargar automáticamente subtítulos sincronizados de forma masiva para toda una carpeta, y expone el visor de subtítulos integrado.

### 2. Búsqueda de duplicados
Si tienes múltiples versiones de una misma película (1080p, 4K, diferentes codificaciones), el módulo Duplicados Pro detecta automáticamente las colisiones de nombres de salida y te permite analizar, puntuar y limpiar las versiones obsoletas con un solo clic.

### 3. Modo Automático (CLI & GUI)
Es el "Santo Grial" para los servidores Plex. La versión Pro te permite utilizar el modo "Pipeline" que encadena: **Renombrado → Subtítulos → Limpieza → Movimiento**. Este modo se puede usar dentro del software, pero sobre todo a través del comando CLI `cinerename auto`, haciendo que el software se pueda integrar con Radarr, Sonarr o un cronjob de NAS.

## Cómo activar tu licencia

1. Ve a la [página de Precios](https://cinerename.com/#pricing) y compra la versión Pro de tu elección.
2. Recibirás una **clave de licencia** (gestionada por LemonSqueezy) por correo electrónico.
3. Abre CineRename, ve a **Ajustes → Licencia Pro**.
4. Pega tu clave de licencia y haz clic en **Activar**.

La aplicación validará la clave en línea y desbloqueará instantáneamente los módulos atenuados. Una vez validada, la aplicación almacena en caché la validación: seguirá funcionando incluso si pierdes la conexión a internet (validación periódica transparente).

## Preguntas frecuentes (Licencia)

**¿Pierdo mis datos si me paso a Pro?**
No, el historial y la base de datos SQLite siguen siendo exactamente los mismos. La licencia simplemente desbloquea los botones en la interfaz.

**¿Qué pasa si cambio de PC?**
Puedes desactivar tu licencia en un dispositivo antiguo a través de los ajustes, lo que liberará el "espacio" (de los 2 disponibles) para tu nuevo PC. En caso de fallo del disco duro, un panel web de LemonSqueezy te permite purgar tus activaciones de forma remota.
