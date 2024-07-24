const express = require("express");
const router = express.Router();
const db = require("../db/queries");

/* GET add new users page. */
router.get("/new", function (req, res, next) {
  res.render("categoryForm");
});

/* POST create new category */
router.post("/", async function (req, res, next) {
  try {
    const categoryName = req.body.categoryName;

    await db.insertCategory(categoryName);
    res.redirect("/");
  } catch (err) {
    console.log("Failed to add new item", err);
    next(err);
  }
});

module.exports = router;
