import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getToken } from '../utils/TokenHelper';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const { cartItems } = useCart();
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (totalAmount < 0.5) {
      alert('The payment amount must be at least $0.50');
      return;
    }

    setLoading(true);
    setError(null); 

    try {
      const token = getToken();
      const amountInCents = Math.round(totalAmount * 100);
      const response = await fetch('/api/v1/orderpay/create-intent', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: amountInCents }), 
      });

      const responseData = await response.json();
      console.log('Response from server:', responseData);

      const { clientSecret } = responseData;
      if (!clientSecret) throw new Error('Unable to retrieve payment client secret.');

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (stripeError) throw new Error(stripeError.message);
      if (paymentIntent?.status !== 'succeeded') throw new Error(`Payment failed: ${paymentIntent?.status}`);

      onPaymentSuccess(paymentIntent);

      const orderDetails = {
        orderId: paymentIntent.id,
        amountPaid: totalAmount,
        paymentStatus: paymentIntent.status,
        items: cartItems,
      };
      localStorage.removeItem('cart');
      navigate('/order-confirmation', {state: {orderDetails}});
    } catch (err) {
      console.error('Payment error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Total: ${totalAmount.toFixed(2)}</p>
      <CardElement />
      {error && <div className="error">{error}</div>}
      <button disabled={loading}>{loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}</button>
    </form>
  );
};

export default PaymentForm;




