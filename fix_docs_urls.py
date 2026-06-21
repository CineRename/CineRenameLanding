import os
import re

docs_dir = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/docs'

for root, _, files in os.walk(docs_dir):
    for file in files:
        if file.endswith('.md') or file.endswith('.mts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = content
            new_content = new_content.replace('https://cinerename.app/fr/download', '/download')
            new_content = new_content.replace('https://cinerename.app/fr/pricing', '/#pricing')

            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated URLs in {path}")
