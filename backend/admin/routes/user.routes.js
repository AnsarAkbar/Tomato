const router = require('express').Router();
const {
    getUsers,
    updateUser
} = require('../controllers/user.controller.js');
// User routes
router.get('/', getUsers);
router.put('/:id', updateUser);

module.exports = router;