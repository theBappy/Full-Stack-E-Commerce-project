import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/Ordercard'; 
import { toast } from 'react-toastify';

const MyOrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/v1/order/my-orders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      await axios.delete(`/api/v1/order/new/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
      toast.success('Order successfully canceled');
    } catch (error) {
      toast.error('Failed to cancel the order');
      console.error('Error canceling order', error);
    }
  };
  
  return (
    <div>
      <h1>My Orders</h1>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : orders.length > 0 ? (
        orders.map(order => <OrderCard key={order._id} order={order} />)
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrdersPage;

