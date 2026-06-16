import json
import os

base_dir = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'

faq_data = {
    "title": {
        "en": "Frequently Asked Questions",
        "fr": "Foire Aux Questions",
        "es": "Preguntas Frecuentes",
        "zh": "常见问题解答"
    },
    "questions": {
        "0": {
            "q": {
                "en": "Why use CineRename instead of Sonarr/Radarr?",
                "fr": "Pourquoi utiliser CineRename plutôt que Sonarr/Radarr ?",
                "es": "¿Por qué usar CineRename en lugar de Sonarr/Radarr?",
                "zh": "为什么要使用 CineRename 而不是 Sonarr/Radarr？"
            },
            "a": {
                "en": "Sonarr and Radarr are amazing for full automation, but they require significant setup (indexers, download clients). CineRename is a lightweight, standalone tool. If you have an existing messy hard drive or just want to quickly organize files without running a 24/7 server, CineRename does the job instantly via Drag & Drop.",
                "fr": "Sonarr et Radarr sont fantastiques pour l'automatisation complète, mais nécessitent une configuration complexe (indexers, clients de téléchargement). CineRename est un outil léger et autonome. Si vous avez un disque dur en vrac ou souhaitez simplement organiser rapidement des fichiers sans configurer un serveur H24, CineRename fait le travail instantanément par simple glisser-déposer.",
                "es": "Sonarr y Radarr son increíbles para la automatización, pero requieren una configuración compleja. CineRename es una herramienta liviana y autónoma. Si tiene un disco duro desordenado o simplemente desea organizar archivos rápidamente sin ejecutar un servidor 24/7, CineRename hace el trabajo al instante.",
                "zh": "Sonarr 和 Radarr 对于全自动化来说非常棒，但它们需要复杂的设置。CineRename 是一个轻量级的独立工具。如果您有一个杂乱的硬盘驱动器，或者只想快速组织文件而无需运行 24/7 服务器，CineRename 可以通过拖放即时完成工作。"
            }
        },
        "1": {
            "q": {
                "en": "How does it compare to FileBot or TinyMediaManager?",
                "fr": "Comment cela se compare-t-il à FileBot ou TinyMediaManager ?",
                "es": "¿Cómo se compara con FileBot o TinyMediaManager?",
                "zh": "它与 FileBot 或 TinyMediaManager 相比如何？"
            },
            "a": {
                "en": "CineRename was built from the ground up in Rust to be lightning-fast. Unlike older Java-based tools, it can process thousands of files without UI lag. We also built features that are usually missing: native ZIP/RAR extraction, an interactive visual preview, a full 'Undo' history, and multi-quality duplicate hunting.",
                "fr": "CineRename a été conçu en Rust pour être ultra-rapide. Contrairement aux anciens outils basés sur Java, il traite des milliers de fichiers sans ralentir l'interface. Il intègre aussi des fonctionnalités rares : extraction ZIP/RAR native, prévisualisation visuelle, historique avec annulation complète (Undo), et chasse aux doublons multi-qualité.",
                "es": "CineRename fue construido en Rust para ser ultrarrápido. A diferencia de las herramientas antiguas basadas en Java, puede procesar miles de archivos sin demoras. También incluye funciones raras: extracción nativa ZIP/RAR, vista previa visual, historial de deshacer y búsqueda de duplicados.",
                "zh": "CineRename 是用 Rust 从头开始构建的，速度极快。与基于 Java 的旧工具不同，它可以处理数千个文件而没有 UI 延迟。它还包括罕见的功能：原生 ZIP/RAR 提取、视觉预览、完整的“撤消”历史记录以及多质量重复查找。"
            }
        },
        "2": {
            "q": {
                "en": "Does it support Anime (Absolute numbering)?",
                "fr": "Gère-t-il les Animes (numérotation absolue) ?",
                "es": "¿Soporta Anime (numeración absoluta)?",
                "zh": "它支持动漫（绝对编号）吗？"
            },
            "a": {
                "en": "Yes! Anime naming can be a nightmare (absolute numbering, OVAs, Specials). CineRename recognizes these specific patterns and formats them correctly so Plex or Jellyfin can identify them without issues.",
                "fr": "Oui ! Le nommage des animes est souvent un cauchemar (numérotation absolue, OVA, épisodes spéciaux). CineRename reconnaît ces formats spécifiques et les renomme correctement pour que Plex ou Jellyfin les identifient sans problème.",
                "es": "¡Sí! Nombrar animes puede ser una pesadilla. CineRename reconoce estos patrones específicos (numeración absoluta, OVA) y los formatea correctamente para que Plex o Jellyfin los identifiquen sin problemas.",
                "zh": "是的！动漫命名可能是一场噩梦（绝对编号、OVA、特别篇）。CineRename 识别这些特定模式并正确格式化它们，以便 Plex 或 Jellyfin 可以毫无问题地识别它们。"
            }
        },
        "3": {
            "q": {
                "en": "Do I have to pay a monthly subscription?",
                "fr": "Dois-je payer un abonnement mensuel ?",
                "es": "¿Tengo que pagar una suscripción mensual?",
                "zh": "我必须支付月度订阅费用吗？"
            },
            "a": {
                "en": "No. While we offer a yearly license for updates, we also provide a one-time 'Lifetime' payment option. We hate subscription fatigue as much as you do.",
                "fr": "Non. Bien que nous proposions une licence annuelle pour les mises à jour, nous offrons également une option d'achat unique 'À vie' (Lifetime). Nous détestons la fatigue des abonnements autant que vous.",
                "es": "No. Aunque ofrecemos una licencia anual para actualizaciones, también ofrecemos una opción de pago único 'De por vida' (Lifetime). Odiamos la fatiga de las suscripciones tanto como usted.",
                "zh": "不。虽然我们提供每年更新的许可证，但我们也提供一次性“终身”付款选项。我们和您一样讨厌订阅疲劳。"
            }
        },
        "4": {
            "q": {
                "en": "Will my files be uploaded to the cloud?",
                "fr": "Mes fichiers seront-ils envoyés dans le cloud ?",
                "es": "¿Mis archivos se subirán a la nube?",
                "zh": "我的文件会被上传到云端吗？"
            },
            "a": {
                "en": "Absolutely not. CineRename is a 100% local application. Your files stay on your hard drive. The only network calls are lightweight requests to public APIs (like TheTVDB or OpenSubtitles) to fetch metadata.",
                "fr": "Absolument pas. CineRename est une application 100% locale. Vos fichiers restent sur votre disque dur. Les seuls appels réseau sont des requêtes légères vers des API publiques (comme TheTVDB ou OpenSubtitles) pour récupérer les métadonnées.",
                "es": "Absolutamente no. CineRename es una aplicación 100% local. Sus archivos permanecen en su disco duro. Las únicas llamadas de red son consultas a API públicas para obtener metadatos.",
                "zh": "绝对不会。CineRename 是 100% 本地应用程序。您的文件保留在硬盘上。唯一的网络调用是对公共 API 的请求以获取元数据。"
            }
        },
        "5": {
            "q": {
                "en": "Can it find and download subtitles perfectly synced?",
                "fr": "Peut-il trouver des sous-titres parfaitement synchronisés ?",
                "es": "¿Puede encontrar subtítulos perfectamente sincronizados?",
                "zh": "它可以找到完美同步的字幕吗？"
            },
            "a": {
                "en": "Yes. CineRename has a built-in OpenSubtitles integration. It calculates the unique cryptographic hash of your video file to download the exact matching .srt subtitle, guaranteeing perfect audio/video synchronization.",
                "fr": "Oui. CineRename intègre OpenSubtitles en natif. Il calcule l'empreinte cryptographique unique (hash) de votre fichier vidéo pour télécharger le fichier .srt correspondant exactement, garantissant une synchro audio/vidéo parfaite.",
                "es": "Sí. CineRename tiene integración con OpenSubtitles. Calcula el hash criptográfico único de su archivo de video para descargar el subtítulo .srt exacto, garantizando una sincronización perfecta.",
                "zh": "是的。CineRename 内置 OpenSubtitles 集成。它计算视频文件的唯一加密哈希，以精确下载匹配的 .srt 字幕，从而保证完美的音视频同步。"
            }
        },
        "6": {
            "q": {
                "en": "Does it run on my Headless NAS (Synology, Unraid)?",
                "fr": "Fonctionne-t-il sur mon NAS sans écran (Synology, Unraid) ?",
                "es": "¿Funciona en mi NAS sin pantalla (Synology, Unraid)?",
                "zh": "它可以在我的无头 NAS（Synology、Unraid）上运行吗？"
            },
            "a": {
                "en": "Yes! We provide a lightweight, headless Docker image and a robust Command Line Interface (CLI). You can set up 'Watch Folders' or trigger renames via cron jobs directly on your server.",
                "fr": "Oui ! Nous fournissons une image Docker légère et headless, ainsi qu'une puissante interface en ligne de commande (CLI). Vous pouvez configurer des 'Dossiers Surveillés' ou déclencher des scripts via cron directement sur votre serveur.",
                "es": "¡Sí! Proporcionamos una imagen Docker liviana y sin cabeza y una robusta interfaz de línea de comandos (CLI). Puede configurar 'Carpetas vigiladas' o activar scripts mediante trabajos cron directamente en su servidor.",
                "zh": "是的！我们提供了一个轻量级的无头 Docker 镜像和一个强大的命令行界面 (CLI)。您可以在您的服务器上直接设置“监视文件夹”或通过 cron 作业触发重命名。"
            }
        },
        "7": {
            "q": {
                "en": "What happens if I make a mistake and rename thousands of files poorly?",
                "fr": "Que se passe-t-il si je fais une erreur et renomme mal des milliers de fichiers ?",
                "es": "¿Qué pasa si cometo un error y renombro mal miles de archivos?",
                "zh": "如果我犯了错误并且错误地重命名了数千个文件会怎样？"
            },
            "a": {
                "en": "Don't panic! CineRename tracks every operation in its History module. With a single click, you can undo a massive batch rename, and all your files will be restored to their original names and locations.",
                "fr": "Pas de panique ! CineRename suit chaque opération dans son module d'Historique. En un clic, vous pouvez annuler un renommage massif et tous vos fichiers retrouveront leurs noms et emplacements d'origine.",
                "es": "¡No entre en pánico! CineRename rastrea cada operación en su módulo de Historial. Con un solo clic, puede deshacer un cambio de nombre masivo y todos sus archivos volverán a sus nombres originales.",
                "zh": "不要惊慌！CineRename 在其历史记录模块中跟踪每个操作。只需单击一下，您就可以撤消大规模的批量重命名，并且所有文件都将恢复为其原始名称和位置。"
            }
        }
    }
}

langs = ['en', 'fr', 'es', 'zh']

for lang in langs:
    filepath = os.path.join(base_dir, f'{lang}.json')
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Overwrite the faq object completely for this language
    if 'faq' not in data:
        data['faq'] = {}
        
    data['faq']['title'] = faq_data['title'][lang]
    
    new_questions = {}
    for idx, key in enumerate(faq_data['questions'].keys()):
        new_questions[str(idx)] = {
            "q": faq_data['questions'][key]['q'][lang],
            "a": faq_data['questions'][key]['a'][lang]
        }
        
    data['faq']['questions'] = new_questions
            
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("FAQ updated successfully across all languages!")
