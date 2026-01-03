
# CADS - Client Accounting Data Store 📊

CADS est une solution de gestion comptable centralisée conçue pour automatiser le suivi des dossiers clients, la gestion des alertes fiscales et le stockage sécurisé des documents.

---

## 🏗️ Architecture du Projet

Le projet est structuré en deux parties principales :

* **Frontend** : Interface utilisateur moderne avec React + Vite.
* **Backend** : API REST sécurisée (Port 3000) gérant la logique métier et Clerk Auth.

---

## ⚙️ Configuration et Lancement

### 1. Variables d'environnement

Créez un fichier `.env` dans le dossier `/frontend` :

```env
VITE_CLERK_PUBLISHABLE_KEY=votre_cle_clerk


2. Lancer le Backend (Port 3000)

```Bash

cd backend
npm install
npm run start

3. Lancer le Frontend (Port 5173)
Bash

cd frontend
npm install
npm run dev
Accès : http://localhost:5173

🎨 Fonctionnalités Frontend
Sidebar Pro : Navigation avec logo transparent et intégration Clerk.

Dashboard : Vue d'ensemble avec cartes de statistiques et liste de clients.

Gestion Clients : Formulaire d'ajout moderne (modale floue) avec pastilles de statut (Actif/Inactif).

Alertes : Système de notification visuel par priorité (Rouge, Orange, Bleu).

🗄️ Structure de la Base de Données
L'application repose sur un schéma relationnel optimisé :

Clients : Informations signalétiques, contacts et NAS (crypté).

Alertes (Alerts) : Système de monitoring des échéances.

INFO : Rappel de routine.

Users : Liaison avec les identifiants de session Clerk.

🧪 Tests API avec test.rest
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
  "email": "jean.t@example.com",
  "status": "ACTIVE"
}


🛠️ Stack Technique
Frontend : React, Vite, React Router, Clerk Auth, Axios.

Backend : Node.js, Express, Clerk SDK.

Design : CSS Variables, Flexbox, Grid, Backdrop-filter.

© 2026 CADS Project - Tous droits réservés.
