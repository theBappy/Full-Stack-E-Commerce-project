// OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/v1/order/my-orders');  // Adjust based on your API endpoint
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.orderId} className="order-item">
              <h3>Order ID: {order.orderId}</h3>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Status: {order.paymentStatus}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map(item => (
                  <li key={item.productId}>
                    {item.productName} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
