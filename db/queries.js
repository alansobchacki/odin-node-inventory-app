const pool = require("./pool");
require("dotenv").config();

// GET / POST queries
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

// PATCH (EDIT) queries
// items
async function editItem(newName, newCategory, newValue, newQuantity, oldName) {
  const categoryResult = await pool.query(
    "SELECT id FROM category WHERE name = $1",
    [newCategory]
  );

  const categoryId = categoryResult.rows[0].id;

  await pool.query(
    "UPDATE items SET name = $1, category_id = $2, value = $3, quantity = $4 WHERE name = $5",
    [newName, categoryId, newValue, newQuantity, oldName]
  );
}

// categories
async function editCategory(newCategory, oldCategory) {
  await pool.query("UPDATE category SET name = $1 WHERE NAME = $2", [
    newCategory,
    oldCategory,
  ]);
}

// DELETE queries
// items
async function deleteItem(name) {
  await pool.query("DELETE FROM items WHERE name = $1", [name]);
}

// categories
async function deleteCategory(categoryName) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const categoryResult = await client.query(
      "SELECT id FROM category WHERE name = $1",
      [categoryName]
    );

    const categoryId = categoryResult.rows[0].id;

    await client.query("DELETE FROM items WHERE category_id = $1", [
      categoryId,
    ]);

    await client.query("DELETE FROM category WHERE name = $1", [categoryName]);

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

module.exports = {
  getAllItems,
  insertItem,
  getAllCategories,
  insertCategory,
  getMostExpensiveItem,
  getItemWithHighestQuantity,
  deleteItem,
  editItem,
  editCategory,
  deleteCategory,
};
