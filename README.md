[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/CTZlsc_y)

# WEB SERVICE (Ynov) - Service dédié à l’authentification (Utilisation de OAuth et OpenID)

## Description du service

**Objectif** : Créer un service d'authentification qui permet aux utilisateurs de se connecter via OAuth et OpenID. Ce service sera responsable de la vérification des identifiants des utilisateurs et de la génération de jetons d'accès sécurisés.

**Fonctionnalités clés** :

- Intégration avec trois fournisseur d'identité OAuth (comme Google, Facebook, etc.).
- Utilisation de JWT pour sécuriser votre API.
- Implémentation des flux d'autorisation OAuth 2.0 et OpenID Connect.
- Sécurisation des communications et des données d'authentification.

> Votre Service devra interagir avec le service dédié aux operation en base de donnée pour inscrire et et connecter les utilisateurs.

## Project members

- Clément DUFOUR-LAMARTINIE
- Clément WALSH DE SERRANT

## Installation and configuration

Run `npm install`

Create `.env` file

.env configuration :

 <pre>
PORT=3002

JWT_SECRET=
 </pre>

## Run project

Run `npm run dev`
