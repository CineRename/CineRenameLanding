import os
import json
import re

base_dir = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding'

replacements = {
    'autoTrim': 'cineRename',
    'AutoTrim': 'CineRename',
    'trimly': 'cinerename',
    'Trimly': 'CineRename',
    'rawClip': 'singleFile',
    'manualFCP': 'manualRename',
    'youtubers': 'cinephiles',
    'podcasters': 'seriesFans',
    'teachers': 'nasAdmins',
    'freelancers': 'seedboxUsers',
    'teams': 'families',
    'anyCreator': 'anyUser',
    "'directRender'": "'cli'",
    '"directRender"': '"cli"'
}

fr_replacements = {
    "Glisser. Déposer. Bibliothèque prête.": "Glissez. Déposez. Bibliothèque prête.",
    "Historique et undo en un clic": "Historique et annulation en un clic",
    '"badge": "Le plus choisi"': '"badge": "Le plus populaire"',
    "Doublons avancés et automatisation réservés au Pro": "Doublons avancés et automatisation réservés à la version Pro",
    "Ancienne interface Java": "Interface technique datée (Java)",
    '"keywords": "renommer films, renommer séries, renommer animes, plex, jellyfin, emby, sous-titres opensubtitles, thetvdb, tvmaze, organiser bibliothèque vidéo, doublons vidéo, undo rename, cinerename"': '"keywords": "renommer films, renommer séries, renommer animes, plex, jellyfin, emby, sous-titres opensubtitles, thetvdb, tvmaze, organiser bibliothèque vidéo, doublons vidéo, undo rename, cinerename, alternative filebot, organiser NAS"'
}

quickjs_en = '''      "cli": {
        "title": "CLI for NAS / Seedbox",
        "description": "Preview / rename / organize / auto commands to script your servers and automate without UI."
      },
      "quickJs": {
        "title": "Built-in JavaScript Engine",
        "description": "Go beyond simple tokens. Use JavaScript (regex, conditionals) to create custom renaming rules."
      },'''

quickjs_fr = '''      "cli": {
        "title": "CLI pour NAS / Seedbox",
        "description": "Commandes preview / rename / organize / auto pour scripter vos serveurs et automatiser sans interface."
      },
      "quickJs": {
        "title": "Moteur JavaScript intégré",
        "description": "Allez plus loin que les simples balises. Utilisez du JavaScript (regex, conditions) pour créer vos propres règles de renommage sur-mesure."
      },'''

for root, _, files in os.walk(base_dir):
    if 'node_modules' in root or '.git' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith('.jsx') or file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.json'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
            
            if file == 'fr.json':
                for old, new in fr_replacements.items():
                    new_content = new_content.replace(old, new)
                
                # Regex replace the CLI block to include QuickJS
                new_content = re.sub(r'      "cli": \{\s*"title": "CLI pour NAS / Seedbox",\s*"description": "Commandes preview / rename / organize / auto pour scripter vos serveurs et automatiser sans interface."\s*\},', quickjs_fr, new_content)

            elif file in ['en.json', 'es.json', 'zh.json']:
                # For others, we might not match the exact FR text, so we'll just parse the json or do a generic fallback if needed.
                # Actually, in other languages, the text will be different. Let's just do a hacky regex or inject it.
                pass

            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {path}")
