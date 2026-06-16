import json
import os

langs = ['en', 'fr', 'es', 'zh']
base_dir = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'

extended_texts = {
    'en': "This feature has been specifically designed to save you maximum time. It integrates seamlessly into your workflow and ensures consistent, error-free results for your entire media library.",
    'fr': "Cette fonctionnalité a été spécifiquement pensée pour vous faire gagner un maximum de temps. Elle s'intègre parfaitement à votre flux de travail et garantit des résultats cohérents et sans erreur pour toute votre bibliothèque multimédia.",
    'es': "Esta función ha sido diseñada específicamente para ahorrarle el máximo tiempo posible. Se integra perfectamente en su flujo de trabajo y garantiza resultados consistentes y sin errores para toda su biblioteca multimedia.",
    'zh': "此功能专门设计旨在为您节省最多时间。它无缝集成到您的工作流程中，并确保为您的整个媒体库提供一致、无错误的结果。"
}

for lang in langs:
    filepath = os.path.join(base_dir, f'{lang}.json')
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    perks = data.get('perksGrid', {}).get('perks', {})
    for key, value in perks.items():
        if 'extendedDescription' not in value:
            value['extendedDescription'] = extended_texts[lang]
            
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Done updating json files!")
