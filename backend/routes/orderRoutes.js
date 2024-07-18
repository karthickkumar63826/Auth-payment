const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllOrder, updateStatus } = require("../controller/orderController");

routes.get("/", authMiddleware, getAllOrder);
routes.post("/update-order-Status", authMiddleware, updateStatus);

module.exports = routes;
