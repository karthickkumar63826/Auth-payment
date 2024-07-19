const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParse = require("body-parser");
const mongoDbConnection = require("./utils/database");
const errorHandler = require("./middleware/errorHandler");

const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());
app.use(bodyParse.json());
app.use(
  cors({
    origin: ["https://bytizeecommerce.netlify.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
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
app.use("/api/product", paymentRoutes);
app.use("/api/orders", orderRoutes);
