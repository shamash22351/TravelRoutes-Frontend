import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Logout successful:', data);
      setUser(null); 
      setIsLoggedOut(true);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  useEffect(() => {
    if (isLoggedOut) {
      navigate('/');
    }
  }, [isLoggedOut, navigate]);

  return <div>Logout</div>;
};

export default Logout;