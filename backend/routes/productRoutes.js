const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsByCategory, addProduct } = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.post('/', addProduct);

module.exports = router; 