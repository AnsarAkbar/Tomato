const express = require('express');
const router = express.Router();
const { login, register, verifyToken } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected route
router.get('/verify', auth, verifyToken);

module.exports = router; 