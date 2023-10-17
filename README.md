# MovieNotes :: Node.js API

## Index

- [Install](#install)
  - [Running locally](#running-locally)
- [Routes](#routes)
  - [Users](#users)
    - [Create users](#create-users)
    - [Update users](#update-users)
    - [Delete users](#delete-users)
  - [Notes](#notes)
    - [Add note](#add-note)
    - [Get notes](#get-notes)
      - [Query parameters](#query-parameters)
    - [Show note](#show-note)
    - [Delete note](#delete-note)
- [Errors](#errors)

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

### Running locally

Before running the application locally, you need to set up the database and tables using the following command:

```bash
npm run migrate
```

Afterward, start the server:

```bash
npm run dev
```

The server will be running on port `3333`, , and you can access the API through the following URL: [http:/localhost:3333](http:/localhost:3333). f needed, you can change the port by modifying the `PORT` variable in `./src/server.js` (line 24).

## Routes

### Users

#### Create users

To create a new user, send a request with JSON data as specified below:

- Path: `/users`
  - _Example URL: `http:/localhost:3333/users`_

##### JSON Payload:

```json
{
  "name": "STRING",
  "email": "STRING",
  "password": "STRING"
}
```

##### Returns:

```json
{ "message": "User has been created successfully." }
```

#### Update users

To update a user, provide the user `id` as a parameter in the URL. Changing the password requires specifying both `currentPassword` and `newPassword`. If `name` and/or `email` are empty, the previous data stored in the database will be retained.

- Path: `/users/:id`
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

##### Returns:

```json
{ "message": "User has been updated." }
```

#### Delete users

To delete a user, the `id`, `password`, and `confirmPassword` are mandatory.

- Path: `/users/delete`
  - _Example URL: `http:/localhost:3333/users/delete`_

##### JSON Payload:

```json
{
  "id": "NUMBER",
  "password": "STRING",
  "confirmPassword": "STRING"
}
```

##### Returns:

```json
{ "message": "User has been removed successfully." }
```

### Notes

#### Add note

To create and add a new note, send a request with the following JSON data:

- Path: `/users`
  - _Example URL: `http:/localhost:3333/users`_

##### JSON Payload:

```json
{
  "title": "STRING",
  "description": "STRING",
  "user_id": "NUMBER",
  "vote": "NUMBER", // From 1 to 5
  "tags": "STRING[]" // At least 1 element inside of Array
}
```

##### Returns:

```json
{ "message": "Note has been added successfully." }
```

#### Get notes

Retrieve a list of notes using the following endpoint:

- Path: `/notes`
  - _Example URL: `http:/localhost:3333/notes`_

##### Returns:

```json
[
  {
    "id": "NUMBER",
    "title": "STRING",
    "description": "STRING",
    "vote": "NUMBER", // From 1 to 5
    "user_id": "NUMBER",
    "created_at": "DATE",
    "updated_at": "DATE",
    "tags": "STRING"[]
  }
]
```

##### Query parameters

```js
  user_id: "NUMBER",
  // Ex: http://localhost:3333/notes?user_id=1

  title: "STRING",
  // Can be full or partial word
  // Ex: http://localhost:3333/notes?title=godfather

  tags: STRING,
  // Separate multiple tags by commas (,)
  // Ex: http://localhost:3333/notes?tags=action,comedy

  order: "asc" or "desc"
  // Order by updated date (Default: "desc")
  // Ex: http://localhost:3333/notes?user_id=1&order=asc
```

#### Show note

Get a specific note providing note `id` as a parameter in the URL:

- Path: `/notes/:id`
  - _Example URL: `http:/localhost:3333/notes/1`_

##### Returns:

```json
[
  {
    "id": "NUMBER",
    "title": "STRING",
    "description": "STRING",
    "vote": "NUMBER", // From 1 to 5
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

#### Delete note

To delete a note, provide the note `id` in the JSON payload.

- Path: `/users/delete`
  - _Example URL: `http:/localhost:3333/users/delete`_

##### JSON Payload:

```json
{ "id": "NUMBER" }
```

##### Returns:

```json
{ "message": "Note has been removed successfully." }
```

## Errors

If a request fails due to missing or incorrect request data, the API will return a JSON response in the following structure:

```json
{
  "status": "error",
  "message": "FAILED MESSAGE HERE."
}
```
