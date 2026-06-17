import json
import os

locales = {
    'en': {
        "legalAttribution": "Metadata and artwork from TheMovieDB, TheTVDB and Trakt. This product uses the TMDB API but is not endorsed or certified by TMDB.",
        "vsFilebot": "vs FileBot"
    },
    'fr': {
        "legalAttribution": "Métadonnées et images fournies par TheMovieDB, TheTVDB et Trakt. Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par TMDB.",
        "vsFilebot": "vs FileBot"
    },
    'es': {
        "legalAttribution": "Metadatos y carátulas proporcionados por TheMovieDB, TheTVDB y Trakt. Este producto utiliza la API de TMDB pero no está respaldado ni certificado por TMDB.",
        "vsFilebot": "vs FileBot"
    },
    'zh': {
        "legalAttribution": "元数据和艺术作品来自 TheMovieDB、TheTVDB 和 Trakt。本产品使用 TMDB API，但未获得 TMDB 的认可或认证。",
        "vsFilebot": "vs FileBot"
    }
}

base_path = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'

for lang, strings in locales.items():
    file_path = os.path.join(base_path, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        if 'footer' not in data:
            data['footer'] = {}
        
        data['footer']['legalAttribution'] = strings['legalAttribution']
        
        if 'links' not in data['footer']:
            data['footer']['links'] = {}
            
        data['footer']['links']['vsFilebot'] = strings['vsFilebot']
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated {lang}.json")

print("Done updating footer locales.")
