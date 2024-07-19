const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: "localhost",
  user: "daedalus",
  database: "top_users",
  password: "741852963IWBTG",
  port: 5432, // The default port
});
