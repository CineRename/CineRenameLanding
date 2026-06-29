# Ligne De Commande Et Usage Headless

CineRename inclut des outils en ligne de commande pour NAS, Docker, scripts serveur et automatisation prudente.

## Installation

CineRename a deux surfaces CLI :

- **CLI desktop** : incluse avec le binaire de l'app desktop. Elle prend en charge les workflows principaux : `preview`, `rename`, `organize`, `auto` et `schedule`.
- **CLI headless/NAS** : incluse dans les archives NAS/headless. Elle prend en charge les workflows principaux plus les outils serveur : `audit`, `nfo`, `subtitles`, `download-client`, `pre-arr`, `web` et `tui`.

Si une commande ci-dessous est marquée **headless**, utilisez l'archive NAS/headless plutôt que le binaire desktop.

Formats NAS :

| Architecture | Artefact |
| :--- | :--- |
| Intel / AMD 64-bit | archive NAS Linux x64 |
| ARM 64-bit | archive NAS Linux arm64 |

Extrayez l'archive, puis lancez les commandes depuis le dossier extrait.

## Aide

```bash
cinerename --help
cinerename preview --help
cinerename auto --help
```

## Commandes Principales

| Commande | Disponible dans | Action |
| --- | --- | --- |
| `cinerename preview <chemin>` | Desktop + headless | Affiche l'aperçu avant/après sans modifier les fichiers |
| `cinerename rename <chemin>` | Desktop + headless | Renomme les fichiers sur place |
| `cinerename organize <chemin> --to <bibliotheque>` | Desktop + headless | Renomme et déplace les fichiers vers une bibliothèque |
| `cinerename auto <chemin> --to <bibliotheque> [--subs fr]` | Desktop + headless | Lance le pipeline prudent : renommage, classement, sous-titres optionnels |
| `cinerename schedule <chemin> --every 15m --to <bibliotheque>` | Desktop + headless | Répète un workflow à intervalle régulier |
| `cinerename history list` | Headless | Liste les lots de renommage récents |
| `cinerename history undo-last` | Headless | Annule le dernier lot restaurable |
| `cinerename history undo <batch-id>` | Headless | Annule un lot précis |
| `cinerename audit <chemin> --profile plex` | Headless | Audite une bibliothèque Plex/Jellyfin/Kodi |
| `cinerename nfo <chemin> --profile kodi --write` | Headless | Génère explicitement les fichiers NFO |
| `cinerename subtitles convert <fichier> --to srt` | Headless | Convertit les formats de sous-titres |
| `cinerename subtitles shift <fichier> --ms 750` | Headless | Applique un décalage fixe aux sous-titres |
| `cinerename subtitles drift <fichier> --first-ms 0 --last-ms 1250` | Headless | Applique une correction de drift linéaire simple |
| `cinerename download-client test qbittorrent --url <url>` | Headless | Teste un client de téléchargement |
| `cinerename pre-arr preview <chemin> --profile sonarr` | Headless | Prépare un aperçu de staging Sonarr/Radarr |
| `cinerename benchmark large-import --files 2000` | Headless | Lance un benchmark local contrôlé |
| `cinerename web --host 0.0.0.0 --port 8787` | Headless | Démarre la WebUI locale |
| `cinerename tui <chemin>` | Headless | Démarre l'interface terminal |

## Exemples Desktop Et Headless

```bash
# Prévisualiser sans toucher aux fichiers
cinerename preview /chemin/vers/video.mkv

# Exporter un rapport dry-run
cinerename preview /chemin/vers/dossier --export dry-run.csv

# Renommer sur place
cinerename rename /chemin/vers/dossier

# Renommer et classer dans une bibliothèque
cinerename organize /chemin/vers/telechargements --to /media/Library

# Renommer, classer et chercher des sous-titres français
cinerename auto /chemin/vers/telechargements --to /media/Library --subs fr

# Lancer toutes les 15 minutes sur un NAS
cinerename schedule /chemin/vers/telechargements --every 15m --to /media/Library --subs fr
```

## Exemples Headless

Ces commandes nécessitent le build NAS/headless.

```bash
# Annuler le dernier lot restaurable
cinerename history undo-last

# Auditer une bibliothèque
cinerename audit /media/Library --profile plex --export audit.md --format markdown
```

## Headless : Pre-Arr Pour Sonarr / Radarr

Pre-Arr est un mode de staging conservateur. Il ne déplace automatiquement que les fichiers considérés sûrs.

```bash
cinerename pre-arr preview /chemin/vers/telechargements --profile sonarr --json
cinerename pre-arr apply /chemin/vers/telechargements --profile radarr --to /chemin/vers/staging
```

Utilisez toujours l'aperçu d'abord. Appliquez seulement quand le plan est correct.

## Headless : Outils Sous-Titres

```bash
cinerename subtitles convert episode.ass --to srt --output episode.srt
cinerename subtitles shift movie.fr.srt --ms 750 --output movie.fr.shifted.srt
cinerename subtitles drift movie.fr.srt --first-ms 0 --last-ms 1250 --output movie.fr.fixed.srt
```

Ces commandes modifient des fichiers de sous-titres localement. Elles ne garantissent pas une synchronisation audio parfaite sans vérifier le résultat.

## Headless : Token WebUI

L'API WebUI est protégée par token. Si aucun token n'est fourni, CineRename affiche une URL temporaire avec `#token=...`.

Pour NAS ou Docker, utilisez votre propre token long :

```bash
cinerename web --host 0.0.0.0 --port 8787 --token "remplacer-par-un-long-token-aleatoire"
```

Gardez ce token privé.

## Exemple Scheduler NAS

```txt
*/15 * * * * /volume1/@appstore/cinerename/cinerename auto /volume1/video/Inbox --to /volume1/video/Library --subs fr --json >> /var/log/cinerename.log 2>&1
```

Pour un conteneur Docker long-running, utilisez `schedule` ou `web` plutôt que cron.

## Dépannage

- Utilisez `preview` avant tout gros traitement automatique.
- Si un provider est indisponible, relancez l'aperçu plus tard ou choisissez un match manuellement dans l'app desktop.
- Si un chemin échoue sur NAS, vérifiez les permissions de fichiers et de montage.
- Pour le support, copiez les logs depuis l'écran Support ou joignez la sortie CLI à votre email.
