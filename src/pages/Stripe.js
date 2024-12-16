import React, { useEffect } from 'react';

const StripePage = () => {
  useEffect(() => {
    const stripe = Stripe('your-publishable-key');
    const button = document.getElementById('checkout-button');
    button.addEventListener('click', () => {
      stripe.redirectToCheckout({
        sessionId: 'your-session-id',
      });
    });
  }, []);

  return (
    <div>
      <h1>Stripe Payment</h1>
      <button id="checkout-button">Pay with Stripe</button>
    </div>
  );
};

export default StripePage;
