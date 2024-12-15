import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Your Profile</h2>
      <p>Update your email, password, and other information here.</p>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;
