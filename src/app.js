import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminOrdersPage from './pages/AdminOrderPage';
import {ToastContainer} from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/api/v1/order/my-orders" element={<MyOrdersPage />} />
            <Route path="/api/v1/order/orders/:id/status" element={<AdminOrdersPage />} />
          </Routes>
  
          {/* Toasts will appear here */}
          <ToastContainer />
        </div>
      </Router>
    );
  }