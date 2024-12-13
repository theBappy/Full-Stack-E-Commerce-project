import React, { useEffect, useState, useCallback } from 'react';
import { fetchOrders, updateOrderStatus } from '../services/orderServices';
import OrderCard from '../components/Ordercard';

const AdminOrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [updatingOrder, setUpdatingOrder] = useState(null); // Tracks which order is being updated

  // Fetch orders on component mount
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  // Update order status
  const handleStatusChange = useCallback(async (orderId, status) => {
    try {
      setUpdatingOrder(orderId); // Track the order being updated
      await updateOrderStatus(orderId, status);
      // Update the order's status locally in state
      setOrders((prevOrders) => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status } : order
        )
      );
      alert('Order status updated successfully');
    } catch (error) {
      console.error('Error updating status', error);
    } finally {
      setUpdatingOrder(null); // Reset the updating status
    }
  }, []);

  if (loading) return <div className="spinner-container"><div className="spinner"></div></div>;

  return (
    <div>
      <h1>Admin Orders</h1>

      {orders.length > 0 ? (
        orders.map(order => (
          <OrderCard 
            key={order._id} 
            order={order} 
            isAdmin={true} 
            onStatusChange={handleStatusChange} 
          />
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AdminOrdersPage;
