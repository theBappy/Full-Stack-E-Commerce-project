const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');
const { createPaymentIntent, stripeWebhook } = require('../controllers/paymentController');

router.post('/payment', isAuthenticatedUser, createPaymentIntent);
router.post('/webhook', isAuthenticatedUser, stripeWebhook);

module.exports = router;