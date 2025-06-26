const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');
const { upload } = require('../../utils/cloudinary');
const { auth } = require('../../middleware/auth');
const { checkPermissions } = require('../../middleware/checkPermissions');


router.get('/', getCategories);
router.post('/create', upload.single('image'), auth, checkPermissions('create-category'), createCategory);
router.put('/:id', upload.single('image'), auth, checkPermissions('update-category'), updateCategory);
router.delete('/:id', auth, checkPermissions('delete-category'), deleteCategory);

module.exports = router;