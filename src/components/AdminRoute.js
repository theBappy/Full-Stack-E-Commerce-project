import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  return children;
};
