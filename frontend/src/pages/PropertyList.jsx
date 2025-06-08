import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { motion } from 'framer-motion';
import CloudinaryService from '../services/CloudinaryService';
import ImageCarousel from '../components/ImageCarousel';

const PropertyList = () => {
    const cloudinaryService = new CloudinaryService();
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({ location: '', minPrice: '', maxPrice: '' });
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageLoadErrors, setImageLoadErrors] = useState({});

    useEffect(() => {
        if (!user || !user.id) {
          navigate('/login');
        } else {
          fetchProperties();
        }
      }, [filters]);

    const fetchProperties = async () => {
        setError('');
        setLoading(true);
        try {
            const response = await api.get('/properties');
            if (response.status === 200 && Array.isArray(response.data.properties)) {
                setProperties(filterProperties(response.data.properties, filters));
            } else if (Array.isArray(response.data)) {
                setProperties(filterProperties(response.data, filters));
            } else {
                setError(response?.data?.message || 'Failed to fetch properties.');
                setProperties([]);
            }
        } catch (error) {
            setError(error.userMessage || 'Failed to fetch properties.');
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    // Support function to filter properties array on the client side
    const filterProperties = (allProperties, filters) => {
        return allProperties.filter(property => {
            let matchesLocation = true;
            if (filters.location && filters.location.length >= 2) {
                matchesLocation = property.location && property.location.toLowerCase().includes(filters.location.toLowerCase());
            }
            let matchesMinPrice = true;
            let matchesMaxPrice = true;
            if (filters.minPrice && filters.minPrice !== '') {
                matchesMinPrice = property.price >= Number(filters.minPrice);
            }
            if (filters.maxPrice && filters.maxPrice !== '') {
                matchesMaxPrice = property.price <= Number(filters.maxPrice);
            }
            // Return true if any filter matches
            return matchesLocation && matchesMinPrice && matchesMaxPrice;
        });
    };

    const handleFilterChange = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="w-full flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-blue-100/50 mb-6"
          >
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter Properties
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative group">
                  <input
                    type="text"
                    name="location"
                    placeholder="Search by location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full p-3 pl-10 text-sm sm:text-base border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 placeholder-gray-400 backdrop-blur-sm transition-all group-hover:border-blue-200"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div className="relative group">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="w-full p-3 pl-10 text-sm sm:text-base border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 placeholder-gray-400 backdrop-blur-sm transition-all group-hover:border-blue-200"
                  />
                  <span className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors">₹</span>
                </div>
                <div className="relative group">
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-full p-3 pl-10 text-sm sm:text-base border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 placeholder-gray-400 backdrop-blur-sm transition-all group-hover:border-blue-200"
                  />
                  <span className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors">₹</span>
                </div>
              </div>
            </div>
          </motion.div>

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
                <span className="font-medium">Loading properties...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6 pb-8">
              {Array.isArray(properties) && properties.length > 0 ? (
                properties.map((property) => ( 
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
                  >
                    <div className="relative bg-gray-100 h-48 sm:h-56 overflow-hidden group">
                      <ImageCarousel 
                        images={Array.isArray(property.images) ? property.images : []} 
                        title={property.title || 'Property'} 
                      />
                      {/* Remove dark overlay, add zoom/brighten effect on hover */}
                      <div className="absolute inset-0 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 z-10 pointer-events-none" />
                    </div>
                    
                    <div className="flex-1 p-5 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-2 line-clamp-1 hover:line-clamp-none cursor-pointer">
                        {property.title}
                      </h2>
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-600 text-sm sm:text-base">{property.location}</p>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-3">₹{property.price.toLocaleString('en-IN')}</p>
                      <p className="text-gray-600 text-sm line-clamp-2 hover:line-clamp-none transition-all duration-300 cursor-pointer">
                        {property.description}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-blue-100/50 shadow-lg">
                    <svg className="w-16 h-16 text-blue-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <p className="text-gray-500 text-lg font-medium">No properties found</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or check back later</p>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
    );
}


export default PropertyList;