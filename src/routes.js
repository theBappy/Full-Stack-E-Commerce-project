import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MyOrders from './pages/MyOrders';
import AdminOrders from './pages/AdminOrders';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import { AdminRoute } from './components/AdminRoute';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
