import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/order/my-orders'; // Base URL for both routes

/**
 * Get all orders for the logged-in user
 * @returns {Promise} - A promise that resolves with the list of orders
 */
export const getAllOrders = async () => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Include the Bearer token for protected routes
      }
    };
    const response = await axios.get(API_BASE_URL, config); // Calls /api/v1/order/my-orders
    return response.data; // Response contains { success: true, data: orders }
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

/**
 * Get order details by order ID
 * @param {string} orderId - The ID of the order to fetch
 * @returns {Promise} - A promise that resolves with the order details
 */
export const getOrderDetails = async (orderId) => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Include the Bearer token for protected routes
      }
    };
    const response = await axios.get(`${API_BASE_URL}/${orderId}`, config); // Calls /api/v1/order/my-orders/:id
    return response.data; // Response contains { success: true, data: order }
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};


