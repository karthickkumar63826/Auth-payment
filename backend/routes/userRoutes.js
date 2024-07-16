const express = require("express");
const userRoutes = express.Router();
const { signup, login } = require("../controller/userController");

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);

module.exports = userRoutes;
