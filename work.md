# Fonctionnalités
A minima votre service web devra permettre de réaliser les opérations suivantes :

## Fonctionnalités obligatoires
- ✔️ Se connecter et ✔️ se déconnecter de l'application
- ✔️ Créer, lire, mettre à jour (complètement et/ou partiellement), supprimer, l'ensemble des données de votre base.
- ✔️ Gérer les utilisateurs

## Contraintes
Quelque soit votre projet, celui-ci devra respecter les contraintes suivantes :

- ✔️ Persistance : La manipulation des données de la base de données doit se faire par le biais de l'utilisation de DAO.
- ✔️ Contrôle d'accès : Vos opérations d'authentification doivent reposer sur l'utilisation du standard RFC 7519 (JWT).
- ✔️ Tests unitaires : L'ensemble des opérations sur la base de données devra faire l'objet de tests unitaires (Mocha, Jest, etc.). Attention, ici ce que vous testez c'est votre API de persistance. La manipulation de la base de données est déjà testée en principe par la bibliothèque que vous utilisez (ex : node-sqlite3 et node-sqlite).
- ✔️ Documentation : Votre projet devra posséder un fichier README.md présentant l'ensemble des informations nécessaires tels que sa configuration, son déploiement, ou encore son utilisation. Pensez entre autre à décrire précisément l'ensemble des Endpoints et leur usage..

## Extensions
En plus des éléments obligatoires demandés en TP, et rappelés ci-dessus, vous devrez choisir deux améliorations à mettre en oeuvre dans votre projet parmi la liste ci-dessous.

Remarque : Le nombre d'étoiles donne une idée de la difficulté. Plus l'extension est difficile et plus elle rapportera de points.

### Architecture logicielle
✔️ [★★★☆☆] Utilisation du patron de conception Repository.
❌ [★★★★☆] Utilisation des DTO avec un mapper responsable du passage entre DTO et objet du domaine.

### Qualité de code
✔️ [★★★★☆] Mise en oeuvre des tests d'intégration.

### Contrôle d'accès
✔️ [★★★☆☆] Implémentation du Refresh Token pour la gestion de l'authentification.
✔️ [★★★★★] Mise en place de la gestion des autorisations en s'inspirant des modèles vus en cours (RBAC, ABAC, etc.).

### Documentation
🔜 [★★☆☆☆] Utilisation de docsify ou JSDoc pour créer la documentation.
🔜 [★★★☆☆] Mise en oeuvre de la spécification OpenAPI pour générer la documentation.
