const express = require("express");
const router = express.Router();
const db = require("../db/queries");
const checkPassword = require("../utils/checkPassword");

const inventory = require("./index").inventory;

/* GET add new items page. */
router.get("/new", async function (req, res, next) {
  const categories = await db.getAllCategories();
  const categoriesArray = categories.map((row) => row.name);
  res.render("newItemForm", { categoriesArray });
});

/* GET edit items page */
router.get("/edit/:name", async function (req, res, next) {
  const categories = await db.getAllCategories();
  const categoriesArray = categories.map((row) => row.name);
  const oldName = req.params.name;

  res.render("editItemForm", { categoriesArray, oldName });
});

/* GET delete items page */
router.get("/delete/:name", async function (req, res, next) {
  const oldName = req.params.name;

  res.render("deleteItemForm", { oldName });
});

/* POST create new item */
router.post("/", checkPassword, async function (req, res, next) {
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

/* PATCH update an item */
router.patch("/", checkPassword, async function (req, res, next) {
  try {
    const oldName = req.body.oldName;
    const newName = req.body.itemName;
    const newCategory = req.body.itemCategory;
    const newValue = req.body.itemPrice;
    const newQuantity = req.body.itemQuantity;

    await db.editItem(newName, newCategory, newValue, newQuantity, oldName);
    res.redirect("/");
  } catch (err) {
    console.log("Failed to edit item", err);
    next(err);
  }
});

/* DELETE delete an item */
router.delete("/", checkPassword, async function (req, res, next) {
  try {
    const itemName = req.body.oldName;

    await db.deleteItem(itemName);
    res.redirect("/");
  } catch (err) {
    console.error("Failed to delete item", err);
    next(err);
  }
});

module.exports = router;
