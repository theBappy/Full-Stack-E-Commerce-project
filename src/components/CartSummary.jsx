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




// import React from 'react';
// import { useCart } from '../context/CartContext';

// const CartSummary = ({ cartItems }) => {
//   const { cartItems, totalItems, totalPrice } = useCart();
//   console.log('Cart items: ', cartItems);
//   const calculateTotal = () => {
//     return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
//   };

//   return (
//     <div className="cart-summary">
//       <h2>Cart Summary</h2>
//       <ul>
//         {cartItems.map(item => (
//           <li key={item._id}>
//             <p>{item.name}</p>
//             <p>Quantity: {item.quantity}</p>
//             <p>Price: ${item.price}</p>
//             <p>Total: ${item.quantity * item.price}</p>
//           </li>
//         ))}
//       </ul>
//       <p><strong>Total: ${calculateTotal()}</strong></p>
//     </div>
//   );
// };

// export default CartSummary;
