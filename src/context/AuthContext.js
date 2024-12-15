
import { createContext, useState, useEffect } from 'react';
import { getToken } from '../utils/tokenHelper';
import jwt_decode from 'jwt-decode'; // Don't forget to install jwt-decode

export const AuthContext = createContext(); // Create the context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds
      if (decodedToken.exp < currentTime) {
        console.log('Token expired');
        localStorage.removeItem('token'); // Remove expired token
        setUser(null); // Clear user state
      } else {
        setUser(decodedToken.user); // Set user state with decoded user info
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};