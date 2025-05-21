const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory } = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.post('/', addCategory);

module.exports = router; 