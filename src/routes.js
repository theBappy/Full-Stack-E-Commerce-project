import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  if(loading){
    return <div>Loading...</div> // Show loading spinner
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
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
      </Routes>
    </Router>
  );
}

export default AppRoutes;
