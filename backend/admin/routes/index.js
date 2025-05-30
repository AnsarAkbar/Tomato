const express = require('express');
const router = express.Router();

const rolesRouter = require('./roles.routes');
const userRouter = require('./user.routes');
const productsRouter = require('./products.routes');
const categoriesRouter = require('./categories.routes');
const dashboardRouter = require('./dashboard.routes');
const orderRouter = require('./order.routes');
// Import admin controllers
// const { 
//     getDashboardStats,
//     getRecentOrders,
//     getRevenueData,
//     getCategories,
//     createCategory,
//     updateCategory,
//     deleteCategory,
//     getOrders,
//     updateOrderStatus,
//     getUsers,
//     updateUserRole
// } = require('../controllers/adminController');

// // Middleware
// const { isAdmin } = require('../../middleware/auth');
// const app = express();

// Apply admin middleware to all routes
// router.use(isAdmin);

// Dashboard routes
// router.get('/dashboard/stats', getDashboardStats);
// router.get('/dashboard/recent-orders', getRecentOrders);
// router.get('/dashboard/revenue', getRevenueData);

// Product routes
// router.get('/products', getProducts);
// router.post('/products', createProduct);
// router.put('/products/:id', updateProduct);
// router.delete('/products/:id', deleteProduct);

// Category routes
// router.get('/categories', getCategories);
// router.post('/categories', createCategory);
// router.put('/categories/:id', updateCategory);
// router.delete('/categories/:id', deleteCategory);

// router.get('/orders', getOrders);
// router.put('/orders/:id/status', updateOrderStatus);

router.use('/users', userRouter);
router.use('/roles', rolesRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/dashboard', dashboardRouter);
router.use('/orders', orderRouter);

module.exports = router; 