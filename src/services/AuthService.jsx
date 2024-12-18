import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;  // Return the response data, typically token and user
  } catch (error) {
    // Handle any errors that occur during registration
    if (error.response) {
      // Server responded with an error status code
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from the server');
    } else {
      // Some error occurred during the setup of the request
      throw new Error(error.message || 'An error occurred during registration');
    }
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;  // Return the response data, typically token and user
  } catch (error) {
    // Handle any errors that occur during login
    if (error.response) {
      // Server responded with an error status code
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from the server');
    } else {
      // Some error occurred during the setup of the request
      throw new Error(error.message || 'An error occurred during login');
    }
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },  // Corrected typo here
    });
    return response.data;  
  } catch (error) {
    // Handle any errors that occur when fetching the user profile
    if (error.response) {
      // Server responded with an error status code
      throw new Error(error.response.data.message || 'Failed to fetch profile');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from the server');
    } else {
      // Some error occurred during the setup of the request
      throw new Error(error.message || 'An error occurred while fetching the profile');
    }
  }
};

