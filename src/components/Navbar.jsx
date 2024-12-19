import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, loading, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const cartItemCount = 3; // Replace this with dynamic cart count logic when you have cart functionality

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Show loading spinner until the token check is complete
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">MyApp</Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* SEARCH BAR */}
          <form className="d-flex me-auto" role="search">
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search products, users..." 
              aria-label="Search" 
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>

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

                <li className="nav-item dropdown">
                  <Link 
                    className="nav-link dropdown-toggle" 
                    to="#" 
                    id="navbarDropdown" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    {user?.username || 'Profile'}
                  </Link>

                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <Link to="/profile" className="dropdown-item">View Profile</Link>
                    </li>
                    <li>
                      <Link to="/profile/edit" className="dropdown-item">Edit Profile</Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout} 
                        className="dropdown-item text-danger"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>

                {/* CART ICON WITH COUNTER */}
                <li className="nav-item">
                  <Link to="/cart" className="nav-link position-relative">
                    <i className="bi bi-cart-fill" style={{ fontSize: '1.5rem' }}></i>
                    {cartItemCount > 0 && (
                      <span 
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      >
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


