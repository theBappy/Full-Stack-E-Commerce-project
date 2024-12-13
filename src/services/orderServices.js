import axios from 'axios';

export const fetchOrders = async () => {
  const { data } = await axios.get('/api/v1/order/my-orders');
  return data;
};

export const updateOrderStatus = async (orderId, status) => {
  const { data } = await axios.put(`/api/v1/order/orders/${orderId}/status`, { status });
  return data;
};
