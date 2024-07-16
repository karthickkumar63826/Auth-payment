const CustomError = require("../middleware/customError");
const Cart = require("../models/cartModel");

const getProducts = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new CustomError("Cart not found", 404));
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    return next(new CustomError(error.message, 500));
  }
};

const addProduct = async (req, res, next) => {
  const userId = req.user._id;
  const { productId, title, quantity, image, price } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ productId, title, quantity, image, price }],
        total: price * quantity,
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );
      console.log(itemIndex);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId,
          title,
          quantity,
          image,
          price,
        });
      }

      cart.total = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error.message);
    return next(new CustomError(error.message, 500));
  }
};

const removeProduct = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new CustomError("Cart Not Found", 404));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      cart.total = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      res.status(200).json(cart);
    } else {
      return next(new CustomError("Item not found in cart", 404));
    }
  } catch (error) {
    console.log(error.message);
    return next(new CustomError(error.message, 422));
  }
};

const updateQuantity = async (req, res, next) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new CustomError("Cart not Found", 404));
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (item) {
      item.quantity = quantity;
      cart.total = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      res.status(200).json(cart);
    } else {
      return next(new CustomError("Item not found on cart", 404));
    }
  } catch (error) {
    console.log(error.message);
    return next(new CustomError(error.message, 422));
  }
};

module.exports = { getProducts, addProduct, removeProduct, updateQuantity };
