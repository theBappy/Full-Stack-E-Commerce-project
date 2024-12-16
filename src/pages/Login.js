import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/AuthService'; // Assuming you have this service

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext); // Access setUser from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password); // Call login API
      localStorage.setItem('token', response.token); // Store token in localStorage

      // Decode the user from the token
      const decodedUser = jwt_decode(response.token); 
      setUser(decodedUser.user); // Set the user in context
      
      // Redirect to dashboard or wherever
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;


