import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get order details from the location state
  const orderDetails = location.state?.orderDetails;

  return (
    <div className="order-confirmation">
      <h1>🎉 Thank you for your purchase!</h1>
      <p>Your order was placed successfully. Here are your order details:</p>

      {orderDetails ? (
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p><strong>Amount Paid:</strong> ${orderDetails.amountPaid.toFixed(2)}</p>
          <p><strong>Payment Status:</strong> {orderDetails.paymentStatus}</p>

          <h3>Items Purchased</h3>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} x {item.quantity} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>We couldn't retrieve your order details. Please check your email for a receipt.</p>
      )}

      <button onClick={() => navigate('/')}>🛒 Back to Shopping</button>
    </div>
  );
};

export default OrderConfirmation;
