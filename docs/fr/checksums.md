# Checksums

CineRename peut calculer et vérifier des empreintes cryptographiques de vos fichiers — utile pour détecter une corruption disque, valider un téléchargement, ou garantir l'intégrité d'une archive de bibliothèque.

## Calculer des checksums

Dans le Studio, sélectionnez une ou plusieurs entrées puis cliquez sur **Calculer checksums** (toolbar). Le dialog propose quatre algorithmes :

| Algorithme | Vitesse | Robustesse | Usage typique |
| :--- | :--- | :--- | :--- |
| **CRC32** | ⚡⚡⚡ | Faible | Détection d'erreur basique (manifestes `.sfv` héritage) |
| **MD5** | ⚡⚡ | Moyenne | Compatibilité avec `md5sum`, anciens torrents |
| **SHA-1** | ⚡⚡ | Bonne | Compatible `sha1sum`, dépôts Git |
| **SHA-256** | ⚡ | Excellente | Choix recommandé pour archives long terme |

Les empreintes sont calculées **en parallèle** (rayon) et affichées dans la liste. Chaque ligne expose un bouton **Copier** pour récupérer l'empreinte dans le presse-papier.

## Exporter un manifeste

Une fois les empreintes calculées, **Save manifest…** écrit un fichier sidecar à côté de vos médias :

| Algorithme | Format | Compatible avec |
| :--- | :--- | :--- |
| CRC32 | `.sfv` | `cksfv`, outils scene release, outils media historiques |
| MD5 | `.md5` | `md5sum -c` (Linux), HashCheck (Windows) |
| SHA-1 | `.sha1` | `sha1sum -c` |
| SHA-256 | `.sha256` | `sha256sum -c` |

Le manifeste stocke les chemins **relatifs** au dossier où il est sauvegardé, ce qui le rend portable.

## Vérifier un manifeste

Le bouton **Vérifier un manifeste…** dans le même dialog lit un manifeste existant et compare les empreintes aux fichiers actuels :

1. Choisissez le fichier de manifeste (`.sfv`, `.md5`, `.sha1`, `.sha256`)
2. L'algorithme est **inféré automatiquement** depuis l'extension
3. CineRename hash chaque fichier référencé et compare aux empreintes stockées
4. Trois statuts possibles :
   - ✅ **OK** — empreinte conforme
   - ❌ **Altéré** — l'empreinte calculée diffère de la stockée (corruption, modification involontaire)
   - ⚠️ **Manquant** — le fichier référencé n'existe plus

Le résumé en haut du dialog indique `N matched / M mismatched / K missing`.

## Cas d'usage

- **Archivage long terme** : générer un manifeste SHA-256 par dossier de saison, puis vérifier tous les 6 mois pour détecter le *bit rot*.
- **Validation post-download** : si votre source fournit un `.sfv` ou un `.md5`, vérifier qu'aucun fichier n'a été corrompu pendant le transfert.
- **Audit de bibliothèque** : avant un déménagement de disque ou une migration NAS, snapshot toute la bibliothèque en SHA-256 puis re-vérifier sur la nouvelle cible.

## Performance

Sur un SSD moderne, la lecture est le goulet — comptez :

- ~500 Mo/s pour SHA-256 (single thread)
- ~1.5 Go/s pour MD5
- ~2 Go/s pour CRC32

CineRename utilise `rayon` pour hasher plusieurs fichiers **en parallèle**, donc un batch de 10 fichiers va saturer le disque, pas le CPU. Sur HDD, prévoyez du temps proportionnel à la taille totale.
