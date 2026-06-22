import json
import os

base_path = '/home/kirito/Documents/Informatique/Coding/CineRename/Siteweb/CineRenameLanding/messages'
translations = {
    'fr': {
        'deliveryNote': "Livraison instantanée : vous recevrez votre clé de licence par e-mail immédiatement après l'achat pour débloquer l'application.",
        'faqQ': "Comment vais-je recevoir ma licence Pro ?",
        'faqA': "Après l'achat, vous recevrez immédiatement une clé de licence par e-mail. Il vous suffit de la saisir dans l'application pour débloquer définitivement la version Pro."
    },
    'en': {
        'deliveryNote': "Instant delivery: you will receive your license key by email immediately after purchase to unlock the application.",
        'faqQ': "How will I receive my Pro license?",
        'faqA': "After purchase, you will immediately receive a license key by email. Simply enter it into the application to permanently unlock the Pro version."
    },
    'es': {
        'deliveryNote': "Entrega instantánea: recibirá su clave de licencia por correo electrónico inmediatamente después de la compra para desbloquear la aplicación.",
        'faqQ': "¿Cómo recibiré mi licencia Pro?",
        'faqA': "Después de la compra, recibirá inmediatamente una clave de licencia por correo electrónico. Simplemente introdúzcala en la aplicación para desbloquear permanentemente la versión Pro."
    },
    'zh': {
        'deliveryNote': "即时发货：购买后您将立即通过电子邮件收到许可证密钥，以解锁应用程序。",
        'faqQ': "我将如何收到我的 Pro 许可证？",
        'faqA': "购买后，您将立即通过电子邮件收到许可证密钥。只需将其输入到应用程序中即可永久解锁 Pro 版本。"
    }
}

for lang, data_dict in translations.items():
    file_path = os.path.join(base_path, f'{lang}.json')
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # Add to pricing
        if 'pricing' in data:
            data['pricing']['deliveryNote'] = data_dict['deliveryNote']
            
        # Add to FAQ
        if 'faq' in data and 'questions' in data['faq']:
            # Find next index
            next_idx = str(len(data['faq']['questions']))
            data['faq']['questions'][next_idx] = {
                "question": data_dict['faqQ'],
                "answer": data_dict['faqA']
            }
            
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated {lang}.json")

print("Done updating translations for delivery info.")
