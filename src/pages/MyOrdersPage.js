import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/v1/order/my-orders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ${order.totalPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrdersPage;
