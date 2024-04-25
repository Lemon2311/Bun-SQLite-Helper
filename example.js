import { createTable, getLastId, insert, select, update, remove, setupDB } from "./main.js";

setupDB("mydb.sqlite", true);

// insert("users", { name: "saluk yuzikuma"});
// insert("users", { name: "saluk yuzikuma"});

update( "users", {id:1}, {name: "yes sir"});

console.log(select("users", { id: 1}));