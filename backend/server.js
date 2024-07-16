const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoDbConnection = require("./utils/database");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);

const port = process.env.PORT || 8001;

const start = async () => {
  try {
    await mongoDbConnection(process.env.MONGODBURL);
    console.log("Successfully connected to MongoDb");
    app.listen(port, () => {
      console.log(`server is running on port no ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
