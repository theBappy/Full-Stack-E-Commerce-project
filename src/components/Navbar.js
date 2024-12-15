import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '10px' }}>Home</Link>
      {!user ? (
        <>
          <Link to="/login" style={{ color: '#fff', marginRight: '10px' }}>Login</Link>
          <Link to="/register" style={{ color: '#fff' }}>Register</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard" style={{ color: '#fff', marginRight: '10px' }}>Dashboard</Link>
          <Link to="/profile" style={{ color: '#fff', marginRight: '10px' }}>Profile</Link>
          <button onClick={handleLogout} style={{ color: '#fff', background: 'red', border: 'none', padding: '5px 10px' }}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
