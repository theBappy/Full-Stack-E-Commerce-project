
import React, { useState } from 'react';
import BillingForm from '../components/BillngForm';
import CartSummary from '../components/CartSummary';
import PaymentForm from '../components/PaymentForm';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems = [] }) => { // Default value for cartItems
  const [billingDetails, setBillingDetails] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleBillingSubmit = (data) => {
    setBillingDetails(data); // Store billing details in state
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    // Optionally, save the order data in the backend here
  };

  // Check if cartItems exists before calling reduce to prevent errors
  const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="checkout-page">
      {!billingDetails && <BillingForm onSubmit={handleBillingSubmit} />}
      {billingDetails && !paymentSuccess && (
        <>
          <CartSummary cartItems={cartItems} />
          <PaymentForm totalAmount={totalAmount} onPaymentSuccess={handlePaymentSuccess} />
        </>
      )}
      {paymentSuccess && <h2>Payment Successful! Your order is being processed.</h2>}
    </div>
  );
};

export default Checkout;

