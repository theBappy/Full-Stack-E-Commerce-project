import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent, processPayment } from '../services/PaymentService';

const stripePromise = loadStripe('pk_test_51QUqZtB9k7mttOuhLwRzabqHgpmLzQTjpgz17KwD8X1WsTGwNfCitkI2doEQm7Lu2oSuel7uyLmaTe6F2HyySl6M00QvxqomsD'); // Replace with your Stripe public key

const StripePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const initializePaymentIntent = async () => {
      try {
        const paymentData = { amount: 5000, currency: 'usd' }; // Example data
        const response = await createPaymentIntent(paymentData);
        setClientSecret(response.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    initializePaymentIntent();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        console.error('Payment error:', paymentResult.error);
        setError(paymentResult.error.message);
      } else {
        console.log('Payment successful:', paymentResult.paymentIntent);
        await processPayment({ paymentIntentId: paymentResult.paymentIntent.id });
        alert('Payment successful!');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h2>Stripe Payment</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const WrappedStripePayment = () => (
  <Elements stripe={stripePromise}>
    <StripePayment />
  </Elements>
);

export default WrappedStripePayment;
