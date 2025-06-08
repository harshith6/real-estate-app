import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddProperty from './AddProperty';
import AddOwner from './AddOwner';
import PropertyList from './PropertyList';
import OwnersList from './OwnersList';

const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const tabs = [
    { id: 'properties', label: 'Manage Listings', icon: '🏠' },
    { id: 'owners', label: 'Manage Owners', icon: '👥' },
    { id: 'addProperty', label: 'New Listing', icon: '➕' },
    { id: 'addOwner', label: 'New Owner', icon: '👤' },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className='flex justify-center w-full mb-4'>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full p-2 bg-white/90 rounded-xl shadow-lg border border-blue-100/50"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 overflow-hidden group ${
                activeTab === tab.id 
                ? 'text-white shadow-lg' 
                : 'text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700"
                  layoutId="activeTab"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-[calc(100vh-250px)] overflow-y-auto px-2"
        >
          {activeTab === 'properties' && <PropertyList />}
          {activeTab === 'owners' && <OwnersList />}
          {activeTab === 'addProperty' && <AddProperty />}
          {activeTab === 'addOwner' && <AddOwner />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminTabs;
