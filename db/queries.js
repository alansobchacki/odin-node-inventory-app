const pool = require("./pool");
require("dotenv").config();

async function getAllItemNames() {
  const { rows } = await pool.query(`SELECT NAME FROM items`);
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

module.exports = {
  getAllItemNames,
  insertUsername,
};
