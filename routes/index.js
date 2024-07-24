const express = require("express");
const router = express.Router();
const db = require("../db/queries");
const inventoryService = require("../utils/calculateInventory");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const items = await db.getAllItems();
    const expensiveItem = await db.getMostExpensiveItem();
    const abundantItem = await db.getItemWithHighestQuantity();
    const totalValue = await inventoryService.calculateTotalInventoryValue();
    const totalQuantity =
      await inventoryService.calculateTotalInventoryQuantity();

    res.render("index", {
      items,
      mostExpensiveItem: expensiveItem.name,
      mostExpensiveItemPrice: expensiveItem.value,
      mostAbundantItem: abundantItem.name,
      mostAbundantItemQuantity: abundantItem.quantity,
      totalInventoryValue: totalValue,
      totalInventoryQuantity: totalQuantity,
    });
  } catch (err) {
    console.log("Error fetching inventory", err);
    next(err);
  }
});

module.exports = router;
