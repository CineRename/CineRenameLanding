# Historique & Undo

Tout ce que CineRename modifie sur votre disque est **traçable** et **réversible**. L'onglet **Historique** est votre machine à remonter le temps.

## Ce qui est enregistré

À chaque opération (renommage, déplacement, suppression de doublons, téléchargement de sous-titres), CineRename enregistre :

- **Date et heure** précises
- **Type d'opération** (rename / move / subtitle-fetch / duplicate-delete / auto-pipeline)
- **Avant / Après** complets (chemins source, chemins cible, taille, hash optionnel)
- **Statut** (succès / échec / annulé)
- **Source** (Studio / pipeline d'automatisation / CLI)

Les données sont stockées localement dans une base **SQLite** (via `rusqlite` côté Rust). Aucune donnée n'est envoyée en cloud.

## Onglets de l'historique

- **Aujourd'hui** — opérations du jour
- **Récent** — 7 derniers jours
- **Tout** — historique complet (filtrable par date, par dossier, par type)

## Annuler (undo)

Sélectionnez une opération et cliquez sur **Annuler**. CineRename :

1. Vérifie que les fichiers existent toujours à leur destination
2. Demande confirmation
3. Restaure les noms / emplacements d'origine
4. Marque l'opération annulée dans l'historique (avec un nouvel enregistrement "annulation")

::: tip Annulation en chaîne
Vous pouvez annuler plusieurs jours de modifications successives — l'historique remonte jusqu'au début de votre installation.
:::

## Limitations de l'undo

L'annulation peut échouer si :

- Les fichiers ont été **supprimés manuellement** entre temps (pas dans la corbeille).
- Vous avez **renommé manuellement** un fichier après le passage de CineRename — l'undo ne sait pas qu'il s'agit du même fichier.
- Le **disque source** n'est plus monté (NAS débranché, clé USB retirée).

Dans ces cas, CineRename signale l'échec et conserve l'enregistrement original pour référence.

## Sélection multiple

`Ctrl + clic` (ou `Cmd + clic`) pour sélectionner plusieurs opérations, puis **Annuler la sélection**. Les annulations sont effectuées dans l'ordre inverse (LIFO) pour respecter les dépendances entre opérations.

Vous pouvez aussi utiliser `Ctrl+A` (ou `Cmd+A` sur macOS) hors du champ de recherche pour sélectionner ou vider tous les lots restaurables.

## Réinitialiser l'historique local

L'application desktop ne synchronise pas l'historique dans le cloud. Si vous voulez repartir de zéro, sauvegardez ce qui doit l'être, copiez les diagnostics depuis **Préférences → Support** si besoin, puis supprimez le dossier local de données CineRename de votre système. Supprimer l'historique supprime aussi la possibilité d'annuler les anciennes opérations.
