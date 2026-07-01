# Pipeline d'automatisation

Le **pipeline d'automatisation** enchaîne les fonctions principales de CineRename :

```
Dossier source  →  renommage  →  sous-titres  →  déplacement  →  bibliothèque finale
```

Il sert à traiter un dossier de téléchargements avec moins d'interventions manuelles. Les opérations risquées restent prudentes : dry-run conseillé, pas d'écrasement par défaut, et les correspondances incertaines restent en review.

## À qui c'est destiné

- **Utilisateurs Plex / Jellyfin** qui veulent que les nouveaux fichiers atterrissent automatiquement bien nommés et avec sous-titres.
- **Admins NAS** qui scriptent des post-processings de Sonarr / Radarr.
- **Utilisateurs Seedbox** qui rapatrient des téléchargements vers une bibliothèque distante.

## Configuration

Dans **Préférences → Automation** :

| Option | Description |
| --- | --- |
| **Déclenchement automatique** | Lancer le pipeline après les imports quand l'option est active |
| **Stratégie** | Renommer seulement, renommer et déplacer, ou renommer/déplacer/sous-titres |
| **Racine de destination** | Bibliothèque finale ou dossier de staging, par exemple `/media/Plex` |
| **Sous-dossiers films / séries / animes** | Organisation optionnelle par type de média |
| **Langue des sous-titres** | Langue préférée pour les étapes automatiques de sous-titres |
| **Options de déplacement** | Move, copy, hardlink ou symlink selon votre workflow |
| **Clients de téléchargement** | qBittorrent, Transmission ou JDownloader |
| **Dry-run par défaut** | Recommandé pour les imports depuis clients de téléchargement et les gros lots |

## Lancer le pipeline

Trois façons :

1. **Depuis le Studio** — bouton **Lancer le pipeline** sur les fichiers chargés.
2. **Depuis le CLI** — `cinerename auto /chemin --to /Plex/...` (voir [CLI](/fr/cli)).
3. **En arrière-plan** — les dossiers surveillés importent les nouveaux fichiers, et le déclencheur Automation peut les traiter s'il est activé.
4. **Headless/WebUI** — le build NAS peut lancer des workflows serveur planifiés ou protégés par token.

## Sécurité

Le mode automatique respecte les mêmes garanties que le Studio :

- **Flux preview-first** — lancez un dry-run avant les opérations larges ou non surveillées.
- **Aucun overwrite** par défaut — le mode `keep both` est sélectionné si rien n'est précisé.
- **Annulation possible** — chaque opération est tracée individuellement dans l'[Historique](/fr/history), donc undoable.

::: warning Surveillance et workflows torrents
Si vous surveillez un dossier où les torrents écrivent en cours de download (`*.part`, `.!ut`), pointez CineRename vers le dossier final/terminé du client ou utilisez un staging. Sinon CineRename peut voir un fichier incomplet trop tôt.
:::

## Exemples de scénarios

### Scénario 1 — Rapatriement Seedbox vers NAS

1. `rsync` rapatrie `seedbox:downloads/` vers `/mnt/nas/incoming/`
2. CineRename watche `/mnt/nas/incoming/`
3. Pipeline auto :
   - renomme
   - télécharge sous-titres FR
   - déplace vers `/mnt/nas/Plex/Films` ou `/mnt/nas/Plex/Séries`
4. Plex scanne `/mnt/nas/Plex/` → contenu mieux reconnu grâce aux noms propres

### Scénario 2 — Post-process Sonarr

1. Sonarr télécharge un épisode
2. À la fin, Sonarr appelle un script `post-process.sh`
3. Ce script lance `cinerename auto $sonarr_episodefile_path --to /Plex/Séries --subs fr`
4. Aucune action manuelle nécessaire

### Scénario 3 — Mac familial

1. Un membre de la famille glisse un dossier dans `~/Movies/Inbox`
2. CineRename Mac, lancé en arrière-plan, watche ce dossier
3. Pipeline auto déplace vers `~/Movies/Plex/...` propre

## Logs et support

Les événements du pipeline sont écrits dans les logs de l'application :

| OS | Chemin |
| --- | --- |
| Windows | `%APPDATA%\CineRename\logs\auto-pipeline.log` |
| macOS | `~/Library/Application Support/CineRename/logs/auto-pipeline.log` |
| Linux | `~/.config/CineRename/logs/auto-pipeline.log` |

Utilisez **Préférences → Support → Copier les logs** pour copier une fenêtre de temps précise quand vous signalez un problème. En CLI/headless, redirigez stdout/stderr vers votre propre fichier de log si besoin.
- **Quarantaine des incertains** — les éléments peu fiables restent en review au lieu d'être déplacés silencieusement.
