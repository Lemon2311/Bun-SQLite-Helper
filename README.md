# Bun.js-SQLite-Helper
This repository contains a Bun.js SQLite database helper module. It provides a set of functions to interact with SQLite databases, including setting up a new database, creating tables, inserting records, retrieving the last inserted ID, removing records, selecting records, and updating records.

## Features

- **Setup Database**: The `setupDB` function initializes a new SQLite database. It takes two parameters: the name of the database and a boolean indicating whether to use auto-incrementing IDs. This will automatically create a database with the specified name if one is not already available.

- **Insert Records**: The `insert` function inserts a new record into a specified table. It takes three parameters: the name of the table, an object containing the attributes to be inserted, and a boolean indicating whether to use auto-incrementing IDs.

- **Create Table**: The `createTable` function creates a new table in the database. It takes two parameters: the name of the table and a string defining the attributes of the table.

- **Get Last ID**: The `getLastId` function retrieves the last inserted ID from a specified table. It takes one parameter: the name of the table.

- **Remove Records**: The `remove` function deletes records from a specified table based on provided attributes. It takes two parameters: the name of the table and an object containing the attributes of the records to be deleted.

- **Select Records**: The `select` function retrieves records from a specified table based on provided attributes. It takes two parameters: the name of the table and an object containing the attributes of the records to be selected.

- **Update Records**: The `update` function updates records in a specified table based on provided search attributes and new values. It takes three parameters: the name of the table, an object containing the search attributes, and an object containing the new values.

## Usage

First, import the module:

```javascript
import { setupDB, insert, createTable, getLastId, remove, select, update } from './main.js';
```

Then, you can use the functions as follows:

```javascript
// Setup a new database
setupDB('myDatabase');

// Create a new table
createTable('myTable', 'id INTEGER PRIMARY KEY, name TEXT');

// Insert a new record
insert('myTable', { name: 'John Doe' }, true);

// Get the last inserted ID
const lastId = getLastId('myTable');

// Remove a record
remove('myTable', { id: lastId });

// Select a record
const record = select('myTable', { id: lastId });

// Update a record
update('myTable', { id: lastId }, { name: 'Jane Doe' });
```

## Dependencies

This module uses the `bun:sqlite` package for interacting with SQLite databases.

## License

This project is licensed under the MIT License.
