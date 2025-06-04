const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');
const { upload } = require('../../utils/cloudinary');


router.get('/', getCategories);
router.post('/',upload.single('image'), createCategory);
router.put('/:id',upload.single('image'), updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;