# Full-Stack-E-Commerce-project


I am totally confused in src folder, our backend every route works, payment system we integrated successfully...make me more clear about 'src' folder, then we will start testing with jest...i have given exactly the file and folder i have..plz kindly see them take time, and scrutiize my src folder and file..what should i do there in src,,,i began confuse when u mention app.js for toast..i didnt make app.js...clear this first..then we will start testing step by step...always keep sequentially task...give small small task and with proper sequence for test...

root project:
backend-->controllers:(auth,cart,order,payment,product,review)
       -->middleware:(auth,imageUpload)
       -->models:(cart,order,product,review,user)
       -->routes:(auth,cart,order,payment,product,review)
       -->utils:(queryBuilder.js)
       -->server.js

node_modules

public--> favicon.ico, index.html

src--> components: ordercard
    --> pages: myorderpage,adminorderpage
    --> services: orderservices
    --> stripeindex.html, stripemain.js

.env
.gitignore
packagee.json
package-lock.json
readme.md
vite.config.js

I totally confused in src folder: in src folder -->
components/ordercard.js
import { formatDistanceToNow } from 'date-fns';

const OrderCard = ({ order, isAdmin, onStatusChange }) => {
  const formattedDate = formatDistanceToNow(new Date(order.createdAt), { addSuffix: true });

  return (
    <div key={order._id} className="order-card">
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Ordered:</strong> {formattedDate}</p>

      {isAdmin && (
        <select 
          onChange={(e) => onStatusChange(order._id, e.target.value)} 
          value={order.status}
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      )}
    </div>
  );
};


export default OrderCard;

pages/myorderpage.js-->
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

pages/adminorderpages.js-->
import React, { useEffect, useState, useCallback } from 'react';
import { fetchOrders, updateOrderStatus } from '../services/orderServices';
import OrderCard from '../components/Ordercard';
import { toast } from 'react-toastify';

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
      setOrders((prevOrders) => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status } : order
        )
      );
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Error updating status', error);
    } finally {
      setUpdatingOrder(null);
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

services: orderservices.js-->
import axios from 'axios';

export const fetchOrders = async () => {
  const { data } = await axios.get('/api/v1/order/my-orders');
  return data;
};

export const updateOrderStatus = async (orderId, status) => {
  const { data } = await axios.put(`/api/v1/order/orders/${orderId}/status`, { status });
  return data;
};




