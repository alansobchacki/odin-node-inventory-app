const pool = require("./pool");
require("dotenv").config();

async function getAllItemNames() {
  const { rows } = await pool.query(`SELECT NAME FROM items`);
  return rows;
}

async function insertItem(name, category, value, quantity) {
  await pool.query(
    "INSERT INTO items (NAME, CATEGORY, VALUE, QUANTITY) VALUES ($1, $2, $3, $4)",
    [name, category, value, quantity]
  );
}

module.exports = {
  getAllItemNames,
  insertItem,
};
