import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ email, password });
      if (response.success) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        /><br/><br/>
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        /><br/><br/>
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
