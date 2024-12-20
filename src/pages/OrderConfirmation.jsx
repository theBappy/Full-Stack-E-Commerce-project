import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext'; // Adjust the path if your CartContext is in another directory

const OrderConfirmation = () => {
  const { clearCart, totalItems } = useCart();

  useEffect(() => {
    clearCart(); // Clear cart immediately on successful payment
  }, [clearCart]);

  return (
    <div className="order-confirmation">
      <h1>🎉 Thank you for your purchase!</h1>
      <p>Your order has been successfully placed.</p>

      {/* Display the total items to confirm it's 0 */}
      <p><strong>Cart Items Remaining:</strong> {totalItems}</p> 

      <p>You will receive an email confirmation shortly with your order details.</p>

      <button 
        onClick={() => window.location.href = '/shop'} 
        className="back-to-shop-btn"
      >
        🛒 Back to Shop
      </button>
    </div>
  );
};

export default OrderConfirmation;

