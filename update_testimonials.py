import json
import os

base_dir = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'

testimonials_data = {
    "title": {
        "en": "Why cinephiles adopt CineRename",
        "fr": "Pourquoi les cinéphiles adoptent CineRename",
        "es": "Por qué los cinéfilos adoptan CineRename",
        "zh": "为什么影迷选择 CineRename"
    },
    "trustedBy": {
        "en": "Trusted by data hoarders and NAS admins worldwide",
        "fr": "Approuvé par les data hoarders et admins NAS du monde entier",
        "es": "Con la confianza de acaparadores de datos y administradores de NAS",
        "zh": "受到全球数据囤积者和 NAS 管理员的信任"
    },
    "joinUsers": {
        "en": "Join the users who finally have a clean library",
        "fr": "Rejoignez les utilisateurs qui ont enfin une bibliothèque propre",
        "es": "Únete a los usuarios que por fin tienen una biblioteca limpia",
        "zh": "加入终于拥有整洁媒体库的用户行列"
    },
    "startTrial": {
        "en": "Download Free",
        "fr": "Télécharger gratuitement",
        "es": "Descargar Gratis",
        "zh": "免费下载"
    },
    "quotes": {
        "0": {
            "text": {
                "en": "Switched from FileBot because of the Java memory bloat and UI lag. CineRename running on Rust is just instantaneous. The CLI handles my Sonarr post-processing like a champ.",
                "fr": "J'ai quitté FileBot à cause des lenteurs de Java. CineRename, qui tourne sous Rust, est instantané. Le CLI gère mon post-processing Sonarr sans broncher.",
                "es": "Cambié desde FileBot debido a los problemas de memoria de Java y el retraso en la interfaz. CineRename ejecutándose en Rust es instantáneo. La CLI maneja mi posprocesamiento de Sonarr como un campeón.",
                "zh": "因为 Java 内存膨胀和 UI 延迟而从 FileBot 切换过来。在 Rust 上运行的 CineRename 简直是即时的。CLI 像冠军一样处理我的 Sonarr 后处理。"
            },
            "role": {"en": "Dave M. • Data Hoarder", "fr": "Dave M. • Data Hoarder", "es": "Dave M. • Data Hoarder", "zh": "Dave M. • Data Hoarder"}
        },
        "1": {
            "text": {
                "en": "The absolute numbering support for Anime is a godsend. It's the only renamer that didn't butcher my 900+ episode One Piece collection. Jellyfin recognized everything on the first scan.",
                "fr": "Le support de la numérotation absolue pour les Animes est une bénédiction. C'est le seul outil qui n'a pas massacré ma collection One Piece de plus de 900 épisodes. Jellyfin a tout reconnu au premier scan.",
                "es": "El soporte de numeración absoluta para Anime es una bendición. Es el único renombrador que no destrozó mi colección de One Piece de más de 900 episodios. Jellyfin reconoció todo en el primer escaneo.",
                "zh": "对动漫绝对编号的支持简直是天赐之物。它是唯一没有弄乱我 900 多集海贼王收藏的重命名器。Jellyfin 在第一次扫描时就识别出了一切。"
            },
            "role": {"en": "Sarah T. • Anime Fan", "fr": "Sarah T. • Fan d'Anime", "es": "Sarah T. • Fan de Anime", "zh": "Sarah T. • 动漫迷"}
        },
        "2": {
            "text": {
                "en": "I accidentally applied the wrong preset and renamed my entire TV Shows folder into a single directory. The 'Undo' button literally saved me a week of manual work. Worth every penny.",
                "fr": "J'ai accidentellement appliqué le mauvais profil et renommé tout mon dossier Séries dans un seul répertoire. Le bouton 'Annuler' m'a littéralement sauvé une semaine de travail. Ça vaut chaque centime.",
                "es": "Apliqué accidentalmente el preajuste incorrecto y renombré toda mi carpeta de Series en un solo directorio. El botón 'Deshacer' literalmente me ahorró una semana de trabajo. Vale cada centavo.",
                "zh": "我不小心应用了错误的预设，将我整个电视节目文件夹重命名到了一个目录中。“撤消”按钮简直为我节省了一周的手动工作。物有所值。"
            },
            "role": {"en": "Alex R. • Plex Admin", "fr": "Alex R. • Admin Plex", "es": "Alex R. • Administrador de Plex", "zh": "Alex R. • Plex 管理员"}
        },
        "3": {
            "text": {
                "en": "Finally a modern UI! Most renamers look like they were built in 2005. The interactive before/after preview studio is incredibly intuitive. I know exactly what will happen before touching the disk.",
                "fr": "Enfin une interface moderne ! La plupart des logiciels de renommage ont l'air d'avoir été codés en 2005. Le studio de prévisualisation est hyper intuitif. Je sais exactement ce qui va se passer avant de toucher au disque.",
                "es": "¡Por fin una interfaz moderna! La mayoría de los renombradores parecen haber sido construidos en 2005. El estudio interactivo de vista previa de antes/después es increíblemente intuitivo.",
                "zh": "终于有一个现代的 UI 了！大多数重命名器看起来像是在 2005 年构建的。交互式的预览工作室非常直观。在接触磁盘之前，我确切地知道会发生什么。"
            },
            "role": {"en": "Mike B. • UI Designer", "fr": "Mike B. • UI Designer", "es": "Mike B. • Diseñador UI", "zh": "Mike B. • UI 设计师"}
        },
        "4": {
            "text": {
                "en": "Finding exact subtitles by cryptographic hash instead of just text scraping is brilliant. My OpenSubtitles account linked in 10 seconds, and now everything is perfectly synced automatically.",
                "fr": "Trouver des sous-titres via le hash cryptographique plutôt qu'une simple recherche de texte est brillant. J'ai lié mon compte OpenSubtitles en 10 secondes, et tout est parfaitement synchronisé.",
                "es": "Encontrar subtítulos exactos mediante hash criptográfico en lugar de solo scraping de texto es brillante. Mi cuenta de OpenSubtitles se vinculó en 10 segundos y ahora todo está perfectamente sincronizado automáticamente.",
                "zh": "通过加密哈希而不是仅仅通过文本抓取来寻找准确的字幕非常聪明。我的 OpenSubtitles 帐户在 10 秒内链接成功，现在一切都完美地自动同步了。"
            },
            "role": {"en": "John D. • Cinephile", "fr": "John D. • Cinéphile", "es": "John D. • Cinéfilo", "zh": "John D. • 影迷"}
        },
        "5": {
            "text": {
                "en": "The duplicate hunting feature is unmatched. It scanned my 12TB Unraid NAS, found all my double downloads, and helped me free up nearly 800 GB by keeping only the 4K versions.",
                "fr": "La chasse aux doublons est inégalée. L'appli a scanné mon NAS Unraid de 12 To, trouvé mes téléchargements en double et m'a aidé à libérer 800 Go en ne gardant que les versions 4K.",
                "es": "La función de búsqueda de duplicados no tiene igual. Escaneó mi NAS Unraid de 12 TB, encontró todas mis descargas dobles y me ayudó a liberar casi 800 GB conservando solo las versiones 4K.",
                "zh": "重复查找功能无与伦比。它扫描了我 12TB 的 Unraid NAS，找到了我所有的重复下载，并通过仅保留 4K 版本帮助我腾出了将近 800 GB 的空间。"
            },
            "role": {"en": "Chris V. • NAS User", "fr": "Chris V. • Utilisateur NAS", "es": "Chris V. • Usuario de NAS", "zh": "Chris V. • NAS 用户"}
        }
    }
}

langs = ['en', 'fr', 'es', 'zh']

for lang in langs:
    filepath = os.path.join(base_dir, f'{lang}.json')
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if 'testimonials' not in data:
        data['testimonials'] = {}
        
    data['testimonials']['title'] = testimonials_data['title'][lang]
    data['testimonials']['trustedBy'] = testimonials_data['trustedBy'][lang]
    data['testimonials']['joinUsers'] = testimonials_data['joinUsers'][lang]
    data['testimonials']['startTrial'] = testimonials_data['startTrial'][lang]
    
    new_quotes = {}
    for idx, key in enumerate(testimonials_data['quotes'].keys()):
        new_quotes[str(idx)] = {
            "text": testimonials_data['quotes'][key]['text'][lang],
            "role": testimonials_data['quotes'][key]['role'][lang]
        }
        
    data['testimonials']['quotes'] = new_quotes
            
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Testimonials updated successfully across all languages!")
