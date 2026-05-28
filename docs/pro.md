# Licence Pro & Premium

CineRename est gratuit à télécharger et peut être utilisé **indéfiniment sans payer**, sans limite du nombre de renommages dans le Studio.

Toutefois, pour les utilisateurs avancés, les administrateurs de serveurs NAS et ceux qui souhaitent automatiser l'intégralité de leur pipeline, nous proposons une **Licence Pro**.

## Comparatif Gratuit vs Pro

| Fonctionnalité | Version Gratuite | Version Pro |
| --- | :---: | :---: |
| Studio (renommage manuel) | ✅ Illimité | ✅ Illimité |
| Aperçu Avant / Après | ✅ | ✅ |
| Métadonnées TheTVDB / TVmaze | ✅ | ✅ |
| Appairage linéaire (VOB/BDMV) | ✅ | ✅ |
| **Sous-titres OpenSubtitles** | ❌ | ✅ |
| **Doublons multi-qualités** | ❌ | ✅ |
| **Mode Automatique (Pipeline)** | ❌ | ✅ |
| **CLI complète (auto, subs, etc.)**| ⚠️ Partielle | ✅ |
| **Synchronisation cloud des règles**| ❌ | ✅ *(À venir)* |
| **Support prioritaire** | ❌ | ✅ |

::: info Politique de licence juste
La licence Pro n'est liée à aucun abonnement obligatoire (bien qu'une option mensuelle/annuelle existe, l'achat **Pro à vie** est le plus populaire). Vous payez une fois, et l'application vous appartient. 
Pas de DRM abusif : la licence est valide pour **2 appareils simultanément** (par exemple, votre PC principal et votre NAS).
:::

## Les fonctionnalités débloquées

### 1. Sous-titres OpenSubtitles
La version Pro débloque l'onglet et le module `Sous-titres`. Il permet de chercher et télécharger automatiquement les sous-titres synchronisés en masse pour l'ensemble d'un dossier, et expose le visualiseur de sous-titres intégré.

### 2. Chasse aux doublons
Si vous avez de multiples versions d'un même film (1080p, 4K, encodages différents), le module Doublons Pro détecte automatiquement les collisions de noms de sortie et vous permet d'analyser, scorer et nettoyer les versions obsolètes en un clic.

### 3. Mode Automatique (CLI & GUI)
C'est le "Saint Graal" pour les serveurs Plex. La version Pro permet d'utiliser le mode "Pipeline" qui enchaîne : **Renommage → Sous-titres → Nettoyage → Déplacement**. Ce mode est utilisable dans le logiciel, mais surtout via la commande CLI `cinerename auto`, rendant le logiciel intégrable à Radarr, Sonarr, ou un cronjob NAS.

## Comment activer sa licence

1. Rendez-vous sur la [page des Tarifs](https://cinerename.com/#pricing) et achetez la version Pro de votre choix.
2. Vous recevrez une **clé de licence** (gérée par LemonSqueezy) par email.
3. Ouvrez CineRename, allez dans **Réglages → Licence Pro**.
4. Collez votre clé de licence et cliquez sur **Activer**.

L'application va valider la clé en ligne et débloquer instantanément les modules grisés. Une fois validée, l'application met en cache la validation : elle continuera de fonctionner même si vous perdez internet (validation périodique transparente).

## Foire aux questions (Licence)

**Est-ce que je perds mes données si je passe Pro ?**
Non, l'historique et la base SQLite restent exactement les mêmes. La licence débloque simplement les boutons de l'interface.

**Que se passe-t-il si je change de PC ?**
Vous pouvez désactiver votre licence sur un ancien appareil via les réglages, ce qui libérera le "slot" (sur les 2 disponibles) pour votre nouveau PC. En cas de crash disque, un panel web LemonSqueezy vous permet de purger vos activations à distance.
