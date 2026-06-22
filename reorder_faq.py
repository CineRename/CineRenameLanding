import json
import os

base_path = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'
locales = ['en', 'fr', 'es', 'zh']

for lang in locales:
    file_path = os.path.join(base_path, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        if 'faq' in data and 'questions' in data['faq']:
            old_q = data['faq']['questions']
            
            # Extract old items
            items = []
            for i in range(8):
                key = str(i)
                if key in old_q:
                    items.append(old_q[key])
                else:
                    items.append(None)
            
            # Rearrange
            # old_0 -> new_5 (6th position)
            # others shift up
            new_q = {}
            if len(items) >= 6 and items[0] is not None:
                new_q["0"] = items[1]
                new_q["1"] = items[2]
                new_q["2"] = items[3]
                new_q["3"] = items[4]
                new_q["4"] = items[5]
                new_q["5"] = items[0]
                new_q["6"] = items[6]
                new_q["7"] = items[7]
                
                # Cleanup missing ones
                data['faq']['questions'] = {k: v for k, v in new_q.items() if v is not None}
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                print(f"Reordered FAQ in {lang}.json")

print("Done reordering FAQs.")
