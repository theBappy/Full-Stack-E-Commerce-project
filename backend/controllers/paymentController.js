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

// Webhook Logic
exports.stripeWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ message: `Webhook error: ${err.message}` });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful:', paymentIntent.id);
      break;
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      console.log('Payment failed:', failedPaymentIntent.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};

