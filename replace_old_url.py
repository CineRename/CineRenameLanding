import os

files_to_update = [
    ".env.local.example",
    "README.md",
    "docs/.vitepress/config.mts",
    "fix_docs_urls.py",
    "messages/en.json",
    "messages/es.json",
    "messages/fr.json",
    "messages/zh.json"
]

old_url = "https://cinerenamelanding.epikaigle444.workers.dev"
new_url = "https://cinerename.app"

for file_name in files_to_update:
    path = os.path.join('/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding', file_name)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if old_url in content:
            content = content.replace(old_url, new_url)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file_name}")

print("Done replacing old URL.")
