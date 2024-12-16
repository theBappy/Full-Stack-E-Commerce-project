import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth'

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const getUserProfile = async() => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/profile`, {
    headers: {Authorizatiation: `Bearer ${token}`}
  });
  return response.data;
};

