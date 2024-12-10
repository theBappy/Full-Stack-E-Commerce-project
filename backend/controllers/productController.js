const Product = require('../models/productModel');
const { buildQuery, buildSort, buildPagination, countFilteredProducts } = require('../utils/queryBuild');

// 📌 1. Create a New Product (Admin Only)
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 📌 2. Get All Products (For Users)
exports.getAllProducts = async (req, res) => {
  try {
    // 1️⃣ Extract and format helper functions
    const sortBy = buildSort(req);
    const { page, limit, skip } = buildPagination(req);
    const queryObj = buildQuery(req);
    
    // 2️⃣ Count the total products that match the query
    const totalProducts = await countFilteredProducts(queryObj);
    const totalPages = Math.ceil(totalProducts / limit);
    
    // 3️⃣ Find products using Mongoose query
    const products = await Product.find(queryObj)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);
    
    // 4️⃣ Send back response
    res.status(200).json({
      success: true,
      totalProducts,
      totalPages,
      currentPage: page,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message,
      errorStack: error.stack 
    });
  }
};

// 📌 3. Get Single Product Details
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 📌 4. Update Product (Admin Only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 📌 5. Delete Product (Admin Only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
