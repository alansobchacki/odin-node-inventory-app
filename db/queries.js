const pool = require("./pool");
require("dotenv").config();

async function getAllItems() {
  const { rows } = await pool.query(`SELECT * FROM items`);
  return rows;
}

async function insertItem(name, category, value, quantity) {
  await pool.query(
    "INSERT INTO items (NAME, CATEGORY, VALUE, QUANTITY) VALUES ($1, $2, $3, $4)",
    [name, category, value, quantity]
  );
}

async function editItem(name, newCategory, newValue, newQuantity) {
  await pool.query(
    "UPDATE items SET category = $1, value = $2, quantity = $3 WHERE name = $4",
    [newCategory, newValue, newQuantity, name]
  );
}

async function deleteItem(name) {
  await pool.query("DELETE FROM items WHERE name = $1", [name]);
}

async function deleteCategory(category) {
  await pool.query("DELETE FROM items WHERE category = $1", [category]);
}

module.exports = {
  getAllItems,
  insertItem,
};
