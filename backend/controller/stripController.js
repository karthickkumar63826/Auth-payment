const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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
    success_url: "https://snazzy-dasik-4a1e0f.netlify.app/success",
    cancel_url: "https://snazzy-dasik-4a1e0f.netlify.app/cancel",
  });

  res.json({ id: session.id });
};

module.exports = makePayment;
