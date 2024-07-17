const express = require("express");
const routes = express.Router();
const makePayment = require("../controller/stripController");

routes.post("/create-checkout-session", makePayment);

module.exports = routes;
