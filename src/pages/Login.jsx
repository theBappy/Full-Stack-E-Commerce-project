import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for redirection
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/AuthService'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const { login } = useContext(AuthContext); // Use login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response && response.token) {
        login(response.token); // Call login function from context to set user state
        navigate('/dashboard'); // Use navigate instead of window.location.href
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
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;



