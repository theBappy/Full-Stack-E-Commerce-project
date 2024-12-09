const express = require('express');
const { 
  createProduct, 
  getAllProducts, 
  getSingleProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

const router = express.Router();

// 📌 Public Routes
router.get('/products', getAllProducts);
router.get('/products/:id', getSingleProduct);

// 📌 Admin Routes (Create, Update, Delete)
router.post('/admin/product/new', createProduct);
router.put('/admin/product/:id', updateProduct);
router.delete('/admin/product/:id', deleteProduct);

module.exports = router;
