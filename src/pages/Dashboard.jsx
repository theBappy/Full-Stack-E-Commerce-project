import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome, {user?.name || 'User'}</h1>
      <p>This is your dashboard where you can view your activities and updates.</p>
    </div>
  );
};

export default Dashboard;
