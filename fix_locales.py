import os
import json

base_dir = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'

quickjs_en = {
    "title": "Built-in JavaScript Engine",
    "description": "Go beyond simple tokens. Use JavaScript (regex, conditionals) to create custom renaming rules."
}

for file in ['en.json', 'es.json', 'zh.json']:
    path = os.path.join(base_dir, file)
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if 'perksGrid' in data and 'perks' in data['perksGrid']:
        if 'quickJs' not in data['perksGrid']['perks']:
            data['perksGrid']['perks']['quickJs'] = quickjs_en
            
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"Added quickJs to {file}")
