import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import { motion } from 'framer-motion';

const OwnersList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOwners = async () => {
      setError('');
      setLoading(true);
      try {
        const res = await api.get('/owners'); // Adjust baseURL in axios if needed
        if (res.status === 200 && Array.isArray(res.data.owners)) {
          setOwners(res.data.owners);
        } else if (Array.isArray(res.data)) {
          setOwners(res.data);
        } else {
          setError(res?.data?.message || 'Failed to fetch owners.');
          setOwners([]);
        }
      } catch (error) {
        setError(error.userMessage || 'Failed to fetch owners.');
        setOwners([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOwners();
  }, []);

  return (
    <div className="w-full h-full">
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50/80 backdrop-blur-sm text-red-500 text-center p-4 rounded-xl font-medium mb-6 border border-red-100/50"
        >
          {error}
        </motion.div>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-blue-600 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="font-medium">Loading owners...</span>
          </div>
        </div>
      ) : owners.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-blue-100/50 shadow-lg">
            <svg className="w-16 h-16 text-blue-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-gray-500 text-lg font-medium">No owners registered yet</p>
            <p className="text-gray-400 text-sm mt-2">Check back later for updates</p>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {owners.map((owner) => (
            <motion.div
              key={owner.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                    {owner.name}
                  </h2>
                  <span className="px-3 py-1 bg-blue-50/80 backdrop-blur-sm text-blue-600 text-sm font-semibold rounded-full">
                    Active
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50/80">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600">{owner.location}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50/80">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <p className="text-gray-600">+91 {owner.contact}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50/80">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                    <p className="text-gray-600">{owner.measurment}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50/80">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-600">{owner.face}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-blue-50">
                    <p className="text-xl font-bold text-blue-600">₹{owner.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnersList;