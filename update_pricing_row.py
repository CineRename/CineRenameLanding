import json
import os

base_path = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'
replacements = {
    'fr': "Version gratuite + Mode Pro abordable",
    'en': "Free version + Affordable Pro mode",
    'es': "Versión gratuita + Modo Pro asequible",
    'zh': "免费版本 + 实惠的专业模式"
}

for lang, new_text in replacements.items():
    file_path = os.path.join(base_path, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        try:
            # The structure is likely under comparison -> rows -> ...
            for row in data['comparison']['rows']:
                if row.get('filebot', '').startswith(('$6.00/yr', '6,00', '6.00')):
                    # This is the pricing row
                    row['cineRename'] = new_text
        except KeyError:
            pass
            
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated {lang}.json")

print("Done updating pricing text.")
