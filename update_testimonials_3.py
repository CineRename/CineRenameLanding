import json
import os

base_dir = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'

langs = ['en', 'fr', 'es', 'zh']

for lang in langs:
    filepath = os.path.join(base_dir, f'{lang}.json')
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if 'testimonials' in data and 'quotes' in data['testimonials']:
        quotes = data['testimonials']['quotes']
        
        # User wants to keep #1 (Dave M), #2 (Sarah T), #4 (Mike B)
        # In the original dictionary, these were keys "0", "1", and "3"
        keep_keys = ["0", "1", "3"]
        
        new_quotes = {}
        new_index = 0
        for k in keep_keys:
            if k in quotes:
                new_quotes[str(new_index)] = quotes[k]
                new_index += 1
                
        data['testimonials']['quotes'] = new_quotes
            
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

print("Testimonials updated successfully to keep only 3!")
