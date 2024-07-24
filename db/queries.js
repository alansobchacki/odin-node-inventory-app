const pool = require("./pool");
require("dotenv").config();

// queries to GET and POST items/categories
// items
async function getAllItems() {
  const { rows } = await pool.query(`
    SELECT items.id, items.name, category.name AS category, items.value, items.quantity FROM items
    JOIN category ON items.category_id = category.id
  `);
  return rows;
}

async function insertItem(name, category, value, quantity) {
  const categoryResult = await pool.query(
    "SELECT id FROM category WHERE name = $1",
    [category]
  );

  const categoryId = categoryResult.rows[0].id;

  await pool.query(
    "INSERT INTO items (NAME, CATEGORY_ID, VALUE, QUANTITY) VALUES ($1, $2, $3, $4)",
    [name, categoryId, value, quantity]
  );
}

async function getMostExpensiveItem() {
  const { rows } = await pool.query(
    "SELECT * FROM items ORDER BY value DESC LIMIT 1"
  );

  return rows[0];
}

async function getItemWithHighestQuantity() {
  const { rows } = await pool.query(
    "SELECT * FROM items ORDER BY quantity DESC LIMIT 1"
  );

  return rows[0];
}

// categories
async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
}

async function insertCategory(name) {
  await pool.query(
    "INSERT INTO category (NAME) VALUES ($1) ON CONFLICT DO NOTHING",
    [name]
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
  getAllCategories,
  insertCategory,
  getMostExpensiveItem,
  getItemWithHighestQuantity,
};
