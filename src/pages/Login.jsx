import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/AuthService'; // Assuming you have this service
import jwt_decode from 'jwt-decode';  // Ensure jwt-decode is imported

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext); // Access setUser from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call login API
      const response = await loginUser({ email, password });  // Assuming you send an object to the loginUser service
      if (response && response.token) {
        localStorage.setItem('token', response.token); // Store token in localStorage

        // Decode the user from the token
        const decodedUser = jwt_decode(response.token); 
        setUser(decodedUser.user); // Set the user in context

        // Redirect to dashboard or wherever
        window.location.href = '/dashboard';
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error("Login failed:", error);
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
        autoComplete="username"  // Added autocomplete for better UX
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"  // Corrected autocomplete for password
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;


