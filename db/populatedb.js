const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  NAME VARCHAR(255),
  CATEGORY VARCHAR(255),
  VALUE DECIMAL(10, 2),
  QUANTITY INT
);

INSERT INTO items (NAME, CATEGORY, VALUE, QUANTITY)
VALUES ('Absolut Vodka', 'Alcoholic Beverage', 12.99, 3)
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
