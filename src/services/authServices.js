import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
  return response.data;
};

export const register = async (data) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
  return response.data;
};
