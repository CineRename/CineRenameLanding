# Installation

CineRename est disponible nativement pour **Windows**, **macOS** et **Linux** grâce à Tauri v2.

## Téléchargements

Vous pouvez télécharger les binaires depuis la page de téléchargement officielle.

| OS | Format |
| :--- | :--- |
| Windows 10/11 (x64) | `.exe` (installeur) |
| macOS (Intel + Apple Silicon) | `.dmg` |
| Linux (universel) | `.AppImage` |

::: tip Vous pouvez aussi passer par la page [Télécharger](/fr/download) du site, qui détecte automatiquement votre système.
:::

## Windows

1. Téléchargez l'installeur `CineRename-Setup.exe`.
2. Exécutez-le. Si Windows SmartScreen affiche un avertissement, cliquez sur **Informations complémentaires** → **Exécuter quand même** *(le certificat de signature étendu est en cours de validation)*.
3. L'installeur place CineRename dans `%LOCALAPPDATA%\Programs\CineRename`.

## macOS

1. Ouvrez le `.dmg` puis glissez **CineRename** dans `Applications`.
2. Au premier lancement, faites un **clic droit → Ouvrir** (et confirmez) pour autoriser l'exécution *(l'application est en cours de notarisation auprès d'Apple)*.
3. Pour les exécutions suivantes, le double-clic suffit.

::: warning Apple Silicon
La version actuelle est compilée en universal binary. Si vous rencontrez des problèmes de performance, vérifiez dans **À propos de ce Mac → Système** que l'application tourne en natif (pas via Rosetta).
:::

## Linux

1. Téléchargez `CineRename.AppImage`.
2. Rendez le fichier exécutable :
   ```bash
   chmod +x CineRename.AppImage
   ```
3. Lancez :
   ```bash
   ./CineRename.AppImage
   ```

::: tip
Pour intégrer CineRename à votre menu d'applications, utilisez [`AppImageLauncher`](https://github.com/TheAssassin/AppImageLauncher).
:::

## Gestionnaires de paquets (À venir)

CineRename sera très prochainement disponible via les gestionnaires de paquets standards :

- **macOS** : `brew install --cask cinerename`
- **Windows** : `winget install CineRename`

## Compiler depuis les sources

Vous pouvez aussi compiler CineRename localement.

```bash
npm install
npm run tauri:dev
```

## Mise à jour

L'auto-update n'est pas encore activé. Pour mettre à jour, téléchargez la dernière version et écrasez l'ancienne installation.

## Désinstallation

- **Windows** : Paramètres → Applications → CineRename → Désinstaller.
- **macOS** : déplacez `CineRename.app` à la corbeille.
- **Linux** : supprimez le `.AppImage`.

Les paramètres locaux (presets de nommage, historique, clés API personnalisées) sont stockés dans :

| OS | Dossier |
| --- | --- |
| Windows | `%APPDATA%\CineRename\` |
| macOS | `~/Library/Application Support/CineRename/` |
| Linux | `~/.config/CineRename/` |

Supprimez-le si vous voulez repartir à zéro.
