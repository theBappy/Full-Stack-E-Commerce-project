import { createContext, useState, useEffect } from 'react';
import { getToken } from '../utils/TokenHelper';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (token) => {
    console.log('Setting token in localStorage:', token); 
    localStorage.setItem('token', token);
    const decodedToken = jwt_decode(token);
    console.log("Decoded User from token:", decodedToken.user);
    setUser(decodedToken.user); 
    setLoading(false); // Set loading to false after login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log("Decoded token: ", decodedToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          console.log('Token expired');
          logout();
        } else {
          console.log("Setting user to:", decodedToken.user);
          setUser(decodedToken.user);
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        logout();
      }
    } else {
      setUser(null);
    }
    setLoading(false); // Loading done
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

