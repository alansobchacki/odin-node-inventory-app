const express = require("express");
const router = express.Router();
const db = require("../db/queries");

const inventory = require("./index").inventory;

/* GET add new items page. */
router.get("/new", async function (req, res, next) {
  const categories = await db.getAllCategories();
  const categoriesArray = categories.map((row) => row.name);
  res.render("newItemForm", { categoriesArray });
});

/* POST create items array */
router.post("/", async function (req, res, next) {
  try {
    const itemName = req.body.itemName;
    const itemCategory = req.body.itemCategory;
    const itemPrice = req.body.itemPrice;
    const itemQuantity = req.body.itemQuantity;

    await db.insertItem(itemName, itemCategory, itemPrice, itemQuantity);
    res.redirect("/");
  } catch (err) {
    console.log("Failed to add new item", err);
    next(err);
  }
});

/* DELETE request to delete an item */
router.delete("/:name", async function (req, res, next) {
  try {
    const itemName = req.params.name;

    await db.deleteItem(itemName);
    res.redirect("/");
  } catch (err) {
    console.error("Failed to delete item", err);
    next(err);
  }
});

module.exports = router;
