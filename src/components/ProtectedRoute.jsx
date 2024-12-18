import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);


  console.log('Loading status:', loading);
  console.log('User status:', user);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner while user is being loaded
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if no user
  }

  return children;
};

export default ProtectedRoute;

