import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To access the order ID from the URL
import { AuthContext } from '../context/AuthContext'; // Assuming you're using context for auth

const OrderDetails = () => {
  const { id } = useParams();  // Get order ID from the URL
  const { user } = AuthContext();  // Get the logged-in user from context (optional)
  const [order, setOrder] = useState(null);  // To store the order data
  const [loading, setLoading] = useState(true);  // To manage the loading state
  const [error, setError] = useState(null);  // To manage error state

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/order/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Sending JWT token for authentication
          },
        });
        setOrder(response.data);  // Set the order data to state
        setLoading(false);  // Stop loading
      } catch (err) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);  // Fetch data when the order ID changes

  if (loading) {
    return <div>Loading...</div>;  // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>;  // Show error message
  }

  if (!order) {
    return <div>No order found</div>;  // Handle case where order doesn't exist
  }

  return (
    <div className="order-details">
      <h2>Order Details</h2>

      <div className="order-info">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Order Status:</strong> {order.status}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
      </div>

      <h3>Items:</h3>
      <ul className="order-items">
        {order.products.map((item, index) => (
          <li key={index}>
            <p><strong>Product:</strong> {item.product.name}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> ${item.product.price}</p>
            <p><strong>Total:</strong> ${item.product.price * item.quantity}</p>
          </li>
        ))}
      </ul>

      <h3>Total: ${order.totalAmount}</h3>
    </div>
  );
};

export default OrderDetails;
