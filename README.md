# MovieNotes :: Node.js API

This MovieNotes API is a RESTful web service designed to manage users, movie notes, and tags. It provides a set of endpoints to manage users, notes, and retrieve information about notes and tags.

The codebase follows a modular and organized structure, including separate modules for user, notes, and tags management. The routes are handled using `Express.js`, and database operations are managed using `Knex.js` and `SQLite 3`.

## Tecnologies used

![node.js](https://img.shields.io/badge/node.js-292b36?style=for-the-badge&logo=node.js)
![express](https://img.shields.io/badge/express-292b36?style=for-the-badge&logo=express)
![sqlite3](https://img.shields.io/badge/sqlite3-292b36?style=for-the-badge&logo=sqlite)
![knex](https://img.shields.io/badge/knex-292b36?style=for-the-badge)

## Index

- [Key Features](#key-features)
- [Install](#install)
  - [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Users](#users)
  - [Create Users](#create-users)
  - [Update Users](#update-users)
  - [Delete Users](#delete-users)
- [Notes](#notes)
  - [List Notes](#list-notes)
    - [Query Parameters](#list-notes-query-parameters)
  - [Get Note](#get-note)
  - [Add Note](#add-note)
  - [Delete Note](#delete-note)
- [Tags](#tags)
  - [List Tags](#list-tags)
    - [Query Parameters](#list-tags-query-parameters)
  - [Get Tag](#get-tag)
- [Errors](#errors)

## Key Features

#### User Features:

- Create a new user
- Update user information
- Delete a user

#### Notes Features:

- List all and filtered notes
- Show details of a specific note
- Add a note
- Delete a note

#### Tags Features:

- List all and filtered tags
- Get tag details

## Install

Clone this repository using `git clone`:

```bash
git clone https://github.com/julianosill/explorer-node-movies.git
```

Go to the folder and install the dependencies:

```bash
cd explorer-node-movies
npm install
```

### Running Locally

Runs the application locally executing the following command. It'll first create the database, run the migrations, and then start the server.

```bash
npm run dev
```

The server will be running on port `3333`, you can access the API through the following URL: [http:/localhost:3333](http:/localhost:3333). If needed, you can change the port by modifying the `PORT` variable in `./src/server.js` (line 24).

## API Endpoints

#### User Endpoints:

- POST `/users`: create a new user
- PUT `/users/:id`: update user information
- DELETE `/users/:id`: delete a user

#### Notes Endpoints:

- GET `/notes`: list all notes
- GET `/notes/:id`: get details of a specific note
- POST `/notes`: add a note
- DELETE `/notes/:id`: delete a note

#### Tags Endpoints:

- GET `/tags`: list all tags
- GET `/tags/:name`: get details of a specific tag

## Users

### Create Users

To create a new user, send a request with the data required in the JSON payload as specified below to `/users` endpoint with `POST` method.

- _Example URL: `http:/localhost:3333/users`_

##### JSON Payload:

```json
{
  "name": "STRING",
  "email": "STRING",
  "password": "STRING"
}
```

#### Returns:

```json
{ "message": "User has been created successfully." }
```

### Update Users

To update a user, provide the user `id` as a parameter in the URL using `/users/:id` endpoint with `PUT` method. Changing the password requires specifying both `currentPassword` and `newPassword`. If `name` and/or `email` are empty, the previous data stored in the database will be retained.

- _Example URL: `http:/localhost:3333/users/1`_

##### JSON Payload:

```json
{
  "name": "STRING",
  "email": "STRING",
  "currentPassword": "STRING",
  "newPassword": "STRING"
}
```

#### Returns:

```json
{ "message": "User has been updated." }
```

### Delete Users

To delete a user, the `id`, `password`, and `confirmPassword` are mandatory. Provide the user `id` as a parameter in the URL and other required data in the JSON payload using `/users/:id` endpoint with `DELETE` method.

- _Example URL: `http:/localhost:3333/users/1`_

##### JSON Payload:

```json
{
  "password": "STRING",
  "confirmPassword": "STRING"
}
```

#### Returns:

```json
{ "message": "User has been removed successfully." }
```

## Notes

### List Notes

Retrieve a list of notes using the `/notes` endpoint with `GET` method.

- _Example URL: `http:/localhost:3333/notes`_

#### Returns:

```json
[
  {
    "id": "NUMBER",
    "title": "STRING",
    "description": "STRING",
    "vote": "NUMBER",
    "user_id": "NUMBER",
    "created_at": "DATE",
    "updated_at": "DATE",
    "tags": "STRING[]"
  }
]
```

- `vote`: From 1 to 5;
- `tags`: Array of strings.

#### List Notes: query parameters

```js
  user_id: "NUMBER",
  // Ex: http://localhost:3333/notes?user_id=1

  title: "STRING",
  // Can be full or partial word
  // Ex: http://localhost:3333/notes?title=godfather

  tags: "STRING",
  // Separate multiple tags by commas (,)
  // Ex: http://localhost:3333/notes?tags=action,comedy

  order: "asc" or "desc"
  // Order by updated date (Default: "desc")
  // Ex: http://localhost:3333/notes?user_id=1&order=asc
```

### Get Note

Get a specific note details providing note `id` as a parameter in the URL using `/notes/:id` endpoint with `GET` method.

- _Example URL: `http:/localhost:3333/notes/1`_

#### Returns:

```json
[
  {
    "id": "NUMBER",
    "title": "STRING",
    "description": "STRING",
    "vote": "NUMBER",
    "user_id": "NUMBER",
    "created_at": "DATE",
    "updated_at": "DATE",
    "tags": [
      {
        "id": "NUMBER",
        "name": "STRING",
        "note_id": "NUMBER",
        "user_id": "NUMBER"
      }
    ]
  }
]
```

- `vote`: From 1 to 5.

### Add Note

To create and add a new note, send a `POST` request to `/notes` endpoint with the following JSON payload:

- _Example URL: `http:/localhost:3333/users`_

##### JSON Payload:

```json
{
  "title": "STRING",
  "description": "STRING",
  "user_id": "NUMBER",
  "vote": "NUMBER",
  "tags": "STRING[]"
}
```

- `vote`: Must be a number from 1 to 5;
- `tags`: Must be an Array of string, with at least one.

#### Returns:

```json
{ "message": "Note has been added successfully." }
```

### Delete Note

To delete a note, provide the note `id` as a paramater in the URL using `/notes/:id` endpoint with `DELETE` method.

- _Example URL: `http:/localhost:3333/users/1`_

#### Returns:

```json
{ "message": "Note has been removed successfully." }
```

## Tags

### List Tags

Retrieve a list of tags using `/tags` endpoint with `GET` method.

- _Example URL: `http:/localhost:3333/tags`_

#### Returns:

```json
[
  {
    "id": "NUMBER",
    "name": "STRING",
    "note_id": "NUMBER",
    "user_id": "NUMBER"
  }
]
```

#### List Tags: query parameters

```js
  user_id: "NUMBER",
  // Ex: http://localhost:3333/tags?user_id=1

  title: "STRING",
  // Ex: http://localhost:3333/tags?note_id=1

  order: "asc" or "desc"
  // Order by tag name (Default: "asc")
  // Ex: http://localhost:3333/tags?user_id=1&order=asc
```

### Get Tag

Get details of a specific tag providing its `name` as a parameter in the URL using `/tags/:name` endpoint with `GET` method.

- _Example URL: `http:/localhost:3333/tags/action`_

#### Returns:

```json
[
  {
    "name": "STRING",
    "quantity": "NUMBER"
  }
]
```

- `quantity`: returns the number of notes with the tag.

## Errors

If a request fails due to missing or incorrect request data, the API will return a JSON response in the following structure:

```json
{
  "status": "error",
  "message": "FAILED MESSAGE HERE."
}
```
