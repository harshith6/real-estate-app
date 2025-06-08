import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropertyList from './PropertyList';
import OwnersList from './OwnersList';
import { UserContext } from './UserContext';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const tabs = [
    { id: 'properties', label: 'Properties', icon: '🏠' },
    { id: 'owners', label: 'Owners', icon: '👥' },
  ];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col"
    >
      <div className="flex justify-center w-full">
    
        <div className="sticky top-0 z-20 w-full bg-white/90 rounded-xl shadow-lg border border-blue-100/50 backdrop-blur-lg border-b mb-3 ">
          <div className="max-w-[2000px] mx-auto px-4 ">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-6 w-full max-w-2xl mx-auto p-2 mt-0"
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-200
                    ${activeTab === tab.id 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-[1.02]' 
                      : 'bg-blue-50/80 text-blue-600 hover:bg-blue-100/80 backdrop-blur-sm hover:scale-[1.02]'}`}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full h-[calc(100vh-250px)] overflow-y-auto px-2">
        <div className="">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {activeTab === 'properties' && <PropertyList />}
              {activeTab === 'owners' && <OwnersList />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;