import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart, updateItemQuantity } = useCart();
  const navigate = useNavigate();

  // Handle quantity change for cart items
  const handleQuantityChange = (id, quantity) => {
    if (isNaN(quantity) || quantity <= 0) return; // Prevent negative, zero, or non-numeric quantity
    updateItemQuantity(id, quantity);
  };

  // Navigate to checkout page
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items before proceeding to checkout.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li 
                key={item._id} // Key prop should be unique
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    ${item.price.toLocaleString()} x {item.quantity} = 
                    <strong> ${ (item.price * item.quantity).toLocaleString() }</strong>
                  </p>
                </div>

                <div className="d-flex align-items-center">
                  <input 
                    type="number" 
                    className="form-control me-2" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))} 
                    min="1"
                    onBlur={(e) => { 
                      if (!e.target.value || e.target.value <= 0) { 
                        handleQuantityChange(item.id, 1); // Reset to 1 if invalid
                      }
                    }}
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
            <h3>Total Price: <strong>${totalPrice.toFixed(2)}</strong></h3>
            <button className="btn btn-success" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;



