
# CADS - Client Accounting Data Store 📊

CADS est une solution de gestion comptable centralisée conçue pour automatiser le suivi des dossiers clients, la gestion des alertes fiscales et le stockage sécurisé des documents.

---

**Lien GitHub :** ["https://github.com/MarinaKamel-coder/CADS.git"]

## 🏗️ Architecture du Projet

### Technologies utilisées

* **Frontend :** React 18, Vite, Recharts (Stats).
* **Backend :** Node.js, Express, TypeScript.
* **Base de données :** PostgreSQL (via Neon.tech), Prisma ORM.
* **Sécurité :** Clerk Auth (Authentification JWT)

---

## 🎨 Fonctionnalités Frontend

Sidebar Pro : Navigation avec logo transparent et intégration Clerk.

Dashboard : Vue d'ensemble avec cartes de statistiques en temps réel.

Gestion Clients : Formulaire d'ajout moderne (modale floue) avec pastilles de statut (Actif/Inactif).

Alertes : Système de notification visuel par priorité (Rouge, Orange, Bleu).

Téléchargement et visualisation de documents.

---

## 🗄️ Structure de la Base de Données

L'application repose sur un schéma relationnel optimisé :

Clients : Informations signalétiques, contacts et NAS (crypté).

Alertes (Alerts) : Système de monitoring des échéances.

INFO : Rappel de routine.

Users : Liaison avec les identifiants de session Clerk.

---

## 4. Variables d'environnement

=================================================================================

Variable                                     Description

================================================================================

DATABASE_URL                           Lien de connexion PostgreSQL (Neon)

CLERK_PUBLISHABLE_KEY            Clé publique pour l'authentification Frontend

CLERK_SECRET_KEY                 Clé secrète pour valider les jetons côté Backend

PORT                                       Port du serveur (3000)

=================================================================================

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

## 🧪 Tests API avec test.rest

Pour tester le Backend sans passer par l'interface, nous utilisons l'extension REST Client de VS Code. Comme le backend est sécurisé par Clerk, chaque requête nécessite un jeton (Token).

Comment obtenir le Token ?

1. Connectez-vous sur le frontend (http://localhost:5173).

2. Ouvrez l'inspecteur du navigateur (F12) -> Onglet Network.

3. Cliquez sur une requête API sortante.

4. Copiez la valeur du header Authorization (Bearer eyJ...).

@baseUrl = http://localhost:3000
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

© 2026 CADS Project - Tous droits réservés.
