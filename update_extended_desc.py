import json
import os

base_dir = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'

texts = {
    "dragDrop": {
        "en": "Forget tedious manual sorting. Just drag and drop your messy downloads folder, messy ZIP archives, or raw video files directly into the interface. CineRename instantly parses the contents, extracts the relevant video files, and ignores the junk.",
        "fr": "Oubliez le tri manuel fastidieux. Glissez simplement votre dossier de téléchargements en vrac, vos archives ZIP ou vos fichiers vidéo bruts directement dans l'interface. CineRename analyse instantanément le contenu, extrait les fichiers vidéo pertinents et ignore les déchets.",
        "es": "Olvídese de la tediosa clasificación manual. Simplemente arrastre y suelte su carpeta de descargas desordenada, archivos ZIP o archivos de video sin procesar directamente en la interfaz. CineRename analiza instantáneamente el contenido, extrae los videos relevantes y omite la basura.",
        "zh": "忘记繁琐的手动分类。只需将杂乱的下载文件夹、ZIP压缩包或原始视频文件直接拖放到界面中。CineRename 会立即解析内容，提取相关的视频文件，并忽略垃圾文件。"
    },
    "smartPresets": {
        "en": "Every media server has its own strict naming conventions. Whether you use Plex, Jellyfin, Emby, or Kodi, simply select your server type. CineRename will automatically format seasons, episodes, and movie years exactly how your server expects them for flawless metadata scraping.",
        "fr": "Chaque serveur multimédia a ses propres règles de nommage strictes. Que vous utilisiez Plex, Jellyfin, Emby ou Kodi, sélectionnez simplement votre type de serveur. CineRename formatera automatiquement les saisons, les épisodes et les années des films exactement comme votre serveur l'attend pour un scraping parfait des métadonnées.",
        "es": "Cada servidor de medios tiene sus propias convenciones de nomenclatura estrictas. Ya sea que use Plex, Jellyfin, Emby o Kodi, simplemente seleccione su tipo de servidor. CineRename formateará automáticamente las temporadas, los episodios y los años de las películas exactamente como su servidor los espera para un raspado perfecto de metadatos.",
        "zh": "每个媒体服务器都有自己严格的命名约定。无论您使用的是 Plex、Jellyfin、Emby 还是 Kodi，只需选择您的服务器类型即可。CineRename 会自动格式化季数、集数和电影年份，完全符合您服务器的期望，从而实现完美的元数据抓取。"
    },
    "fineTune": {
        "en": "Take complete control over your library's organization. Define custom folder structures (e.g., 'Movies/Year/Title'), prioritize specific audio languages, and filter out low-quality files. Your library, your exact rules.",
        "fr": "Prenez le contrôle total de l'organisation de votre bibliothèque. Définissez des structures de dossiers personnalisées (ex: 'Films/Année/Titre'), priorisez des langues audio spécifiques et filtrez les fichiers de basse qualité. Votre bibliothèque, vos règles exactes.",
        "es": "Tome el control total de la organización de su biblioteca. Defina estructuras de carpetas personalizadas (por ejemplo, 'Películas/Año/Título'), priorice idiomas de audio específicos y filtre archivos de baja calidad. Su biblioteca, sus reglas exactas.",
        "zh": "完全控制您的媒体库组织。定义自定义文件夹结构（例如，'电影/年份/标题'），优先考虑特定的音频语言，并过滤掉低质量的文件。您的媒体库，您的确切规则。"
    },
    "xmlExport": {
        "en": "Automate your entire post-download workflow. The Pipeline Mode allows you to set up a chain of actions: drop a folder, let CineRename identify the media, fetch the missing subtitles from OpenSubtitles, rename everything perfectly, and automatically move the polished files to your NAS or final Plex library.",
        "fr": "Automatisez l'intégralité de votre flux de travail post-téléchargement. Le mode Pipeline vous permet de configurer une chaîne d'actions : déposez un dossier, laissez CineRename identifier le média, récupérer les sous-titres manquants, tout renommer parfaitement et déplacer automatiquement les fichiers finis vers votre NAS ou votre bibliothèque Plex.",
        "es": "Automatice todo su flujo de trabajo posterior a la descarga. El modo Pipeline le permite configurar una cadena de acciones: suelte una carpeta, deje que CineRename identifique los medios, busque los subtítulos faltantes, cambie el nombre de todo perfectamente y mueva automáticamente los archivos terminados a su NAS o biblioteca final de Plex.",
        "zh": "自动化您整个下载后的工作流程。管道模式允许您设置一系列操作：放置文件夹，让 CineRename 识别媒体，获取缺失的字幕，完美地重命名所有内容，并将整理好的文件自动移动到您的 NAS 或最终的 Plex 库中。"
    },
    "cli": {
        "en": "For power users and sysadmins, CineRename offers a robust Command Line Interface (CLI). Schedule renaming tasks using cron jobs, integrate it into your custom scripts, or deploy it as a headless Docker container on your Synology or Unraid NAS for 24/7 automated library management.",
        "fr": "Pour les utilisateurs avancés et les administrateurs système, CineRename propose une interface en ligne de commande (CLI) robuste. Planifiez des tâches de renommage via cron, intégrez-le dans vos scripts personnalisés ou déployez-le sous forme de conteneur Docker headless sur votre NAS Synology ou Unraid pour une gestion automatisée 24/7.",
        "es": "Para usuarios avanzados y administradores de sistemas, CineRename ofrece una robusta Interfaz de Línea de Comandos (CLI). Programe tareas de cambio de nombre, intégrelo en sus scripts personalizados o impleméntelo como un contenedor Docker sin interfaz gráfica en su NAS Synology o Unraid para una gestión automatizada 24/7.",
        "zh": "对于高级用户和系统管理员，CineRename 提供了强大的命令行界面 (CLI)。使用 cron 作业安排重命名任务，将其集成到您的自定义脚本中，或将其作为无头 Docker 容器部署在您的 Synology 或 Unraid NAS 上，以实现全天候 24/7 自动化媒体库管理。"
    },
    "localProcessing": {
        "en": "Your privacy and data sovereignty are guaranteed. CineRename processes all your video files locally on your own CPU. We never upload your files to the cloud. The only network requests made are lightweight, anonymous calls to TMDB, TVDB, or OpenSubtitles to fetch metadata and posters.",
        "fr": "Votre vie privée et la souveraineté de vos données sont garanties. CineRename traite tous vos fichiers vidéo localement sur votre propre processeur. Nous ne téléversons jamais vos fichiers dans le cloud. Les seules requêtes réseau sont des appels légers et anonymes vers TMDB, TVDB ou OpenSubtitles pour récupérer les métadonnées.",
        "es": "Su privacidad y la soberanía de sus datos están garantizadas. CineRename procesa todos sus archivos de video localmente en su propia CPU. Nunca subimos sus archivos a la nube. Las únicas solicitudes de red son llamadas ligeras y anónimas a TMDB, TVDB u OpenSubtitles para obtener metadatos.",
        "zh": "您的隐私和数据主权得到保证。CineRename 在您自己的 CPU 上本地处理您的所有视频文件。我们绝不会将您的文件上传到云端。唯一的网络请求是对 TMDB、TVDB 或 OpenSubtitles 的轻量级匿名调用，以获取元数据。"
    },
    "parallelProcessing": {
        "en": "Built from the ground up using a high-performance Rust backend and a lightning-fast Svelte 5 frontend. CineRename utilizes parallel multi-threading to process thousands of files simultaneously. Virtualized lists ensure the UI never lags, even when you load a massive 10TB media collection.",
        "fr": "Conçu de A à Z avec un backend Rust haute performance et un frontend Svelte 5 ultra-rapide. CineRename utilise le multi-threading parallèle pour traiter des milliers de fichiers simultanément. Les listes virtualisées garantissent une interface fluide, même avec une collection massive de 10 To.",
        "es": "Creado desde cero utilizando un backend Rust de alto rendimiento y un frontend Svelte 5 ultrarrápido. CineRename utiliza subprocesos múltiples paralelos para procesar miles de archivos simultáneamente. Las listas virtualizadas aseguran que la interfaz de usuario nunca se retrase, incluso con colecciones masivas de 10 TB.",
        "zh": "完全基于高性能 Rust 后端和闪电般快速的 Svelte 5 前端构建。CineRename 利用并行多线程技术同时处理数千个文件。虚拟化列表确保用户界面即使在加载 10TB 海量媒体库时也永远不会卡顿。"
    },
    "audioVideoSync": {
        "en": "Tired of subtitles that are out of sync by 2 seconds? CineRename natively integrates the OpenSubtitles API. It analyzes the specific hash of your video file to find the exact matching .srt subtitle, downloads it in your preferred language, and renames it to perfectly match your video file.",
        "fr": "Fatigué des sous-titres décalés de 2 secondes ? CineRename intègre nativement l'API OpenSubtitles. Il analyse le hash spécifique de votre fichier vidéo pour trouver le sous-titre .srt qui correspond exactement, le télécharge dans votre langue préférée et le renomme pour correspondre parfaitement à votre vidéo.",
        "es": "Cansado de los subtítulos desfasados por 2 segundos? CineRename integra de forma nativa la API de OpenSubtitles. Analiza el hash específico de su archivo de video para encontrar el subtítulo .srt que coincide exactamente, lo descarga en su idioma preferido y lo renombra para que coincida perfectamente con su video.",
        "zh": "厌倦了相差 2 秒不同步的字幕吗？CineRename 原生集成 OpenSubtitles API。它分析视频文件的特定哈希值，以找到完全匹配的 .srt 字幕，以您首选的语言下载它，并对其进行重命名以与您的视频文件完美匹配。"
    },
    "repetitionRemover": {
        "en": "Stop wasting precious hard drive space. When parsing your library, CineRename intelligently detects if you have multiple versions of the same movie or episode (e.g., a 720p version and a 4K HDR version). It suggests keeping only the highest quality file and safely archiving or deleting the duplicates.",
        "fr": "Cessez de gaspiller le précieux espace de vos disques durs. Lors de l'analyse de votre bibliothèque, CineRename détecte intelligemment si vous possédez plusieurs versions du même film ou épisode (ex: une version 720p et une version 4K HDR). Il suggère de ne conserver que la meilleure qualité et de supprimer les doublons.",
        "es": "Deje de desperdiciar un valioso espacio en el disco duro. Al analizar su biblioteca, CineRename detecta de manera inteligente si tiene varias versiones de la misma película o episodio (ej., una versión 720p y una versión 4K HDR). Sugiere conservar solo el archivo de mayor calidad y eliminar los duplicados.",
        "zh": "停止浪费宝贵的硬盘空间。在解析您的媒体库时，CineRename 会智能地检测您是否拥有同一部电影或剧集的多个版本（例如，720p 版本和 4K HDR 版本）。它建议仅保留最高质量的文件并安全地删除重复项。"
    },
    "multilingual": {
        "en": "Whether you are organizing Hollywood blockbusters, French cinema, Spanish telenovelas, or Japanese Anime, CineRename handles it seamlessly. It supports all major video formats (MKV, MP4, AVI, MOV) and can search metadata in your native language so your Plex posters are localized.",
        "fr": "Que vous organisiez des blockbusters hollywoodiens, du cinéma d'auteur français, des telenovelas espagnoles ou des animes japonais, CineRename gère tout de manière fluide. Il prend en charge tous les formats vidéo majeurs (MKV, MP4, AVI, MOV) et recherche les métadonnées dans votre langue maternelle.",
        "es": "Ya sea que esté organizando éxitos de taquilla de Hollywood, cine francés, telenovelas españolas o Anime japonés, CineRename lo maneja a la perfección. Es compatible con los formatos de video (MKV, MP4, AVI, MOV) y puede buscar metadatos en su idioma nativo para que sus carteles de Plex estén localizados.",
        "zh": "无论您整理的是好莱坞大片、法国电影、西班牙电视剧还是日本动漫，CineRename 都能轻松应对。它支持所有主流视频格式（MKV、MP4、AVI、MOV），并且可以用您的母语搜索元数据，从而使您的 Plex 海报实现本地化。"
    },
    "blazingPreview": {
        "en": "No more blind renaming mistakes. The interactive Studio dashboard shows you exactly what your files will look like before any changes are committed to the disk. View the old filename side-by-side with the new Plex-compliant filename, ensuring 100% confidence before you hit 'Apply'.",
        "fr": "Fini les erreurs de renommage à l'aveugle. Le tableau de bord interactif Studio vous montre exactement à quoi ressembleront vos fichiers avant d'appliquer les modifications sur le disque. Affichez l'ancien nom à côté du nouveau nom conforme à Plex, vous assurant une confiance à 100% avant de cliquer sur 'Appliquer'.",
        "es": "No más errores de cambio de nombre a ciegas. El panel interactivo Studio le muestra exactamente cómo se verán sus archivos antes de que se confirme cualquier cambio en el disco. Vea el nombre antiguo junto con el nuevo nombre compatible con Plex, lo que garantiza un 100% de confianza antes de aplicar.",
        "zh": "不再有盲目的重命名错误。交互式 Studio 仪表板在将任何更改提交到磁盘之前，会向您准确展示文件的外观。并排查看旧文件名和符合 Plex 标准的新文件名，确保您在点击“应用”之前有 100% 的信心。"
    },
    "optimizedPro": {
        "en": "Everyone makes mistakes. If you accidentally rename the wrong folder or apply a bad preset, don't panic. CineRename keeps a detailed internal log of every operation. With a single click, you can undo batch renames and restore your files to their exact original names and locations.",
        "fr": "Tout le monde fait des erreurs. Si vous renommez accidentellement le mauvais dossier ou appliquez un mauvais réglage, pas de panique. CineRename conserve un journal interne détaillé de chaque opération. En un seul clic, annulez les renommages en masse et restaurez vos fichiers avec leurs noms et emplacements d'origine.",
        "es": "Todo el mundo comete errores. Si accidentalmente cambia el nombre de la carpeta incorrecta o aplica un mal preajuste, no entre en pánico. CineRename mantiene un registro interno de cada operación. Con un solo clic, puede deshacer los cambios masivos y restaurar sus archivos a sus nombres y ubicaciones originales.",
        "zh": "每个人都会犯错。如果您不小心重命名了错误的文件夹或应用了错误的预设，请不要惊慌。CineRename 会保留每个操作的详细内部日志。只需单击一次，您就可以撤消批量重命名，并将文件恢复到其确切的原始名称和位置。"
    },
    "dryRunReport": {
        "en": "Perfect for complex media setups and cautious users. Run a 'Dry-Run' simulation to see what CineRename would do with your files without actually touching them. You can export this comprehensive summary as a CSV or JSON report to audit the planned changes, share with your team, or review offline.",
        "fr": "Parfait pour les configurations multimédias complexes et les utilisateurs prudents. Lancez une simulation 'Dry-Run' pour voir ce que CineRename ferait avec vos fichiers sans y toucher. Vous pouvez exporter ce résumé complet sous forme de rapport CSV ou JSON pour auditer les modifications prévues ou les examiner hors ligne.",
        "es": "Perfecto para configuraciones multimedia complejas y usuarios cautelosos. Ejecute una simulación 'Dry-Run' para ver qué haría CineRename con sus archivos sin tocarlos. Puede exportar este resumen completo como un informe CSV o JSON para auditar los cambios planificados o revisarlos sin conexión.",
        "zh": "非常适合复杂的媒体设置和谨慎的用户。运行“试运行”模拟，以查看 CineRename 将如何处理您的文件，而无需实际触摸它们。您可以将此综合摘要导出为 CSV 或 JSON 报告，以审计计划的更改、与团队共享或离线查看。"
    },
    "watchFolders": {
        "en": "Let CineRename do the work while you sleep. Simply set up specific 'Watch Folders' (like your Torrent or Usenet download directories). CineRename runs silently in the background, instantly detecting when a new video file finishes downloading. It immediately processes, renames, and moves the file to your library without any manual input.",
        "fr": "Laissez CineRename travailler pendant que vous dormez. Définissez simplement des 'Dossiers Surveillés' (comme vos répertoires de téléchargement Torrent ou Usenet). CineRename tourne silencieusement en arrière-plan, détectant instantanément la fin du téléchargement d'un nouveau fichier vidéo. Il le traite, le renomme et le déplace immédiatement vers votre bibliothèque sans aucune intervention manuelle.",
        "es": "Deje que CineRename haga el trabajo mientras duerme. Simplemente configure 'Carpetas Vigiladas' específicas (como sus directorios de descarga). CineRename se ejecuta silenciosamente en segundo plano, detectando al instante cuándo termina de descargarse un nuevo archivo de video. Inmediatamente procesa, renombra y mueve el archivo a su biblioteca.",
        "zh": "让 CineRename 在您睡觉时为您工作。只需设置特定的“监视文件夹”（例如您的 Torrent 下载目录）。CineRename 在后台静默运行，立即检测新视频文件何时完成下载。它会立即处理、重命名该文件并将其移动到您的媒体库中，而无需任何手动输入。"
    },
    "checksums": {
        "en": "Data corruption is the enemy of any media archivist. Before moving massive multi-gigabyte 4K releases, CineRename can read companion .sfv, .md5, and .sha1 files. It verifies the cryptographic integrity of the video file to ensure it wasn't corrupted during download or network transfer, guaranteeing your library is pixel-perfect.",
        "fr": "La corruption des données est l'ennemi de tout archiviste. Avant de déplacer des fichiers 4K de plusieurs gigaoctets, CineRename peut lire les fichiers .sfv, .md5 et .sha1 d'accompagnement. Il vérifie l'intégrité cryptographique du fichier vidéo pour s'assurer qu'il n'a pas été corrompu lors du téléchargement, garantissant ainsi une bibliothèque parfaite.",
        "es": "La corrupción de datos es el enemigo de cualquier archivista. Antes de mover lanzamientos 4K masivos de varios gigabytes, CineRename puede leer archivos complementarios .sfv, .md5 y .sha1. Verifica la integridad criptográfica del archivo de video para asegurarse de que no se haya dañado durante la descarga o la transferencia.",
        "zh": "数据损坏是任何媒体档案管理员的敌人。在移动巨大的千兆字节 4K 视频之前，CineRename 可以读取随附的 .sfv、.md5 和 .sha1 文件。它会验证视频文件的加密完整性，以确保它在下载或网络传输过程中没有损坏，从而保证您的媒体库完美无缺。"
    }
}

langs = ['en', 'fr', 'es', 'zh']

for lang in langs:
    filepath = os.path.join(base_dir, f'{lang}.json')
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    perks = data.get('perksGrid', {}).get('perks', {})
    for key, value in perks.items():
        if key in texts:
            value['extendedDescription'] = texts[key][lang]
            
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Real feature descriptions injected successfully!")
