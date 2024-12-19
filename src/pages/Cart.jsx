import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart, updateItemQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) return; // Prevent negative quantity
    updateItemQuantity(id, quantity);
  };

  const handleCheckout = () => {
    Navigate('/checkout');
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}</strong>
                  <p>${item.price} x {item.quantity} = ${item.price * item.quantity}</p>
                </div>

                <div className="d-flex align-items-center">
                  <input 
                    type="number" 
                    className="form-control me-2" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))} 
                    min="1"
                  />
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <button className="btn btn-success" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;


