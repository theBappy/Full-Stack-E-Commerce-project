import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ totalAmount, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    // Call backend to create a payment intent
    const { data: clientSecret } = await fetch('http://localhost:5000/api/v1/orderpay/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount * 100 }), // Convert to cents
    }).then((res) => res.json());

    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (paymentIntent.status === 'succeeded') {
      onPaymentSuccess(paymentIntent); // Handle successful payment
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Details</h2>
      <CardElement />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default PaymentForm;
