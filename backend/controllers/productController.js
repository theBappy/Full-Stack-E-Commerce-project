const Product = require('../models/productModel');

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
    let sortBy = req.query.sort ? req.query.sort.split(',').join(' ') : '-createdAt';


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page -1) * limit;
    const totalPages = Math.ceil(totalProducts / limit);
    
    
    const queryObj = {...req.query};
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el)=> delete queryObj[el]);
    
    
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=> `$${match}`);
    const totalProducts = await Product.countDocuments(JSON.parse(queryStr));

    
    const products = await Product.find(JSON.parse(queryStr)).sort(sortBy).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      totalProducts,
      totalPages,
      currentPage: page,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorStack: error.stack });
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
