const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');
const { create, getAll, getOne, update, deleteRole } = require('../controllers/roles.controller');


// Create a new role
router.post('/create', auth, create);
router.get('/', auth, getAll);
// Get all roles
module.exports = router;