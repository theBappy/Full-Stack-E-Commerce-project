import { createContext, useState, useEffect } from 'react';
import { getToken } from '../utils/TokenHelper'; // Keep using tokenHelper
import jwt_decode from 'jwt-decode'; // Don't forget to install jwt-decode

export const AuthContext = createContext(); // Create the context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state when checking for tokens

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = getToken(); // Use token helper to get token
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Get current time in seconds
        if (decodedToken.exp < currentTime) {
          console.log('Token expired');
          localStorage.removeItem('token'); // Remove expired token
          setUser(null); // Clear user state
        } else {
          setUser(decodedToken.user); // Set user state with decoded user info
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        logout(); // If token is invalid, force logout
      }
    } else {
      setUser(null); // No token, set user to null
    }
    setLoading(false); // Loading done after token check
  }, []); // Empty array ensures this runs only once on mount

  // Ensure `loading` is handled properly in your components (see the example below).
  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
