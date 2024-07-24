const express = require("express");
const router = express.Router();
const db = require("../db/queries");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const items = await db.getAllItems();
    const queryExpensiveItems = await db.getMostExpensiveItem();
    const mostExpensiveItem = queryExpensiveItems.name;
    const mostExpensiveItemPrice = queryExpensiveItems.value;

    const queryAbundantItems = await db.getItemWithHighestQuantity();
    const mostAbundantItem = queryAbundantItems.name;
    const mostAbundantItemQuantity = queryAbundantItems.quantity;

    res.render("index", {
      items,
      mostExpensiveItem,
      mostExpensiveItemPrice,
      mostAbundantItem,
      mostAbundantItemQuantity,
    });
  } catch (err) {
    console.log("Error fetching inventory", err);
    next(err);
  }
});

module.exports = router;
