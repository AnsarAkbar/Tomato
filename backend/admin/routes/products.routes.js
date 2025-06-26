const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { auth } = require('../../middleware/auth');
const { checkPermissions } = require('../../middleware/checkPermissions');
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');
const { upload } = require('../../utils/cloudinary');



// Multer configuration (stores files temporarily in memory)
// const upload = multer({ storage: multer.memoryStorage() });

// Routes  checkPermissions('create-product'),
router.get('/', auth, checkPermissions('list-products'), getProducts);
router.post('/create', auth, upload.single('image'), checkPermissions('create-product'), createProduct);
router.put('/:id',auth, upload.single('image'), checkPermissions('update-product'), updateProduct);
router.delete('/:id', auth, checkPermissions('delete-product'), deleteProduct);

module.exports = router;    