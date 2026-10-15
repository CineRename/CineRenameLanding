# Historique et annulation

L'onglet **Historique** enregistre les lots de renommage et indique s'ils peuvent être annulés.

## Ce qui est enregistré

Les lots issus du Studio, du CLI et du pipeline automatique comprennent leurs
dates, leur statut, les chemins d'origine et de destination, les détails des
opérations et la disponibilité de l'annulation. L'historique est conservé dans
la base SQLite locale et n'est pas synchronisé automatiquement entre appareils.

## Annuler un lot

Ouvrez un lot terminé et vérifiez si **Annuler** est disponible. Après votre
confirmation, CineRename vérifie que les fichiers actuels correspondent aux
fichiers enregistrés et que les destinations d'origine peuvent être restaurées.

- Les renommages et déplacements restaurent les noms et emplacements d'origine.
- Les copies et liens suppriment la destination créée tout en conservant la source d'origine.
- Une annulation réussie marque le lot existant comme `undone` et conserve son enregistrement.

Les téléchargements séparés de sous-titres, les corrections de timing et les
suppressions de doublons sont des actions indépendantes ; l'historique de
renommage ne les rend pas automatiquement réversibles.

## Quand l'annulation est indisponible

Un lot échoué ou inachevé n'est pas automatiquement annulable. Des fichiers
manquants ou modifiés, un chemin d'origine occupé, un volume démonté ou une
opération interrompue nécessitant une récupération peuvent également bloquer
l'annulation. L'historique affiche la raison et conserve l'enregistrement.

Pour des modifications successives des mêmes fichiers, annulez les lots les
plus récents en premier. La sélection multiple traite les lots successivement.
Utilisez **Ctrl/Cmd + clic** pour sélectionner des lots et **Ctrl/Cmd+A** hors du
champ de recherche pour sélectionner les lots restaurables.

## Consulter et conserver l'historique

L'historique propose le regroupement par date, la recherche, les filtres de statut
et le tri chronologique. Conservez la base locale pour garder les anciens lots
et leurs informations d'annulation. Supprimer les données locales de CineRename
supprime aussi cet historique. Le cas échéant, copiez les diagnostics depuis
l'écran Support avant de réinitialiser une installation.
