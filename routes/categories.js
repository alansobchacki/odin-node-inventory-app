const express = require("express");
const router = express.Router();
const db = require("../db/queries");
const checkPassword = require("../utils/checkPassword");

/* GET new category page */
router.get("/new", function (req, res, next) {
  res.render("newCategoryForm");
});

/* GET edit category page */
router.get("/edit", async function (req, res, next) {
  const categories = await db.getAllCategories();
  const categoriesArray = categories.map((row) => row.name);

  res.render("editCategoryForm", { categoriesArray });
});

/* GET delete category page */
router.get("/delete", async function (req, res, next) {
  const categories = await db.getAllCategories();
  const categoriesArray = categories.map((row) => row.name);

  res.render("deleteCategoryForm", { categoriesArray });
});

/* POST create new category */
router.post("/", checkPassword, async function (req, res, next) {
  try {
    const categoryName = req.body.categoryName;

    await db.insertCategory(categoryName);
    res.redirect("/");
  } catch (err) {
    console.log("Failed to add new item", err);
    next(err);
  }
});

/* PATCH update a category */
router.patch("/", checkPassword, async function (req, res, next) {
  try {
    const oldCategoryName = req.body.oldCategoryName;
    const newCategoryName = req.body.newCategoryName;

    await db.editCategory(newCategoryName, oldCategoryName);
    res.redirect("/");
  } catch (err) {
    console.log("Failed to edit category", err);
    next(err);
  }
});

/* DELETE delete a category */
router.delete("/", checkPassword, async function (req, res, next) {
  try {
    const categoryToDelete = req.body.categoryName;

    await db.deleteCategory(categoryToDelete);
    res.redirect("/");
  } catch (err) {
    console.log("Failed to delete category", err);
    next(err);
  }
});

module.exports = router;
