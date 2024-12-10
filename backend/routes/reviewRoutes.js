const express = require('express');
const { createReview, getReviews, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth'); // Assuming you have auth middleware

const router = express.Router();

// 📌 Create a review (POST) — authenticated users only
router.post('/', protect, createReview);

// 📌 Get all reviews for a product (GET)
router.get('/:productId', getReviews);

// 📌 Delete a review (DELETE) — authenticated users only
router.delete('/:reviewId', protect, deleteReview);

module.exports = router;


