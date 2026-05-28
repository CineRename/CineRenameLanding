# Export de données

CineRename ne se contente pas de renommer vos fichiers, il vous permet également d'exporter des données utiles sous des formats standardisés pour alimenter d'autres outils (tableurs, scripts, bases de données).

## Exporter le rapport de renommage

Dans le **Studio**, une fois que vous avez simulé ou validé un renommage, vous pouvez cliquer sur le bouton **Exporter le rapport** situé dans la barre d'outils.

Le fichier généré contient l'historique exact des modifications, formaté au choix :

- **CSV** (Comma-Separated Values) : Parfait pour ouvrir dans Excel ou Google Sheets.
- **JSON** : Idéal si vous souhaitez automatiser un script qui lit le résultat du renommage.

Chaque ligne de l'export contient :
- Le chemin d'origine absolu (`original_path`)
- Le nouveau nom de fichier (`new_filename`)
- Le statut (`renamed`, `ignored`, `conflict`)
- Les métadonnées détectées (ID TheTVDB, résolution, codec)

### Exemple de rapport JSON

```json
[
  {
    "original_path": "/Users/kirito/Downloads/Breaking.Bad.S01E01.mkv",
    "new_filename": "Breaking Bad (2008) - S01E01 - Pilot.mkv",
    "status": "renamed",
    "metadata": {
      "tvdb_id": 81189,
      "resolution": "1080p",
      "video_codec": "x264"
    }
  }
]
```

## Exporter une liste d'épisodes (Planning)

Si vous avez chargé une série dans CineRename, le logiciel a récupéré la structure complète de la série depuis TheTVDB ou TVmaze (y compris les épisodes manquants ou non encore diffusés).

Vous pouvez exporter cette liste complète pour suivre vos visionnages ou planifier vos téléchargements :

1. Cliquez sur l'icône **Options de la série** (les trois petits points) à côté du nom de la série dans le panneau latéral.
2. Cliquez sur **Exporter la liste des épisodes**.
3. Choisissez le format :
   - `CSV`
   - `TSV` (Tab-Separated Values)
   - `JSON`

L'export inclut :
- Le titre de la série
- La saison et le numéro d'épisode
- Le titre de l'épisode (dans votre langue de préférence)
- La date de diffusion officielle (Air Date)
- L'identifiant absolu (utile pour les animes)

::: tip Automatisation
Si vous utilisez la CLI (`cinerename`), vous pouvez forcer un rendu en JSON avec le flag `--json` pour récupérer toutes les métadonnées sur la sortie standard (`stdout`), ce qui équivaut à un export automatisé.
:::
