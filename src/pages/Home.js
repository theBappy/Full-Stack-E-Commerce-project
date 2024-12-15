import React from 'react';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to Our Platform</h1>
      <p>Discover our features and explore everything we have to offer.</p>
      <a href="/login" style={{ marginRight: '10px' }}>Login</a>
      <a href="/register">Register</a>
    </div>
  );
};

export default Home;
