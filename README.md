
# CADS - Client Accounting Data Store 📊

CADS est une solution de gestion comptable centralisée conçue pour automatiser le suivi des dossiers clients, la gestion des alertes fiscales et le stockage sécurisé des documents.

---

**Lien GitHub :** ["https://github.com/MarinaKamel-coder/CADS.git"]

## 📸 Aperçu et Documentation

Pour faciliter l'évaluation, les documents et captures d'écran suivants sont mis à votre disposition :

### 🖼️ Captures d'écran

Vous trouverez dans le dossier `/Screenshots` :

  **Interface du site** : Aperçus du Tableau de bord, de la liste des Clients, des Documents, des Alerts et des Obligations (en modes Clair et Sombre).
  **Historique Git** : des captures visuelle de l'historique des commits démontrant la progression structurée du développement.

### 📄 Rapport Technique

Le rapport technique complet au format PDF (`CADS_Rapportdocx.pdf`) est disponible à la **racine du projet**. Il détaille :

1. L'architecture globale.
2. L'implémentation de l'authentification avec Clerk.
3. Les défis techniques rencontrés.
4. Les pistes d'amélioration.

## 🏗️ Architecture du Projet

### Technologies utilisées

**Frontend :** React 18, Vite, Recharts (Stats).
**Backend :** Node.js, Express, TypeScript.
**Base de données :** PostgreSQL (via Neon.tech), Prisma ORM.
**Sécurité :** Clerk Auth (Authentification JWT)

---

## 🎨 Fonctionnalités Frontend

**Sidebar Intelligente :** Navigation ergonomique avec logo optimisé, gestion du Dark Mode et intégration du profil utilisateur via Clerk.

**Tableau de Bord (Dashboard) :** Vue d'ensemble interactive avec des cartes de statistiques calculées en temps réel (obligations urgentes, clients actifs).

**Gestion des Clients :** Interface de gestion complète avec formulaires modernes (modales avec effet glassmorphism) et indicateurs de statut dynamiques

**Obligations & Échéanciers :**  Suivi précis des dates limites fiscales et administratives, classées par type (Fédéral, Provincial, Municipal) pour une organisation optimale.

**Gestion Documentaire :**  Module centralisé permettant le dépôt (upload), la visualisation et l'organisation des documents comptables pour chaque client.

**Système d'Alertes :** Monitoring visuel des priorités avec code couleur sémantique :

🔴 Haute : Échéances immédiates ou en retard.

🟠 Moyenne : Actions requises sous peu.

🔵 Basse : Informations et rappels de routine.

---

## 🗄️ Structure de la Base de Données

L'application s'appuie sur PostgreSQL (via Neon) avec un schéma relationnel robuste géré par Prisma :

**Utilisateurs (Users) :** Synchronisation sécurisée avec les identifiants de session Clerk (ID unique, rôle, informations de profil).

**Clients :** Base de données centrale regroupant les informations signalétiques, les contacts et le NAS (Numéro d'Assurance Sociale).

**Obligations (Deadlines) :** Modèle gérant les échéances (dueDate), le niveau de priorité (LOW, MEDIUM, HIGH) et le type de juridiction fiscale.

**Documents :** Stockage des métadonnées des fichiers (nom, type, chemin d'accès) avec un lien direct vers le client et le comptable propriétaire.

**Alertes (Alerts) :** Système de notifications automatisées basé sur les échéances critiques et l'état des dossiers.

## 4. Variables d'environnement

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | Lien de connexion PostgreSQL (Neon) |
| `CLERK_PUBLISHABLE_KEY` | Clé publique pour l'authentification Frontend |
| `CLERK_SECRET_KEY` | Clé secrète pour valider les jetons côté Backend |
| `PORT` | Port du serveur (3000) |

## 🧪 Tests API avec test.rest

Pour tester le Backend sans passer par l'interface, nous utilisons l'extension REST Client de VS Code. Comme le backend est sécurisé par Clerk, chaque requête nécessite un jeton (Token).

Comment obtenir le Token ?

1. Connectez-vous sur le frontend (`http://localhost:5173`).

2. Ouvrez l'inspecteur du navigateur (F12) -> Onglet Network.

3. Cliquez sur une requête API sortante.

4. Copiez la valeur du header Authorization (Bearer eyJ...).

@baseUrl = `http://localhost:3000`
@token = VOTRE_TOKEN_BEARER_ICI

### Récupérer les clients

GET {{baseUrl}}/api/clients
Authorization: Bearer {{token}}

### Récupérer les alertes actives

GET {{baseUrl}}/api/alerts
Authorization: Bearer {{token}}

### Ajouter un client

POST {{baseUrl}}/api/clients
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "firstName": "Jean",
  "lastName": "Tremblay",
  "email": `jean.t@example.com`,
  "status": "ACTIVE"
}

## 🔐 Accès pour l'évaluation

Pour tester l'application avec des données déjà pré-remplies (via le script de seed), vous pouvez utiliser le compte de test suivant sur l'interface de connexion :

**Email :** '`fady@test.com` *(ou l'email que tu as mis dans ton seed)*
**Mot de passe :** `22102020`
**Rôle :** Comptable (Accès complet au Dashboard, Clients et Obligations)

## ⚙️ Configuration et Lancement

### 1. Variables d'environnement

Créez un fichier `.env` dans le dossier `/frontend` :

```env
VITE_CLERK_PUBLISHABLE_KEY=votre_cle_clerk
VITE_API_URL=localhost_URL

```

### 2. Lancer le Backend (Port 3000)

```Bash

cd backend
npm install
npm run dev

```

### 3. Lancer le Frontend

```Bash

cd frontend
npm install
npm run dev


```

© 2026 CADS Project - Tous droits réservés.
