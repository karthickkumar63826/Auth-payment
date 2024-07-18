const express = require("express");
const routes = express.Router();
const makePayment = require("../controller/stripController");
const authMiddleware = require("../middleware/authMiddleware");

routes.post("/create-checkout-session", authMiddleware, makePayment);

module.exports = routes;
