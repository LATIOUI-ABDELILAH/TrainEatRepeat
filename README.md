## Démarrage du Projet

### 1. Naviguer vers le répertoire backend

Accédez au répertoire **backend** où se trouvent les dépendances et le serveur du projet :

### 2. Cas de : Git Bash

cd backend
rm -rf node_modules package-lock.json
npm install
npm rebuild better-sqlite3
node create-db.js
node server.js

Ces commandes servent à démarrer le backend.

### 3. Cas de : Ubuntu/Linux

Rien à faire pour le backend
node create-db.js
node server.js

## Communication Backend

Pour communiquer avec le backend, il faut que le frontend tourne sur le port 4200. Si vous utilisez un autre port, cela ne va pas marcher.


# Traineatrepeat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
