[![fr](https://img.shields.io/badge/lang-fr--fr-blue.svg)](./README.fr-FR.md)   

# FoodAPI
## Table of contents
* [General info](#general-info)
* [Description](#description)
* [Installation](#installation)
* [Tasks](#tasks)
* [Support](#support)
* [Contributing](#contributing)
* [Authors and acknowledgment](#authors-and-acknowledgment)
* [License](#license)

## General info
This project is a school project for the development quality course at Aix Marseille Université.
Its goal is to write a REST API in Javascript using NodeJS and Express.

## Description
| Endpoint                | Description                                                                                                                                               |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GET /`                 | Sends the `index.html` file from the `src` directory.                                                                                                      |
| **Authentication Endpoints** |
| `POST /login`           | Handles user login.                                                                                                                                      |
| `POST /logout`          | Handles user logout.                                                                                                                                     |
| `POST /register`        | Registers a new user. (TODO: Implementation is pending)                                                                                                   |
| `POST /refresh`         | Refreshes the user's access token.                                                                                                                       |
| **Protected Route**      |
| `GET /protected`        | Requires authentication using the `authenticateToken` middleware and then accesses the `protectedRoute`.                                                 |
| **Users Endpoints**      |
| `GET /users`            | Retrieves a list of all users (protected, requires authentication).                                                                                       |
| `GET /users/me`         | Retrieves information about the authenticated user (protected, requires authentication).                                                                 |
| `GET /users/:id`        | Retrieves information about a user by their ID (protected, requires authentication).                                                                     |
| `POST /users/add`       | Adds a new user (protected, requires authentication, only accessible to admin users).                                                                    |
| `PATCH /users/:id`      | Modifies a user's information (protected, requires authentication).                                                                                        |
| `DELETE /users/:id`     | Deletes a user (protected, requires authentication).                                                                                                      |
| **Recipes Endpoints**    |
| `GET /recipes`          | Retrieves a list of all recipes (unprotected, accessible to everyone).                                                                                     |
| `GET /recipes/:id`      | Retrieves information about a recipe by its ID (unprotected, accessible to everyone).                                                                     |
| `POST /recipes/add`     | Adds a new recipe (protected, requires authentication).                                                                                                   |
| `PATCH /recipes/:id`    | Modifies a recipe's information (protected, requires authentication).                                                                                     |
| `DELETE /recipes/:id`   | Deletes a recipe (protected, requires authentication).                                                                                                    |
| **Ingredients Endpoints** |
| `GET /ingredients`      | Retrieves a list of all ingredients (unprotected, accessible to everyone).                                                                                 |
| `GET /ingredients/:id`  | Retrieves information about an ingredient by its ID (unprotected, accessible to everyone).                                                               |
| `GET /recipes/:id/ingredients` | Retrieves ingredients for a specific recipe by its ID (unprotected, accessible to everyone).                                                      |
| `POST /ingredients/add` | Adds a new ingredient (protected, requires authentication).                                                                                              |
| `PATCH /ingredients/:id` | Modifies an ingredient's information (protected, requires authentication).                                                                                |
| `DELETE /ingredients/:id` | Deletes an ingredient (protected, requires authentication).                                                                                              |


## Installation
Clone the repository and install the dependencies with the command `npm install`.
Setup the database with the command `npm run setup`.
Then, launch the project with the command `npm start`.

## Tasks
[Tasks](./work.md)

## Support
Raise an issue on the repository if you have any problem. I'll try to answer as soon as possible.

## Contributing
Feel free to contribute to the project by forking it and making a pull request. Please keep in mind that this project is a school project and that it is not meant to be used in production.

## Authors and acknowledgment
HUDE Dimitri

## License
This project is under Aix Marseille Université - refered to as AMU - supervision and can be used by AMU for any purpose on the express condition that AMU makes mention of the authors of the project.
