import json
import os

locales = {
    'en': {
        "legalAttribution": "Metadata, subtitles, and artwork provided by TheTVDB, TVmaze, and OpenSubtitles.",
    },
    'fr': {
        "legalAttribution": "Métadonnées, sous-titres et affiches fournis par TheTVDB, TVmaze et OpenSubtitles.",
    },
    'es': {
        "legalAttribution": "Metadatos, subtítulos y carátulas proporcionados por TheTVDB, TVmaze y OpenSubtitles.",
    },
    'zh': {
        "legalAttribution": "元数据、字幕和海报由 TheTVDB、TVmaze 和 OpenSubtitles 提供。",
    }
}

base_path = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'

for lang, strings in locales.items():
    file_path = os.path.join(base_path, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        data['footer']['legalAttribution'] = strings['legalAttribution']
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Corrected legalAttribution for {lang}.json")

print("Done correcting footer locales.")
