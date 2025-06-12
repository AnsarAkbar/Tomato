const express = require('express');
const router = express.Router();

// Import client controllers
const { sendContactEmail, getEmails } = require('../controllers/emailGunController');
const orderRouter = require('./order.routes');
const {
    getProducts,
    getCategories,
} = require('../controllers/clientController');
const { auth } = require('../../middleware/auth');

// Product routes
router.get('/products', getProducts);

// Category routes
router.get('/categories', getCategories);

router.post("/send", auth, sendContactEmail);

router.get("/", auth, getEmails);

// router.get("/emails", auth, getEmails);
// router.get("/emails", auth, getEmails);

router.use('/orders', orderRouter);


module.exports = router; 