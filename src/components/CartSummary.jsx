import React from 'react';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const { cartItems, totalItems, totalPrice } = useCart();

  console.log('Cart items: ', cartItems); // This should now show the correct data

  return (
    <div>
      <h2>Cart Summary</h2>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default CartSummary;




