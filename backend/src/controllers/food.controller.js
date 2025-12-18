const foodModel = require("../models/food.model");





// Create a new food item

async function createFood(req, res) {
  console.log(req.foodPartner);
  console.log(req.body);
  console.log(req.file);
  res.send("Create a new food item");
}

//

module.exports = {
  createFood,
};
