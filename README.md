# HPI Talents — proposition de refonte

Prototype statique d'une proposition de refonte visuelle et éditoriale du site **HPI Talents**, préparé pour être présenté à **Fabrice Micheau**.

> **Maquette non officielle.** Ce dépôt sert uniquement à la démonstration et à l'évaluation d'une piste de refonte. Il ne remplace pas le site officiel de HPI Talents / AFM Développement.

## Contenu

- Accueil
- Comprendre
- Bilan
- Formations
- Entreprises
- Réseau
- Contact
- Navigation responsive desktop / mobile

Le site est volontairement simple : **HTML, CSS et JavaScript natifs**, sans framework ni étape de compilation.

## Voir la maquette localement

Ouvrir simplement `index.html` dans un navigateur, ou lancer un petit serveur local depuis le dossier du projet :

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Publication avec GitHub Pages

Le dépôt contient déjà un workflow GitHub Pages dans `.github/workflows/pages.yml`.

1. Créer un dépôt GitHub, par exemple `hpitalents-refonte`.
2. Ajouter le contenu de ce dossier à la racine du dépôt.
3. Dans **Settings → Pages**, choisir **GitHub Actions** comme source de déploiement.
4. Envoyer les fichiers sur la branche `main`.

La maquette sera alors publiée à l'adresse GitHub Pages du dépôt.

## Important

- Le formulaire de contact est une **simulation visuelle** : aucune donnée n'est envoyée.
- Les pages sont configurées en `noindex` et un `robots.txt` bloque l'indexation des moteurs de recherche.
- Les noms, marques, textes, coordonnées et contenus liés à HPI Talents / AFM Développement restent la propriété de leurs titulaires respectifs.
- Aucun fichier de licence open source n'est ajouté afin de ne pas attribuer par erreur une licence au contenu de la maquette.
