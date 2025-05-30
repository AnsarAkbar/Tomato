const express = require('express');
const router = express.Router();
const { getOrders, updateOrderStatus } = require('../controllers/order.controller');

router.get('/', getOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;