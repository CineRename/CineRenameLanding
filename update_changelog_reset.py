import json
import os

base_path = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'

badges = {
    'en': 'Initial Release',
    'fr': 'Version initiale',
    'es': 'Versión inicial',
    'zh': '初始版本'
}

for lang in ['en', 'fr', 'es', 'zh']:
    file_path = os.path.join(base_path, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        if 'changelog' in data:
            if 'v01' in data['changelog']:
                del data['changelog']['v01']
            if 'v02' in data['changelog']:
                del data['changelog']['v02']
            if 'v05' in data['changelog']:
                data['changelog']['v05']['badge'] = badges[lang]
                
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated changelog in {lang}.json")

print("Done updating changelog locales.")
