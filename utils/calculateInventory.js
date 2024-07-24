const db = require("../db/queries");

async function calculateTotalInventoryValue() {
  const items = await db.getAllItems();
  let totalValue = 0;

  items.forEach((item) => {
    totalValue += item.value * item.quantity;
  });

  return totalValue;
}

async function calculateTotalInventoryQuantity() {
  const items = await db.getAllItems();
  let totalQuantity = 0;

  items.forEach((item) => {
    totalQuantity += item.quantity;
  });

  return totalQuantity;
}

module.exports = {
  calculateTotalInventoryValue,
  calculateTotalInventoryQuantity,
};
