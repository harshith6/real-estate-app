import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { motion } from 'framer-motion';

const AddOwner = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [form, setForm] = useState({
        name: '',
        location: '',
        price: '',
        measurment: '',
        contact: '',
        face: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user || !user.id) {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
    if (e.target.type === 'file') {
        setForm({ ...form, face: e.target.files[0] });
    } else {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (!form.name || !form.location || !form.price) {
            setError('Name, location, and price are required.');
            setLoading(false);
            return;
        }
        const data = new FormData();
        data.append('name', form.name);
        data.append('location', form.location);
        data.append('price', form.price);
        data.append('measurment', form.measurment);
        data.append('contact', form.contact);
        data.append('face', form.face);

        try {
            const res = await api.post('/owners', data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 200 && res.data && res.data) {
                setMessage('Owner added successfully!');
                setForm({
                    name: '',
                    location: '',
                    price: '',
                    measurment: '',
                    contact: '',
                    face: ''
                });
                setError('');
                setLoading(false);
            } else {
                setError(res?.data?.message || 'Failed to add owner.');
            }
        } catch (error) {
            setError(error.userMessage || 'Failed to add owner.');
        } finally {
            setLoading(false);
        }
   
    };

  return (
    <div className="min-h-screen w-full py-6 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg border border-blue-100/50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/30 rounded-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-50">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Add New Owner
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-700 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 backdrop-blur-sm transition-all group-hover:border-blue-200"
                  placeholder=" "
                />
                <label className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white">
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-700 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 backdrop-blur-sm transition-all group-hover:border-blue-200"
                  placeholder=" "
                />
                <label className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white">
                  Contact Number
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-700 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 backdrop-blur-sm transition-all group-hover:border-blue-200"
                  placeholder=" "
                />
                <label className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white">
                  Location
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="measurment"
                  value={form.measurment}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-700 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 backdrop-blur-sm transition-all group-hover:border-blue-200"
                  placeholder=" "
                />
                <label className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white">
                  Property Size
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="face"
                  value={form.face}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-700 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 backdrop-blur-sm transition-all group-hover:border-blue-200"
                  placeholder=" "
                />
                <label className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white">
                  Property Face
                </label>
              </div>

              <div className="relative group">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-700 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/50 backdrop-blur-sm transition-all group-hover:border-blue-200"
                  placeholder=" "
                />
                <label className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white">
                  Price
                </label>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50/80 backdrop-blur-sm text-red-500 rounded-xl text-center font-medium border border-red-100/50"
              >
                {error}
              </motion.div>
            )}

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50/80 backdrop-blur-sm text-green-500 rounded-xl text-center font-medium border border-green-100/50"
              >
                {message}
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full py-3 px-6 text-white font-semibold rounded-xl shadow-lg ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
              } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Adding Owner...</span>
                </div>
              ) : (
                'Add Owner'
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddOwner;