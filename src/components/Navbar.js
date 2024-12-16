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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">MyApp</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-danger btn-sm ms-2"
                    style={{ marginTop: '7px' }} // optional style tweak
                  >
                    Logout
                  </button>
                </li>
              </>      // <> </> React Fragment
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
