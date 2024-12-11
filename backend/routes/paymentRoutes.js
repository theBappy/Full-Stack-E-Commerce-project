const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');
const {processPayment} = require('../controllers/paymentController');

router.post('/payment', isAuthenticatedUser, processPayment);

module.exports = router;