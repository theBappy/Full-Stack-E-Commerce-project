import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Order Details</h2>
      <p>Viewing details for order ID: {id}</p>
    </div>
  );
};

export default OrderDetails;

