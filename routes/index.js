const express = require("express");
const router = express.Router();
const db = require("../db/queries");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const usernames = await db.getAllUsernames();
    console.log("usernames: ", usernames);
    res.render("index", { title: "Express", usernames });
  } catch (err) {
    console.log("Error fetching usernames", err);
    next(err);
  }
});

/* GET add new user page */
router.get("/new", function (req, res, next) {
  res.render("form");
});

router.post("/new", async function (req, res, next) {
  try {
    const username = req.body.username;
    await db.insertUsername(username);
    res.redirect("/");
  } catch (err) {
    console.error("Failed to add new user", err);
    next(err);
  }
});

module.exports = router;
