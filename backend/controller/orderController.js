const Orders = require("../models/orderModel");
const CustomError = require("../middleware/customError");

const getAllOrder = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const orders = await Orders.find({ user: userId }).populate(
      "user",
      "username, email"
    );

    res.json(orders);
  } catch (error) {
    console.log(error.message);
    return next(new CustomError(error.message, 500));
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { sessionId, status } = req.body;
    const order = await Orders.findOne({ paymentId: sessionId });

    if (!order) {
      return next(new CustomError("Order not found", 404));
    }

    order.status = status;
    await order.save();
    res.json("Order status updated");
  } catch (error) {
    console.log(error.message);
    return next(new CustomError(error.message, 500));
  }
};

module.exports = { getAllOrder, updateStatus };
