---
description: "Foire Aux Questions CineRename : tarifs, fonctionnement 100% local, numérotation des animes, formats vidéo supportés et licence Pro."
---

# FAQ

## Sur quels systèmes CineRename fonctionne-t-il ?

CineRename est une application native pour **Windows 10/11**, **macOS 11+** et **Linux**. Les builds Linux desktop sont préparés en AppImage, deb et rpm, avec des builds headless séparés pour NAS / Docker.

## Mes fichiers quittent-ils mon ordinateur ?

L'analyse des vidéos, le renommage, le déplacement, les checksums et le réglage des sous-titres se font localement. Les fournisseurs de métadonnées/sous-titres reçoivent des données de recherche comme les titres, IDs, langues ou une empreinte OpenSubtitles, plutôt que la vidéo elle-même. La validation des licences contacte le service de licence et les intégrations configurées contactent leurs services. Les builds de distribution envoient aussi des événements d'utilisation et d'attribution entre le site et l'application à PostHog.

## Puis-je annuler un renommage par erreur ?

L'onglet [Historique](/fr/history) enregistre les lots de renommage et indique s'ils peuvent être annulés. L'annulation nécessite un lot terminé et des fichiers toujours disponibles et inchangés ; les limites sont détaillées sur la page Historique.

## CineRename est-il compatible avec Plex / Jellyfin / Emby / Kodi ?

Oui. CineRename inclut des profils prêts à l'emploi pour Plex, Jellyfin et Kodi. Emby suit généralement les conventions Jellyfin, donc ces sorties sont aussi compatibles. Voir [Plex / Jellyfin / Emby](/fr/media-servers) pour les détails.

## Est-ce que CineRename gère les fichiers ZIP / RAR ?

Oui, avec une précision importante : CineRename extrait les archives supportées dans un cache local avant de traiter les vidéos. Il ne renomme pas les fichiers directement à l'intérieur de l'archive compressée.

L'app desktop supporte les familles ZIP, RAR, 7z, tar, gzip, bzip2 et xz. Le build statique headless/NAS exclut volontairement RAR pour rester portable, mais garde ZIP, 7z, tar, gzip, bzip2 et xz.

*(Note : Les archives protégées par mot de passe ne sont pas supportées. Par ailleurs, l'extraction de très grosses archives peut prendre du temps et nécessiter le double d'espace disque temporairement).*

## Existe-t-il une CLI ?

Oui. Voir la page [CLI](/fr/cli). Disponible sur les trois OS, parfaite pour automatiser via Sonarr / Radarr / cron / scripts NAS.

## Y a-t-il une différence entre Gratuit et Pro ?

| Fonctionnalité | Gratuit | Pro |
| --- | --- | --- |
| Studio (renommage) | ✅ 2 fichiers / jour | ✅ illimité |
| Aperçu Avant / Après | ✅ | ✅ |
| Matching de métadonnées basique | ✅ | ✅ |
| Recherches de sous-titres OpenSubtitles | ✅ 2 recherches / jour | ✅ illimité |
| Doublons multi-qualités | ❌ | ✅ |
| Pipeline d'automatisation | ❌ | ✅ |
| Support prioritaire | ❌ | ✅ |
| CLI / commandes headless | ⚠️ mêmes limites gratuites | ✅ |

Voir la page [Tarifs](/fr/pro) pour les détails sur la licence Pro.

## Puis-je continuer à utiliser CineRename gratuitement ?

Oui. La version gratuite n'a **pas de limite de temps** et comprend la prévisualisation illimitée, **2 fichiers renommés par jour** et **2 recherches manuelles de sous-titres par jour**. L'exécution illimitée et le pipeline automatique nécessitent Pro.

## Comment fonctionne la chasse aux doublons ?

CineRename détecte les copies multiples d'un même film/épisode en se basant sur :

- titre + année (films) ou série + saison + épisode (séries)
- résolution, codec, source, bitrate, audio, taille pour scorer la qualité

Il vous propose de garder la meilleure version. Aucune suppression sans validation. Voir [Doublons](/fr/duplicates).

## CineRename peut-il fonctionner 100% hors-ligne ?

Oui et non. L'application en elle-même (l'interface, le parsing natif en Rust des noms de fichiers, l'évaluation des modèles JavaScript via QuickJS, l'historique, le nettoyage des doublons locaux) fonctionne sans aucune connexion internet.

Cependant, les fonctionnalités de correspondance (récupération des titres officiels, IDs et numéros d'épisodes) nécessitent d'interroger le fournisseur de métadonnées configuré. Sans internet, CineRename nettoiera le nom du fichier via son parseur interne natif, mais ne pourra pas garantir le titre officiel complet. Le téléchargement de sous-titres est, bien sûr, impossible hors-ligne.

## Que se passe-t-il si TheTVDB / OpenSubtitles est down ?

CineRename continue de fonctionner :
- Les **renommages déjà prévisualisés** dans le Studio peuvent être validés (la metadata est en cache).
- Les **nouveaux fichiers** affichent un avertissement en cas de hits absents — vous pouvez quand même renommer manuellement.
- Le **mode automatique** journalise l'erreur proprement ; vous pouvez relancer la preview ou le pipeline quand le provider revient.

## J'ai trouvé un bug. Comment vous le signaler ?

Écrivez à [cinerename@gmail.com](mailto:cinerename@gmail.com). Joignez si possible :

- Votre OS et la version de CineRename (`Préférences → Support → Copier la config`)
- Un exemple de nom de fichier qui pose problème
- Le log (`Préférences → Support → Copier les logs`)

## Comment puis-je contribuer ?

- **Signaler des bugs** ou demander des fonctionnalités par email
- **Suggérer des améliorations** de presets de nommage
- **Traduire l'interface** dans une nouvelle langue
- **Acheter une licence Pro** soutient directement le développement
