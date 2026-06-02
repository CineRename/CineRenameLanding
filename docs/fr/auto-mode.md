# Mode automatique

Le **mode automatique** enchaîne en pipeline les fonctions principales de CineRename :

```
Dossier source  →  renommage  →  sous-titres  →  déplacement  →  bibliothèque finale
```

Idéal pour traiter un dossier de téléchargements sans intervention manuelle.

## À qui c'est destiné

- **Utilisateurs Plex / Jellyfin** qui veulent que les nouveaux fichiers atterrissent automatiquement bien nommés et avec sous-titres.
- **Admins NAS** qui scriptent des post-processings de Sonarr / Radarr.
- **Utilisateurs Seedbox** qui rapatrient des téléchargements vers une bibliothèque distante.

## Configuration

Dans **Réglages → Mode automatique** :

| Option | Description |
| --- | --- |
| **Dossier source** | D'où viennent les fichiers à traiter (ex. `~/Downloads/Plex`) |
| **Bibliothèque films** | Destination finale des films (ex. `/media/Plex/Films`) |
| **Bibliothèque séries** | Destination finale des séries (ex. `/media/Plex/Séries`) |
| **Bibliothèque animes** | Destination finale des animes (séparée si vous le souhaitez) |
| **Preset de nommage** | Plex / Jellyfin / Emby / Personnalisé |
| **Sous-titres** | Activer / désactiver, langue préférée |
| **Doublons** | Si un fichier de meilleure qualité existe déjà dans la bibliothèque, action à prendre (`remplacer` / `garder les deux` / `ignorer`) |
| **Sur conflit** | Si la cible existe déjà : `skip` / `overwrite` / `keep both` |

## Lancer le pipeline

Trois façons :

1. **Depuis le Studio** — bouton **Lancer le pipeline auto** sur les fichiers chargés.
2. **Depuis le CLI** — `cinerename auto /chemin --to /Plex/...` (voir [CLI](/fr/cli)).
3. **En arrière-plan** — option **Surveiller le dossier source** : CineRename watche le dossier et déclenche automatiquement à chaque nouveau fichier détecté.

## Sécurité

Le mode automatique respecte les mêmes garanties que le Studio :

- **Aperçu loggué** — chaque action est annoncée dans la console / l'historique avant exécution.
- **Aucun overwrite** par défaut — le mode `keep both` est sélectionné si rien n'est précisé.
- **Annulation possible** — chaque opération est tracée individuellement dans l'[Historique](/fr/history), donc undoable.

::: warning Surveillance et workflows torrents
Si vous activez la surveillance d'un dossier où les torrents écrivent en cours de download (`*.part`, `.!ut`), filtrez sur l'extension finale uniquement. Sinon CineRename peut tenter de traiter un fichier incomplet.
:::

## Exemples de scénarios

### Scénario 1 — Rapatriement Seedbox vers NAS

1. `rsync` rapatrie `seedbox:downloads/` vers `/mnt/nas/incoming/`
2. CineRename watche `/mnt/nas/incoming/`
3. Pipeline auto :
   - renomme
   - télécharge sous-titres FR
   - déplace vers `/mnt/nas/Plex/Films` ou `/mnt/nas/Plex/Séries`
4. Plex scanne `/mnt/nas/Plex/` → contenu reconnu instantanément

### Scénario 2 — Post-process Sonarr

1. Sonarr télécharge un épisode
2. À la fin, Sonarr appelle un script `post-process.sh`
3. Ce script lance `cinerename auto $sonarr_episodefile_path --to /Plex/Séries --subs fr`
4. Aucune action manuelle nécessaire

### Scénario 3 — Mac familial

1. Un membre de la famille glisse un dossier dans `~/Movies/Inbox`
2. CineRename Mac, lancé en arrière-plan, watche ce dossier
3. Pipeline auto déplace vers `~/Movies/Plex/...` propre

## Logs

Tous les événements du pipeline sont écrits dans :

| OS | Chemin |
| --- | --- |
| Windows | `%APPDATA%\CineRename\logs\auto-pipeline.log` |
| macOS | `~/Library/Application Support/CineRename/logs/auto-pipeline.log` |
| Linux | `~/.config/CineRename/logs/auto-pipeline.log` |

Niveau de log configurable dans **Réglages → Avancé → Verbosité**.
