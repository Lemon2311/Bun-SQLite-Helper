import { Database } from "bun:sqlite";

let db;

let autoIncrement;

export const setupDB = (dbName, autoIncrementId = false) => {
  db = new Database(dbName, { create: true });
  autoIncrement = autoIncrementId;
};

export const insert = (table, attributes, autoIncrementId = false) => {
  autoIncrementId = Boolean(autoIncrementId); // Ensure autoIncrementId is a boolean

  if (autoIncrementId || autoIncrement) {
    const lastId = getLastId(table);
    attributes.id = lastId ? lastId + 1 : 1; // If lastId exists, increment it. Otherwise, start at 1.
  }

  const keys = Object.keys(attributes).join(", ");
  const values = Object.values(attributes);
  const placeholders = values.map(() => "?").join(", ");

  db.query(`INSERT INTO ${table} (${keys}) VALUES (${placeholders})`).run(
    ...values
  );
};

export const createTable = (name, attributes) =>
  db.query(`CREATE TABLE IF NOT EXISTS ${name} (${attributes})`).run();

export const getLastId = (table) => {
  const row = db.query(`SELECT MAX(id) as maxId FROM ${table}`).get();
  return row.maxId;
};

export const remove = (table, attributes) => {
  const keys = Object.keys(attributes);
  const values = Object.values(attributes);
  const conditions = keys.map((key) => `${key} = ?`).join(" AND ");

  db.query(`DELETE FROM ${table} WHERE ${conditions}`).run(...values);
};

export const select = (table, attributes) => {
  const keys = Object.keys(attributes);
  const values = Object.values(attributes);
  const conditions = keys.map((key) => `${key} = ?`).join(" AND ");

  const result = db
    .query(`SELECT * FROM ${table} WHERE ${conditions}`)
    .all(...values);
  return result.length === 1 ? result[0] : result;
};

export const update = (table, searchAttributes, newValues) => {
  const searchKeys = Object.keys(searchAttributes);
  const searchValues = Object.values(searchAttributes);
  const searchConditions = searchKeys.map((key) => `${key} = ?`).join(" AND ");

  const updateKeys = Object.keys(newValues);
  const updateValues = Object.values(newValues);
  const updateStatements = updateKeys.map((key) => `${key} = ?`).join(", ");

  db.query(
    `UPDATE ${table} SET ${updateStatements} WHERE ${searchConditions}`
  ).run(...updateValues, ...searchValues);
};