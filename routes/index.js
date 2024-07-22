const express = require("express");
const router = express.Router();
const db = require("../db/queries");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const itemnames = await db.getAllItemNames();
    res.render("index", { title: "Express", itemnames });
  } catch (err) {
    console.log("Error fetching inventory", err);
    next(err);
  }
});

module.exports = router;
