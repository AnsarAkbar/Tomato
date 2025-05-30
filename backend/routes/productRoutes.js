const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsByCategory, addProduct } = require('../controllers/product.controller');

router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.post('/', addProduct);

module.exports = router; 