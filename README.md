# Justify backend
Exercice de recrutement pour Tictactrip

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Permet la justification d'un texte sur des lignes de 80 caractères.

## Déploiement en local

Installation des dépendances :
```sh
git clone https://github.com/Baulti/tictactrip.git
cd tictactrip
npm install
nodemon server
```


## Endpoints

| Endpoint | Méthode | BODY | Description|
| ------ | ------ | ------ |  ------ | 
| /api/signup | POST | { email: <email> , password: <password>} | Créer un utilisateur.
| /api/login | POST | { email: <email> , password: <password>} | Renvoie un token d'authentification JWT.
| /api/justify | POST | <Votre texte à justfier> | Renvoie le texte justifié. Nécessite une authentification par token (Bearer Authentification). Si le nombre maxium de caractères journaliers a été atteint, renvoie une erreur 402 Payment Required.


Vous pouvez tester la solution en utilisant l'URL suivante : 
https://justify-backend.herokuapp.com/
