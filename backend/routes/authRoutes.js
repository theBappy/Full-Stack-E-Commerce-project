const express = require('express');
const { register, login, getUserProfile } = require('../controllers/authControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route (requires JWT)
router.get('/profile', protect, getUserProfile);

module.exports = router;
