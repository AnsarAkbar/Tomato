const express = require('express');
const router = express.Router();
const { getDashboardStats, getRecentOrders, getRevenueData } = require('../controllers/dashboard.controller');

router.get('/stats', getDashboardStats);
router.get('/recent-orders', getRecentOrders);
router.get('/revenue', getRevenueData);

module.exports = router;