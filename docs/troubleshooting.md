# Résolution de problèmes

## L'application ne se lance pas

### Windows

- **SmartScreen bloque l'exécution** : clic sur **Informations complémentaires** → **Exécuter quand même**. L'application sera ajoutée à la liste de confiance pour les prochains lancements.
- **Erreur WebView2** : assurez-vous que `Microsoft Edge WebView2 Runtime` est installé (préinstallé sur Windows 11, à installer manuellement sur Windows 10 anciennes versions).

### macOS

- **« CineRename ne peut pas être ouvert car le développeur ne peut pas être vérifié »** :
  - Faites **clic droit sur l'icône → Ouvrir** (ne marchera qu'une fois)
  - Ou : **Préférences Système → Confidentialité et sécurité → Ouvrir quand même**

### Linux

- **AppImage ne se lance pas** : vérifiez `chmod +x CineRename.AppImage`. Si l'erreur mentionne FUSE, installez `libfuse2` (`sudo apt install libfuse2` sur Ubuntu).
- **Erreur WebKit** : sur certaines distros minimales, installez `webkit2gtk-4.0` ou `webkit2gtk-4.1`.

## Plex / Jellyfin ne reconnaît pas mes fichiers

1. Vérifiez que la **structure de dossiers** correspond aux conventions du serveur (voir [Plex / Jellyfin / Emby](/media-servers)).
2. Vérifiez que le **titre + année** sont reconnus par TheTVDB ou TMDB. Si non, ajoutez l'ID explicitement (`{tmdb-12345}`).
3. Lancez un **scan complet** en forçant la mise à jour des metadonnées.
4. Si rien ne marche, sortez le fichier de la bibliothèque, scanner, remettez, rescannez (Plex Dance).

## Les sous-titres ne se téléchargent pas

- Vérifiez votre **clé API OpenSubtitles** (Réglages → Providers).
- Le **hash vidéo** peut ne rien retrouver pour des fichiers très peu courants. Le fallback metadata prend le relais — vérifiez que titre + saison + épisode sont bien identifiés dans le Studio.
- Vérifiez le **rate limit** : OpenSubtitles limite le nombre de téléchargements par jour selon votre plan.

## Le mode automatique tourne en boucle

Si CineRename retraite le même fichier à chaque cycle :
- Vérifiez que la **bibliothèque finale** est différente du **dossier source**.
- Le watcher devrait être configuré sur le dossier source uniquement.
- Si vous utilisez `rsync` pour pousser dans le dossier source, assurez-vous qu'il termine ses copies avant que CineRename watche (utiliser un sous-dossier `.in-progress`).

## Le renommage est très lent

- Sur **disque dur mécanique**, les opérations massives sont I/O-bound. Comptez ~5-10s par 100 fichiers.
- Sur **NAS via SMB / NFS**, la latence multiplie les opérations. Pour de très gros volumes, montez le partage en local (sshfs / nfs avec `noatime`).
- Vérifiez les **logs** (`Réglages → Avancé → Verbosité = debug`) pour identifier l'étape lente.

## Erreur « accès refusé »

- Sur **Windows**, exécutez l'application en tant qu'administrateur (clic droit → **Exécuter en tant qu'administrateur**).
- Sur **macOS**, Tauri v2 demande des permissions explicites. Allez dans **Préférences Système → Confidentialité → Accès complet au disque** et autorisez CineRename.
- Sur **Linux**, vérifiez les permissions du dossier (`ls -la`) et appartenance utilisateur.

## L'undo a échoué

Voir la section dédiée dans [Historique & Undo](/history#limitations-de-l-undo). Causes fréquentes :

- Fichier supprimé manuellement en dehors de CineRename
- Volume source non monté
- Fichier renommé après le passage de CineRename

## Comment activer les logs détaillés ?

**Réglages → Avancé → Verbosité** :

- `error` — uniquement les erreurs (par défaut)
- `warn` — erreurs + warnings
- `info` — événements clés
- `debug` — détails utiles pour diagnostiquer
- `trace` — extrêmement verbeux, pour le développement

Ou via la variable d'environnement `CINERENAME_LOG_LEVEL=debug`.

## Où sont mes données ?

| OS | Dossier de config | Logs |
| --- | --- | --- |
| Windows | `%APPDATA%\CineRename\` | `%APPDATA%\CineRename\logs\` |
| macOS | `~/Library/Application Support/CineRename/` | idem `/logs/` |
| Linux | `~/.config/CineRename/` | idem `/logs/` |

Vous pouvez supprimer ces dossiers pour repartir de zéro (perd l'historique et les presets).

## Je n'ai pas trouvé ma réponse


- Écrivez à [cinerename@gmail.com](mailto:cinerename@gmail.com) avec :
  - Votre OS et la version de CineRename
  - Une description précise du problème
  - Idéalement les logs (`Réglages → Avancé → Ouvrir le dossier de logs`)
