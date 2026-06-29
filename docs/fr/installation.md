# Installation

CineRename est disponible pour **Windows**, **macOS**, **Linux desktop** et **Linux headless/NAS**.

## Téléchargements

Utilisez la page officielle [Télécharger](https://cinerename.app/fr/download) ou la dernière release :

https://github.com/CineRename/CineRename-Releases/releases/latest

| Système | Formats recommandés |
| :--- | :--- |
| Windows 10/11 x64 | installeur `.exe`, `.msi`, `.zip` portable |
| macOS Apple Silicon | `.dmg` ou `.pkg` arm64 |
| macOS Intel | `.dmg` ou `.pkg` x64 |
| Linux desktop | AppImage, `.deb`, `.rpm`, `.tar.xz` portable |
| NAS / Linux headless | `.tar.xz` x64 ou arm64 |
| Docker | archive image x64 ou arm64 |

::: tip
Si vous hésitez, commencez par le `.exe` sur Windows, le `.dmg` sur macOS et l'AppImage sur Linux.
:::

## Windows

1. Téléchargez l'installeur `.exe`.
2. Exécutez-le.
3. Si Windows SmartScreen affiche un avertissement, cliquez sur **Informations complémentaires** -> **Exécuter quand même**.

Les builds Windows ne sont pas encore signés, donc cet avertissement est attendu au premier lancement.

## macOS

1. Téléchargez le `.dmg` correspondant à votre Mac : Apple Silicon ou Intel.
2. Ouvrez le `.dmg`.
3. Glissez **CineRename** dans `Applications`.
4. Au premier lancement, faites clic droit sur **CineRename** -> **Ouvrir**, puis confirmez.

Les builds macOS ne sont pas encore signés/notariés, donc Gatekeeper peut demander une confirmation au premier lancement.

## Linux Desktop

### AppImage

1. Téléchargez l'AppImage.
2. Rendez-la exécutable :

```bash
chmod +x CineRename_*.AppImage
```

3. Lancez-la :

```bash
./CineRename_*.AppImage
```

### deb / rpm

Utilisez le paquet `.deb` sur Debian/Ubuntu et le paquet `.rpm` sur Fedora/openSUSE/RHEL.

## NAS / Linux Headless

Téléchargez l'archive NAS x64 ou arm64, extrayez-la sur votre serveur, puis lancez le binaire `cinerename` inclus.

Pour l'usage serveur, voir [CLI et headless](/fr/cli).

## Mises à jour

Les builds desktop directs incluent l'updater intégré de CineRename. Vous pouvez vérifier les mises à jour depuis **Préférences -> Général -> Mises à jour**.

Les builds store et gestionnaires de paquets utiliseront leur propre canal de mise à jour quand ils seront publiés.

## Désinstallation

- **Windows** : Paramètres -> Applications -> CineRename -> Désinstaller.
- **macOS** : déplacez `CineRename.app` à la corbeille.
- **Linux AppImage / portable** : supprimez le fichier téléchargé ou le dossier extrait.
- **Linux deb / rpm** : désinstallez avec votre gestionnaire de paquets.

Les paramètres, l'historique, les logs et l'état de licence sont stockés dans l'emplacement app-data de votre système. L'écran Support permet de copier logs/config avant de supprimer les données locales.
