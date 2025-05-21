const express = require('express');
const router = express.Router();

// Import client controllers
const { 
    getProducts,
    getCategories,
    placeOrder
} = require('../controllers/clientController');

// Product routes
router.get('/products', getProducts);

// Category routes
router.get('/categories', getCategories);

// Order routes
router.post('/orders', placeOrder);

module.exports = router; 