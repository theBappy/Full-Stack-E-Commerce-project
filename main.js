import { loadStripe } from '@stripe/stripe-js';

// 1️⃣ Initialize Stripe with your Publishable Key (Make sure the key is in your .env file)
const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); 

// 2️⃣ Create and style the card element
const elements = stripe.elements();
const cardElement = elements.create('card', {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#a0aec0',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
});
cardElement.mount('#card-element');

// 3️⃣ Reference form, button, and message elements
const form = document.getElementById('payment-form');
const submitButton = document.getElementById('submit');
const paymentMessage = document.getElementById('payment-message');

// 4️⃣ Form submission logic
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Disable the submit button to prevent multiple clicks
  submitButton.disabled = true;
  submitButton.textContent = 'Processing...';

  try {
    // 🟠 4a: Request the clientSecret from the server
    const response = await fetch('/api/v1/orderpay/payment', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error('Failed to fetch client secret from server.');

    const { clientSecret } = await response.json();

    // 🟠 4b: Confirm the card payment using the client secret
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: document.getElementById('name').value,  // Get name from user input
        },
      },
    });

    if (error) {
      // Handle card errors (e.g., incorrect card details)
      paymentMessage.textContent = `❌ Payment failed: ${error.message}`;
    } else {
      // Handle successful payment
      paymentMessage.textContent = `✅ Payment successful! Payment Intent ID: ${paymentIntent.id}`;
    }
  } catch (error) {
    // Handle fetch errors and other general errors
    paymentMessage.textContent = `❌ Network error: ${error.message}`;
  } finally {
    // Re-enable the button after the process is complete
    submitButton.disabled = false;
    submitButton.textContent = 'Pay Now';
  }
});
