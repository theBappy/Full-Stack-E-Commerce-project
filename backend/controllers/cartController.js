const Cart = require('../models/Cart');

// 📌 Get Cart for a User
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'No cart found for this user' });
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Add Product to Cart
exports.addToCart = async (req, res) => {
  const { productId, name, quantity, price } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, cartItems: [{ productId, name, quantity, price }] });
    } else {
      const productIndex = cart.cartItems.findIndex(item => item.productId.toString() === productId);
      if (productIndex >= 0) {
        cart.cartItems[productIndex].quantity += quantity;
      } else {
        cart.cartItems.push({ productId, name, quantity, price });
      }
    }
    cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    await cart.save();
    res.status(201).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Update Quantity in Cart
exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'No cart found for this user' });

    const productIndex = cart.cartItems.findIndex(item => item._id.toString() === id);
    if (productIndex >= 0) {
      cart.cartItems[productIndex].quantity = quantity;
    }
    cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Remove Item from Cart
exports.removeCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'No cart found for this user' });

    cart.cartItems = cart.cartItems.filter(item => item._id.toString() !== id);
    cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
