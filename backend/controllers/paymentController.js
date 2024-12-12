const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ✅ 1️⃣ Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    // 1. Create a Payment Intent on Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe works in cents (so $10 = 1000 cents)
      currency, // USD, EUR, etc.
      automatic_payment_methods: {
        enabled: true, // Enable all automatic payment methods (card, etc.)
      },
    });

    // 2. Send client secret to the frontend
    res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment Intent Error:', error.message);
    res.status(500).json({ success: false, message: 'Payment Intent Failed', error: error.message });
  }
};

