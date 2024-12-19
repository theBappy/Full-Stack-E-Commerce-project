import React from 'react';

const CartSummary = ({ cartItems }) => {
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <p>Total: ${item.quantity * item.price}</p>
          </li>
        ))}
      </ul>
      <p><strong>Total: ${calculateTotal()}</strong></p>
    </div>
  );
};

export default CartSummary;
