import os

replacements = {
    # English
    "Help → About": "Settings → Support → Copy Config",
    "Settings → Advanced → Open logs folder": "Settings → Support → Copy Logs",
    
    # French
    "Aide → À propos": "Réglages → Support → Copier la Config",
    "Réglages → Avancé → Ouvrir le dossier de logs": "Réglages → Support → Copier les Logs",
    
    # Spanish
    "Ayuda → Acerca de": "Ajustes → Soporte → Copiar Configuración",
    "Ajustes → Avanzado → Abrir la carpeta de logs": "Ajustes → Soporte → Copiar Logs",
    
    # Chinese
    "帮助 → 关于": "设置 → 支持 → 复制配置",
    "设置 → 高级 → 打开日志文件夹": "设置 → 支持 → 复制日志"
}

docs_dir = "/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/docs"

for root, dirs, files in os.walk(docs_dir):
    for file in files:
        if file.endswith(".md"):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
                
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")

print("Documentation updated to reflect the new Support tab in Settings.")
