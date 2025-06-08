// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';
import Tabs from './Tabs';
import AdminTabs from './AdminTabs';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAdmin, setShowAdmin] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="min-h-screen w-full flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white border-b border-blue-100 sticky top-0 z-50 px-4 py-2 md:py-3 shadow-sm"
        >          <div className="w-full max-w-[2000px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-600 whitespace-nowrap"
            >
              Welcome, {user?.name}!
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-3 md:gap-4"
            >
              <button
                onClick={() => setShowAdmin(!showAdmin)}
                className="px-4 md:px-6 py-2 md:py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm md:text-base shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {showAdmin ? 'View Listings' : 'Admin Dashboard'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 md:px-6 py-2 md:py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm md:text-base shadow-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Logout
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}          className="flex-grow w-full max-w-[2000px] mx-auto px-2 sm:px-4 py-4 md:py-6"
        >
          <div className="h-full">
            {showAdmin ? <AdminTabs /> : <Tabs />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

