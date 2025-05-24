// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile'; // Adjust the import path as necessary
import { UserContext } from './UserContext'; // Adjust the import path as necessary
import { useContext } from 'react'; // Adjust the import path as necessary
import Tabs from './Tabs'; // Adjust the import path as necessary

const Dashboard = () => {
  
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); // Clear user context
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-10 p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome! <span>{user.name}</span></h1>
      
      {/* Sticky controls */}
      <div className="sticky top-0 z-10 bg-white flex justify-between items-center mb-4 py-2 px-2 shadow">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {showProfile ? 'Back to Listings' : 'Go to Admin/Profile'}
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded ml-4"
        >
          Logout
        </button>
      </div>

      {showProfile ? (<Profile />) : (<Tabs />)}
    </div>
  );
};

export default Dashboard;
