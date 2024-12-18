// AppRoutes.jsx or App.jsx (no need to add Router here)
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // no need for BrowserRouter here
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import StripePage from './pages/Stripe';

function AppRoutes() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // After 2 seconds, set loading to false
    }, 2000); // Simulate a 2-second loading time (replace this with your actual data fetching logic)

    return () => clearTimeout(timer); // Cleanup the timeout on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/orders/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        } />
        <Route path="/stripe" element={<StripePage />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default AppRoutes;

