import json
import os

locales = {
    'en': {
        "title": "CineRename vs FileBot | The Modern Alternative",
        "description": "Compare CineRename with FileBot. Discover why CineRename is the fastest, most modern alternative for renaming your movies and TV shows.",
        "keywords": "filebot alternative, cinerename vs filebot, media renamer, sonarr"
    },
    'fr': {
        "title": "CineRename vs FileBot | L'Alternative Moderne",
        "description": "Comparez CineRename et FileBot. Découvrez pourquoi CineRename est l'alternative la plus rapide et moderne pour renommer vos films et séries.",
        "keywords": "alternative filebot, cinerename vs filebot, renommer films"
    },
    'es': {
        "title": "CineRename vs FileBot | La Alternativa Moderna",
        "description": "Compara CineRename con FileBot. Descubre por qué CineRename es la alternativa más rápida y moderna para renombrar tus películas y series.",
        "keywords": "alternativa filebot, cinerename vs filebot, renombrar series"
    },
    'zh': {
        "title": "CineRename vs FileBot | 现代化的替代方案",
        "description": "比较 CineRename 与 FileBot。了解为什么 CineRename 是重命名电影和电视节目的最快、最现代化的替代方案。",
        "keywords": "filebot 替代品, cinerename vs filebot, 媒体重命名"
    }
}

base_path = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'

for lang, strings in locales.items():
    file_path = os.path.join(base_path, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        if 'metadata' not in data:
            data['metadata'] = {}
            
        data['metadata']['vsFilebot'] = strings
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated metadata for {lang}.json")

print("Done updating vsFilebot metadata locales.")
