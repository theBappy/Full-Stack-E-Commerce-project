import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../services/OrderService'; // Import the service

const OrderDetails = () => {
  const { id } = useParams(); // Get the orderId from the route params
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderDetails(id); // Call the service
        console.log('Fetched order details:', response);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order Details</h2>
      {order ? (
        <>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Items:</strong></p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.name} - {item.quantity} x ${item.price}</li>
            ))}
          </ul>
          <p><strong>Total Price:</strong> ${order.totalPrice}</p>
        </>
      ) : (
        <p>Order not found.</p>
      )}
    </div>
  );
};

export default OrderDetails;


