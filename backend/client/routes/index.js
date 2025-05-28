const express = require('express');
const router = express.Router();

// Import client controllers
const { sendContactEmail, getEmails } = require('../controllers/emailGunController');
const {
    getProducts,
    getCategories,
    placeOrder
} = require('../controllers/clientController');
const { auth } = require('../../middleware/auth');

// Product routes
router.get('/products', getProducts);

// Category routes
router.get('/categories', getCategories);

// Order routes
router.post('/orders', placeOrder);

router.post("/send", auth, sendContactEmail);

router.get("/", auth, getEmails);

// router.get("/emails", auth, getEmails);
// router.get("/emails", auth, getEmails);


module.exports = router; 