# Doublons

Le module **Doublons** scanne votre bibliothèque pour repérer les copies multiples d'un même film ou épisode, et vous aide à libérer de l'espace en gardant uniquement la meilleure version.

## Comment ça marche

1. Vous pointez un dossier (ou plusieurs).
2. CineRename indexe tous les fichiers vidéo, calcule un score de qualité, et regroupe par identité de média (titre + année pour les films, série + saison + épisode pour les séries).
3. Le résultat est affiché par **clusters** : un cluster = plusieurs fichiers qui désignent le même contenu.

![Aperçu des clusters de doublons](/assets/img/duplicates-clusters.png)

## Le score de qualité

Chaque fichier reçoit un score basé sur :

- **Résolution** — 4K > 1440p > 1080p > 720p > 480p
- **Codec** — HEVC/AV1 (efficacité) avec malus pour codecs anciens
- **Source** — BluRay > WEBRip > HDTV > DVDRip
- **Bitrate** — bonus pour les bitrates élevés à résolution égale
- **Audio** — DTS-HD MA / TrueHD > DTS / DD+ > AC3 / AAC
- **Taille** — pour départager à qualité technique équivalente

Le fichier avec le score le plus élevé est marqué **À conserver**, les autres **Candidats à la suppression**.

::: tip Pas de suppression automatique
Aucun fichier n'est jamais supprimé sans votre accord explicite. Le module ne fait que **proposer**.
:::

## Menu contextuel

Sur chaque ligne du cluster, **clic droit** ouvre :

- **Ouvrir l'emplacement** — Finder / Explorer / Files manager natif
- **Lire la vidéo** — lance votre lecteur par défaut
- **Forcer la conservation** — marque ce fichier comme "à conserver" (override le scoring)
- **Forcer la suppression** — marque pour suppression
- **Exclure du cluster** — si CineRename a regroupé à tort

## Suppression par lot

Une fois vos décisions prises sur tous les clusters, le bouton **Supprimer les marqués** :

1. Demande une dernière confirmation
2. Déplace les fichiers dans la corbeille système (récupérables)
3. Enregistre l'opération dans l'**Historique** (pour annuler)

::: warning Attention pour les utilisateurs NAS
La suppression passe par la corbeille de l'OS. Si la **Corbeille réseau (SMB/CIFS)** n'est pas activée sur votre Synology ou QNAP, les fichiers seront supprimés définitivement. Assurez-vous d'activer l'option "Activer la corbeille" sur votre dossier partagé NAS avant d'utiliser la suppression en masse.
:::

## Bonnes pratiques

- **Toujours renommer avant** — sinon CineRename peine à matcher `MovieX.1080p.x264-GROUP.mkv` avec `MovieX.4k.HDR.mkv` car les noms ne se ressemblent pas.
- **Lancer un dry-run** d'abord — explorez les clusters, ajustez les overrides, puis seulement supprimez.
- **Vérifier les éditions multiples** — pour les films, "Director's Cut", "Extended", "Theatrical" ne sont **pas** considérés comme doublons s'ils sont nommés explicitement.

## Limitations connues

- Pour les **multi-disques** (un film coupé en `Movie - cd1.mkv` + `Movie - cd2.mkv`), CineRename les groupe correctement seulement si la convention `cd1`/`cd2` ou `part1`/`part2` est respectée.
- Pour les **archives mixtes** (zips contenant plusieurs versions), il faut d'abord extraire ou utiliser le Studio pour les normaliser.
