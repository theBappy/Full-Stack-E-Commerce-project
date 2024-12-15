export const getToken = () => localStorage.getItem('token'); // Get token from localStorage

export const isAdmin = (user) => user?.role === 'admin'; // Check if user's role is admin
