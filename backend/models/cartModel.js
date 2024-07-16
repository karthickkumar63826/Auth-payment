const mongoose = require("mongoose");
const User = require("./userModel");

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  image: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    total: {
      type: Number,
      default: 0,
      required: true,
      get: (value) => parseFloat(value.toFixed(2)),
    },
  },
  {
    timeStamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

module.exports = mongoose.model("Cart", cartSchema);
