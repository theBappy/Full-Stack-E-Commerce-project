import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="container">
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item._id}>
          <h5>{item.name} (x{item.quantity})</h5>
          <button onClick={() => increaseQuantity(item._id)}>+</button>
          <button onClick={() => decreaseQuantity(item._id)}>-</button>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;

