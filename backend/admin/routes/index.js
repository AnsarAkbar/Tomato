const express = require('express');
const router = express.Router();

// Import admin controllers
const { 
    getDashboardStats,
    getRecentOrders,
    getRevenueData,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getOrders,
    updateOrderStatus,
    getUsers,
    updateUserRole
} = require('../controllers/adminController');

// Middleware
const { isAdmin } = require('../../middleware/auth');

// Apply admin middleware to all routes
router.use(isAdmin);

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/recent-orders', getRecentOrders);
router.get('/dashboard/revenue', getRevenueData);

// Product routes
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Category routes
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Order routes
router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);

// User routes
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);

module.exports = router; 