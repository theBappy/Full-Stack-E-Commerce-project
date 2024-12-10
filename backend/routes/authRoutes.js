const express = require('express');
const { register, login, getUserProfile } = require('../controllers/authControllers');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route (requires JWT)
router.get('/profile', isAuthenticatedUser, getUserProfile);

module.exports = router;
