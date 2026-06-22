import json
import os

base = 'messages'
replacements = {
    'fr.json': ('débloquer définitivement la version Pro', 'débloquer la version Pro'),
    'en.json': ('permanently unlock the Pro version', 'unlock the Pro version'),
    'es.json': ('desbloquear permanentemente la versión Pro', 'desbloquear la versión Pro'),
    'zh.json': ('永久解锁 Pro 版本', '解锁 Pro 版本')
}

for filename, (old, new) in replacements.items():
    path = os.path.join(base, filename)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # Target is faq.questions.8.a
        try:
            current_answer = data['faq']['questions']['8']['a']
            data['faq']['questions']['8']['a'] = current_answer.replace(old, new)
        except KeyError:
            print(f"Could not find question 8 in {filename}")
            
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated {filename}")

print("Done updating FAQ answers.")
