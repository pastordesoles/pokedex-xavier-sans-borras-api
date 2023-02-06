[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pastordesoles_pokedex-xavier-sans-borras-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pastordesoles_pokedex-xavier-sans-borras-api) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=pastordesoles_pokedex-xavier-sans-borras-api&metric=bugs)](https://sonarcloud.io/summary/new_code?id=pastordesoles_pokedex-xavier-sans-borras-api) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=pastordesoles_pokedex-xavier-sans-borras-api&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=pastordesoles_pokedex-xavier-sans-borras-api) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=pastordesoles_pokedex-xavier-sans-borras-api&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=pastordesoles_pokedex-xavier-sans-borras-api) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=pastordesoles_pokedex-xavier-sans-borras-api&metric=coverage)](https://sonarcloud.io/summary/new_code?id=pastordesoles_pokedex-xavier-sans-borras-api) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=pastordesoles_pokedex-xavier-sans-borras-api&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=pastordesoles_pokedex-xavier-sans-borras-api) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=pastordesoles_pokedex-xavier-sans-borras-api&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=pastordesoles_pokedex-xavier-sans-borras-api)

# Pokedex API

> API for the Pokedex.
> Live demo [_here_](https://pokedex-api-xavier-sans-borras.onrender.com/).

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Endpoints](#endpoints)
- [Project Status](#project-status)
- [Contact](#contact)

## General Information

API rest that manages all favourite Pokemon.

> Front repository [_here_](https://github.com/pastordesoles/pokedex-xavier-sans-borras).

## Technologies Used

- Node
- Express
- Typescript
- Chalk
- Cors
- Debug
- Dotenv
- Faker-js
- Fishery
- Mongoose
- Morgan
- Nodemon
- Jest
- Supertest
- Mongo Memory Server

## Setup

You will find all the dependencies at the _package.json_ file. Run the command _npm install_ in your CLI to install them.

The command _npm run start_ starts the server in the development mode.
You will need to specify a port to open it in a http://localhost address.

The command _npm run start:dev_ starts the server in watch mode.

## Endpoints

- (GET) /pokemon/list -> Retrieves a list of available favourite Pokemon. Body -> Its body must return a list of Pokemon.
- (POST) /pokemon/add -> Add a favourite Pokemon. Its body must return an object with a valid Pokemon.
- (DELETE) /pokemon/delete/:id -> Delete a favourite Pokemon. Body -> Its body must return an object with a delete confirmation message.

## Project Status

Project is: _in progress_

## Contact

Created by [Xavi](https://www.linkedin.com/in/xaviersansb/) - feel free to contact me!
