const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/orderModel");

const makePayment = async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.title,
        images: [product.image],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url:
      "https://rainbow-hummingbird-18899b.netlify.app/success/{CHECKOUT_SESSION_ID}",
    cancel_url:
      "https://rainbow-hummingbird-18899b.netlify.app/cancel/{CHECKOUT_SESSION_ID}",
  });

  const order = await Order.create({
    user: req.user._id,
    products: products,
    paymentId: session.id,
    status: "successfull",
  });

  await order.save();
  res.json({ id: session.id });
};

module.exports = makePayment;
