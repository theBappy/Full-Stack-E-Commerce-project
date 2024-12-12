import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrdersPage = () => {
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

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/v1/order/orders/${orderId}/status`, { status });
      alert('Order status updated');
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  return (
    <div>
      <h1>Admin Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <select 
              onChange={(e) => updateOrderStatus(order._id, e.target.value)} 
              value={order.status}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrdersPage;
