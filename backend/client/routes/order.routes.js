const express = require("express");
const router = express.Router();
const {
  createOrder,
  createPaymentIntent,
} = require("../controllers/Order.controller");
const { auth } = require("../../middleware/auth");

router.post("/create", auth, createOrder);
router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
