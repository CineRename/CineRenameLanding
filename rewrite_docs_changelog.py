import re
import os

langs = ['docs/changelog.md', 'docs/fr/changelog.md', 'docs/es/changelog.md', 'docs/zh/changelog.md']

for path in langs:
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    # Remove the ::: tip ... ::: block
    text = re.sub(r'::: tip.*?:::\n+', '', text, flags=re.DOTALL)
    
    # Replace the "En cours - v0.2" headers
    text = re.sub(r'## In progress — `v0.2`', '## v0.5.0 — Initial Release', text)
    text = re.sub(r'## En cours — `v0.2`', '## v0.5.0 — Version initiale', text)
    text = re.sub(r'## En progreso — `v0.2`', '## v0.5.0 — Versión inicial', text)
    text = re.sub(r'## 进行中 — `v0.2`', '## v0.5.0 — 初始版本', text)
    
    # Replace "Major New Features" with "Features"
    text = re.sub(r'### Major New Features.*?\n', '### Features\n', text)
    text = re.sub(r'### Nouvelles fonctionnalités majeures.*?\n', '### Fonctionnalités\n', text)
    text = re.sub(r'### Nuevas funciones principales.*?\n', '### Funciones\n', text)
    text = re.sub(r'### 主要新功能.*?\n', '### 功能\n', text)
    
    # Remove the "Previous branch improvements" subheaders to flatten the list
    text = re.sub(r'### Previous branch improvements\n+', '', text)
    text = re.sub(r'### Améliorations antérieures de la branche\n+', '', text)
    text = re.sub(r'### Mejoras de la rama anterior\n+', '', text)
    text = re.sub(r'### 之前分支的改进\n+', '', text)
    
    # Remove the v0.1.0 header
    text = re.sub(r'## v0.1.0 — .*?\n+', '', text)
    
    # Update roadmap versions (v0.3 -> v0.6, v0.4 -> v0.7, v0.5 -> v0.8)
    text = text.replace('**v0.3**', '**v0.6**')
    text = text.replace('**v0.4**', '**v0.7**')
    text = text.replace('**v0.5**', '**v0.8**')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"Updated {path}")
