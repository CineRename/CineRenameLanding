# Ligne de commande (CLI)

CineRename expose une CLI native, idéale pour scripter des workflows NAS, Seedbox ou serveurs Plex.

## Installation

Sur **Windows / macOS / Linux**, la CLI est livrée avec l'application principale. Elle est invoquable via la commande `cinerename` (ajoutée au PATH lors de l'installation).

### Builds NAS (Synology / QNAP / Linux headless)

Un workflow GitHub Actions dédié produit deux tarballs Linux à chaque tag :

| Architecture | Artefact | Triple |
| :--- | :--- | :--- |
| Intel / AMD 64-bit | `cinerename-linux-x86_64` | `x86_64-unknown-linux-gnu` |
| ARM 64-bit | `cinerename-linux-aarch64` | `aarch64-unknown-linux-gnu` (cross) |

Téléchargez le tarball matching depuis [Releases](https://github.com/Epikaigle/CineRename/releases), extrayez-le dans `/volume1/@appstore/cinerename/`, et invoquez le binaire avec les flags ci-dessous. Pour une surveillance continue sur NAS, préférez **cron** sur la CLI plutôt que la fonctionnalité Dossiers surveillés qui nécessite la GUI.

Doc complète d'installation NAS : [docs/NAS_BUILDS.md](https://github.com/Epikaigle/CineRename/blob/main/docs/NAS_BUILDS.md) sur le repo principal.

### Vérifier la version

```bash
cinerename --version
```

### Aide

```bash
cinerename --help
cinerename rename --help
```

## Commandes principales

| Commande | Action |
| --- | --- |
| `cinerename preview <chemin>` | Affiche le rendu Avant / Après sans rien modifier |
| `cinerename rename <chemin>` | Renomme sur place |
| `cinerename organize <chemin> --to <bib>` | Renomme + déplace vers une bibliothèque |
| `cinerename auto <chemin> --to <bib>` | Pipeline complet : renomme + sous-titres + déplace |
| `cinerename subs <chemin>` | Télécharge les sous-titres pour les fichiers du dossier |
| `cinerename duplicates <chemin>` | Affiche / nettoie les doublons |
| `cinerename undo <id>` | Annule une opération de l'historique |

### Exemples

```bash
# Prévisualiser un renommage sans rien toucher
cinerename preview /chemin/vers/video.mkv

# Renommer en place tout un dossier
cinerename rename /chemin/vers/dossier

# Renommer et déplacer vers la bibliothèque Plex/Jellyfin
cinerename organize /chemin/vers/telechargements --to /Plex/Series

# Pipeline complet : renommage + sous-titres FR + déplacement
cinerename auto /chemin/vers/telechargements --to /Plex/Series --subs fr

# Télécharger uniquement les sous-titres
cinerename subs /Plex/Series --lang fr,en

# Lister les doublons sans les supprimer
cinerename duplicates /Plex --dry-run
```

## Flags utiles

| Flag | Description |
| --- | --- |
| `--dry-run` | Tout simuler, ne rien écrire |
| `--preset <nom>` | Force un preset (`plex`, `jellyfin`, `emby`, `kodi`, `custom`) |
| `--subs <code,code>` | Langues de sous-titres (séparées par `,`) |
| `--on-conflict <skip\|overwrite\|both>` | Stratégie en cas de conflit |
| `--quiet` | Sortie minimale (utile dans les scripts) |
| `--verbose` | Sortie détaillée pour debug |
| `--json` | Sortie machine-readable |

## Codes de sortie

- `0` — succès
- `1` — erreur générique
- `2` — argument invalide / preset inconnu
- `3` — conflit non résolu (lever avec `--on-conflict`)
- `4` — accès au fichier refusé / verrou
- `5` — provider externe injoignable (TheTVDB / OpenSubtitles down)

Utiles pour chaîner : `cinerename auto ... && notify-send "Pipeline OK"`.

## Intégration Sonarr / Radarr

Dans **Sonarr → Settings → Connect → Custom Scripts** :

```bash
#!/usr/bin/env bash
set -e
[ "$sonarr_eventtype" = "Download" ] || exit 0
cinerename auto "$sonarr_episodefile_path" --to /Plex/Series --subs fr --quiet
```

Adaptez pour Radarr en utilisant `$radarr_moviefile_path`.

## Intégration Seedbox / NAS

Exemple cron pour traiter un dossier d'arrivée toutes les 5 minutes :

```txt
*/5 * * * * /usr/local/bin/cinerename auto /mnt/incoming --to /mnt/Plex --subs fr --quiet --on-conflict both
```

## Variables d'environnement

| Variable | Effet |
| --- | --- |
| `CINERENAME_TVDB_API_KEY` | Clé API TheTVDB personnalisée |
| `CINERENAME_OPENSUBTITLES_API_KEY` | Clé API OpenSubtitles personnalisée |
| `CINERENAME_CONFIG_DIR` | Override du dossier de config |
| `CINERENAME_LOG_LEVEL` | `error` / `warn` / `info` / `debug` / `trace` |

Voir [Clés API providers](/providers) pour la résolution complète.
