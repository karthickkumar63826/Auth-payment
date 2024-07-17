const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoDbConnection = require("./utils/database");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const errorHandler = require("./middleware/errorHandler");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000","https://66976913febba85d1f00731d--snazzy-dasik-4a1e0f.netlify.app"],
    methods: ["GET", "POST"],
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
