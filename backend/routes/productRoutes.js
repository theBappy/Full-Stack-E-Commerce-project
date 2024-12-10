const express = require('express');
const router = express.Router();
const { 
  createProduct, 
  getAllProducts, 
  getSingleProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


// 📌 Public Routes
router.get('/products', getAllProducts);
router.get('/products/:id', getSingleProduct);

// 📌 Admin Routes (Create, Update, Delete)
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'),  createProduct);
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.delete('/admin/product/:id',isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;
