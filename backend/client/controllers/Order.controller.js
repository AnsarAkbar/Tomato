const Order = require("../../models/order.model");
const dotenv = require("dotenv");
const Product = require("../../models/product.model");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// console.log(process.env.STRIPE_SECRET_KEY);
// Place an order
exports.createOrder = async (req, res) => {
  // console.log('Create order---->', req.body);
  try {
    const { items, deliveryAddress, paymentId, total, status } = req.body;
    
    const productIds = Object.keys(items);
    const products = await Product.find({ _id: { $in: productIds } });

    const orderItems = products.map((product) => ({
      product: product._id,
      quantity: items[product._id.toString()],
      priceAtPurchase: product.price,
    }));

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      deliveryAddress,
      paymentId,
      status,
      total,
    });
    await order.save();
    res
      .status(201)
      .json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error });
  }
};

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    if (!paymentIntent) {
      return res.status(400).json({ error: "Payment intent not created" });
    }
    // console.log('payment intent', paymentIntent.status);
    res.json({
      message: "Payment intent created",
      clientSecret: paymentIntent.client_secret,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
