const express = require("express");
const router = express.Router();
const db = require("../db/queries");

const inventory = require("./index").inventory;

/* GET items page */
router.get("/", function (req, res, next) {
  res.render("items");
});

/* GET add new users page. */
router.get("/new", function (req, res, next) {
  res.render("itemForm");
});

/* POST create items array */
router.post("/", function (req, res, next) {
  const itemName = req.body.itemName;
  const itemCategory = req.body.itemCategory;
  const itemBrand = req.body.itemBrand;
  const itemPrice = req.body.itemPrice;
  const itemQuantity = req.body.itemQuantity;

  res.redirect("/");
});

module.exports = router;
