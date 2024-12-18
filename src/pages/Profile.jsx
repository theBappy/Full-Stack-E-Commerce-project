import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/AuthService';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        console.log('📢 Fetched profile data:', data); // Log the full response
        if (data.data) {
          console.log('✅ Profile found:', data.data); // Log if profile is found in the data
          setProfile(data.data); // Set profile if it's inside `data.data`
        } else {
          console.log('⚠️ No "data" key found. Setting entire data as profile.');
          setProfile(data); // Fallback: Set entire data if no `data` key exists
        }
      } catch (error) {
        console.error('❌ Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Your Profile</h2>
      {profile ? (
        <>
          <p>Name: {profile?.name || 'Name not available'}</p> 
          <p>Email: {profile?.email || 'Email not available'}</p> 
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
