import React, { useState } from 'react';  // Removed useContext
import { registerUser } from '../services/AuthService'; // The service to make the API request for registration

const Register = () => {
  const [name, setName] = useState('');  // State for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pass the user data (name, email, password) to the backend API for registration
      const userData = { name, email, password };  // User data
      const response = await registerUser(userData); // Call the register API

      // If registration is successful, redirect to the login page
      if (response && response.message === "User registered successfully") {
        window.location.href = '/login';  // Redirect to the login page
      } else {
        setError('Registration failed. Please try again.');  // Handle error message
      }
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again.');  // Error during the registration process
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Username Input */}
      <input
        type="text"
        placeholder="Your name here"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete="name"  // Corrected autoComplete
      />

      {/* Email Input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="username"  // Email should have username autocomplete
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"  // Corrected autoComplete
      />

      {/* Submit Button */}
      <button type="submit">Register</button>

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Register;

