const express = require("express");
const cartRoutes = express.Router();
const {
  getProducts,
  addProduct,
  removeProduct,
  updateQuantity,
} = require("../controller/cartController");
const authMiddleware = require("../middleware/authMiddleware");

cartRoutes.get("/", authMiddleware, getProducts);
cartRoutes.post("/add", authMiddleware, addProduct);
cartRoutes.delete("/remove", authMiddleware, removeProduct);
cartRoutes.put("/update", authMiddleware, updateQuantity);

module.exports = cartRoutes;
