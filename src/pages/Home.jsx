import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      // Redirect to a search results page or handle search logic
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="hero-section d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="text-center">
        <h1 className="display-4 fw-bold mb-4">Welcome to MyApp</h1>
        <p className="lead mb-4">
          Discover our powerful features and explore everything we have to offer.
        </p>

        {/* SEARCH INPUT */}
        <form onSubmit={handleSearch} className="mb-4">
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Search for products, users, or features..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button type="submit" className="btn btn-primary btn-lg">
            Search
          </button>
        </form>

        <div className="d-flex justify-content-center">
          <Link to="/login" className="btn btn-primary btn-lg me-3">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline-primary btn-lg">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

