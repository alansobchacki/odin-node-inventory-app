const express = require("express");
const router = express.Router();

/* GET categories page */
router.get("/", function (req, res, next) {
  res.render("categories");
});

/* GET add new users page. */
router.get("/new", function (req, res, next) {
  res.render("form", { title: "category" });
});

module.exports = router;
