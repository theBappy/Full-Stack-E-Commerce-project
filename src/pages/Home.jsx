import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart(); // 🟢 Import addToCart from CartContext

  // Dummy Products (can be replaced with API call later)
  const products = [
    { _id: '1', name: 'Laptop', price: 1000, image: 'https://via.placeholder.com/150' },
    { _id: '2', name: 'Smartphone', price: 500, image: 'https://via.placeholder.com/150' },
    { _id: '3', name: 'Headphones', price: 150, image: 'https://via.placeholder.com/150' },
    { _id: '4', name: 'Watch', price: 200, image: 'https://via.placeholder.com/150' },
    { _id: '5', name: 'Camera', price: 800, image: 'https://via.placeholder.com/150' },
    { _id: '6', name: 'Tablet', price: 300, image: 'https://via.placeholder.com/150' },
  ];

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="hero-section" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Welcome to MyApp</h1>
          <p className="lead">
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

        {/* PRODUCT LIST */}
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.name} 
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                    <button 
                      className="btn btn-success"
                      onClick={() => addToCart(product)} // 🟢 Add to cart button
                    >
                      Add to Cart 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h4>No products found</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
