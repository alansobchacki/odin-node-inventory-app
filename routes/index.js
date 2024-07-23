const express = require("express");
const router = express.Router();
const db = require("../db/queries");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const items = await db.getAllItems();
    res.render("index", { items });
  } catch (err) {
    console.log("Error fetching inventory", err);
    next(err);
  }
});

module.exports = router;
