import axios from 'axios';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
  return response.data;
};
