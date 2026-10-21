---
description: "Guide d installation de CineRename sur Windows (exe, msi), macOS (Intel, Apple Silicon, Gatekeeper), Linux (AppImage, deb, rpm) et Docker."
---

# Installation

CineRename est disponible pour **Windows**, **macOS**, **Linux desktop** et **Linux headless/NAS**.

## Téléchargements

Utilisez la page officielle [Télécharger](https://cinerename.app/fr/download) ou la dernière release :

https://github.com/CineRename/CineRename-Releases/releases/latest

| Système | Formats recommandés |
| :--- | :--- |
| Windows 10/11 x64 | [Microsoft Store](https://apps.microsoft.com/detail/9N7JL6NXFVGW), installeur `.exe`, `.msi`, `.zip` portable |
| macOS Apple Silicon | `.dmg` ou `.pkg` arm64 |
| macOS Intel | `.dmg` ou `.pkg` x64 |
| Linux desktop | AppImage, `.deb`, `.rpm`, `.tar.xz` portable |
| NAS / Linux headless | `.tar.xz` x64 ou arm64 |
| Docker | archive image x64 ou arm64 |

::: tip
Si vous hésitez, commencez par le **Microsoft Store** ou le `.exe` sur Windows, le `.dmg` sur macOS et l'AppImage sur Linux.
:::

## Windows

### Microsoft Store (Recommandé)

Installez CineRename depuis le [Microsoft Store](https://apps.microsoft.com/detail/9N7JL6NXFVGW) pour recevoir les mises à jour par le Store. CineRename reste une application de bureau qui accède aux fichiers avec les permissions de votre compte utilisateur.

### Installeur autonome

1. Téléchargez l'installeur `.exe`.
2. Exécutez-le.
3. Si Windows SmartScreen affiche un avertissement, cliquez sur **Informations complémentaires** -> **Exécuter quand même**.

Les builds directs `.exe` ne sont pas encore signés, donc cet avertissement est attendu au premier lancement.

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

### Snap

Installation depuis le Snap Store :

```bash
sudo snap install cinerename
```

Les mises à jour sont gérées par le Snap Store. Pour accéder aux volumes montés sous `/media`, `/run/media` ou `/mnt`, connectez l'interface removable-media :

```bash
sudo snap connect cinerename:removable-media
```

L'accès dépend aussi des permissions du volume et des interfaces Snap.

## NAS / Linux Headless

Téléchargez l'archive NAS x64 ou arm64, extrayez-la sur votre serveur, puis lancez le binaire `cinerename` inclus.

Pour l'usage serveur, voir [CLI et headless](/fr/cli).

## Mises à jour

Les builds desktop directs incluent l'updater intégré de CineRename. Vous pouvez vérifier les mises à jour depuis **Préférences -> Général -> Mises à jour**.

Les builds Microsoft Store et Snap reçoivent leurs mises à jour par leur store respectif. Les autres installations par gestionnaire de paquets utilisent leur propre canal.

## Désinstallation

- **Windows** : Paramètres -> Applications -> CineRename -> Désinstaller.
- **macOS** : déplacez `CineRename.app` à la corbeille.
- **Linux AppImage / portable** : supprimez le fichier téléchargé ou le dossier extrait.
- **Linux deb / rpm** : désinstallez avec votre gestionnaire de paquets.

Les paramètres, l'historique, les logs et l'état de licence sont stockés dans l'emplacement app-data de votre système. L'écran Support permet de copier logs/config avant de supprimer les données locales.
