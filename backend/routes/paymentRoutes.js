const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');
const { createPaymentIntent } = require('../controllers/paymentController');

router.post('/payment', isAuthenticatedUser, createPaymentIntent);

module.exports = router;