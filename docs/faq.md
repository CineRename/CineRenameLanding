# FAQ

## Sur quels systèmes CineRename fonctionne-t-il ?

CineRename est une application native pour **Windows 10/11**, **macOS 11+** et **Linux** (via AppImage). Le moteur est écrit en Rust avec Tauri v2, donc les performances sont équivalentes à du natif sur les trois OS.

## Mes fichiers quittent-ils mon ordinateur ?

**Non.** Tout le traitement (analyse, renommage, calcul de hash, déplacement) se fait localement. Les seules requêtes réseau concernent les **bases de métadonnées publiques** (TheTVDB, TVmaze, OpenSubtitles) et ne contiennent que des titres / hashes — jamais les fichiers eux-mêmes.

## Puis-je annuler un renommage par erreur ?

Oui. L'onglet [Historique](/history) garde la trace de chaque opération et permet d'annuler en un clic, même plusieurs jours après.

## CineRename est-il compatible avec Plex / Jellyfin / Emby ?

Oui. CineRename produit des noms et une structure de dossiers conformes à ces serveurs. Voir [Plex / Jellyfin / Emby](/media-servers) pour les détails.

## Est-ce que CineRename gère les fichiers ZIP / RAR ?

Oui. CineRename peut lire à l'intérieur des archives ZIP et RAR pour identifier le contenu. Selon vos réglages, il peut soit :

- Extraire automatiquement les vidéos avant traitement,
- Traiter le contenu sans extraction (lecture indexée).

*(Note : Les archives protégées par mot de passe ne sont pas supportées. Par ailleurs, l'extraction de très grosses archives peut prendre du temps et nécessiter le double d'espace disque temporairement).*

## Existe-t-il une CLI ?

Oui. Voir la page [CLI](/cli). Disponible sur les trois OS, parfaite pour automatiser via Sonarr / Radarr / cron / scripts NAS.

## Y a-t-il une différence entre Gratuit et Pro ?

| Fonctionnalité | Gratuit | Pro |
| --- | --- | --- |
| Studio (renommage) | ✅ illimité | ✅ illimité |
| Aperçu Avant / Après | ✅ | ✅ |
| Matching de métadonnées basique | ✅ | ✅ |
| Sous-titres OpenSubtitles | ❌ | ✅ |
| Doublons multi-qualités | ❌ | ✅ |
| Mode automatique pipeline | ❌ | ✅ |
| Synchro cloud des règles | ❌ | ✅ |
| Support prioritaire | ❌ | ✅ |
| CLI (toutes commandes) | ⚠️ certaines | ✅ |

Voir la page [Tarifs](/pro) pour les détails sur la licence Pro.

## Puis-je continuer à utiliser CineRename gratuitement ?

Oui. La version gratuite n'a **pas de limite de temps**. Vous pouvez renommer autant de fichiers que vous voulez. Les fonctions Pro restent désactivées tant que vous n'avez pas activé une licence.

## Comment fonctionne la chasse aux doublons ?

CineRename détecte les copies multiples d'un même film/épisode en se basant sur :

- titre + année (films) ou série + saison + épisode (séries)
- résolution, codec, source, bitrate, audio, taille pour scorer la qualité

Il vous propose de garder la meilleure version. Aucune suppression sans validation. Voir [Doublons](/duplicates).

## CineRename peut-il fonctionner 100% hors-ligne ?

Oui et non. L'application en elle-même (l'interface, le parsing intelligent des noms via QuickJS, l'historique, le nettoyage des doublons locaux) fonctionne parfaitement sans aucune connexion internet. 

Cependant, les fonctionnalités de correspondance (récupération des vrais titres officiels et des numéros d'épisodes) nécessitent d'interroger TheTVDB ou TVmaze. Sans internet, CineRename nettoiera le nom du fichier (retrait des tags de team de release, etc.) via son moteur interne, mais ne pourra pas garantir le titre officiel complet. Le téléchargement de sous-titres est, bien sûr, impossible hors-ligne.

## Que se passe-t-il si TheTVDB / OpenSubtitles est down ?

CineRename continue de fonctionner :
- Les **renommages déjà prévisualisés** dans le Studio peuvent être validés (la metadata est en cache).
- Les **nouveaux fichiers** affichent un avertissement en cas de hits absents — vous pouvez quand même renommer manuellement.
- Le **mode automatique** journalise l'erreur et reprend les fichiers en échec quand le provider revient.

## J'ai trouvé un bug. Comment vous le signaler ?

Ouvrez une issue sur [GitHub](https://github.com/Epikaigle/CineRename/issues), ou écrivez à [cinerename@gmail.com](mailto:cinerename@gmail.com). Joignez si possible :

- Votre OS et la version de CineRename (`Aide → À propos`)
- Un exemple de nom de fichier qui pose problème
- Le log (`Réglages → Avancé → Ouvrir le dossier de logs`)

## Comment puis-je contribuer ?

- **Signaler des bugs** ou demander des fonctionnalités sur GitHub
- **Suggérer des améliorations** de presets de nommage
- **Traduire l'interface** dans une nouvelle langue
- **Acheter une licence Pro** soutient directement le développement
