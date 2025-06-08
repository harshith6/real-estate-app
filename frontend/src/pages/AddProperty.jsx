import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import CloudinaryService from '../services/CloudinaryService';
import { AdvancedImage } from '@cloudinary/react';
import api from '../api';

const cloudinaryService = new CloudinaryService();

const AddProperty = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: [],
  });
  
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Check if adding new images would exceed the 4 image limit
    if (previewImages.length + files.length > 4) {
      setError('Maximum 4 images allowed per property');
      return;
    }
    
    // Create preview URLs for new images
    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    // Add new previews to existing ones
    setPreviewImages(prev => [...prev, ...previews]);
    setError(''); // Clear any previous errors
  };

  const removeImage = (index) => {
    setError(''); // Clear any errors when removing images
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageDisplay = (publicId) => {
    return cloudinaryService.createImageThumbnail(publicId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsUploading(true);
    
    try {
      // Upload images first
      const imageUrls = [];
      for (const [index, image] of previewImages.entries()) {
        setUploadProgress(Math.round((index * 100) / previewImages.length));
        
        const result = await cloudinaryService.uploadImage(
          image.file,
          (progress) => {
            setUploadProgress(Math.round((index * 100 + progress) / previewImages.length));
          }
        );
        imageUrls.push(result.url);
      }
      
      // Create property with uploaded image URLs
      const propertyData = {
        ...formData,
        images: imageUrls
      };
        // Call your API to save the property
      const response = await api.post('/properties', propertyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status >= 400) {
        throw new Error(response.data?.message || 'Failed to create property');
      }
      
      setMessage('Property added successfully!');
      
      // Clear form after short delay to show success message
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          images: []
        });
        setPreviewImages([]);
        setUploadedImages([]);
        setUploadProgress(0);
        
      }, 1500);
      
    } catch (err) {
      console.error('Error creating property:', err);
      setError(err.message || 'Failed to create property');
    } finally {
      setLoading(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      previewImages.forEach(preview => URL.revokeObjectURL(preview.preview));
    };
  }, [previewImages]);

  return (
    <div className="min-h-screen w-full py-8 px-4 overflow-x-hidden overflow-y-auto">
      {/* Upload Progress Overlay */}
      <AnimatePresence>
        {isUploading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploading Images...</h3>
              <div className="w-full bg-blue-100 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-300 flex items-center justify-center text-xs text-white font-medium"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress}%
                </div>
              </div>
              <p className="text-sm text-gray-600">Please wait while we upload your images. Don't close this window.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white p-8 shadow-lg rounded-3xl mx-auto relative z-10"
      >
        {/* Remove animated backgrounds and replace with simple gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-3xl"></div>
        <div className="relative z-20">
          <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Messages at the top */}
            {(error || message) && (
              <div className="col-span-full">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
                    <p className="text-red-600 text-center font-semibold">{error}</p>
                  </div>
                )}
                {/* {message && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-4">
                    <p className="text-green-600 text-center font-semibold">{message}</p>
                  </div>
                )} */}
              </div>
            )}

            {/* Form Fields */}
            <div className="relative">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full p-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-lg"
                required
              />
              <label
                htmlFor="title"
                className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white"
              >
                Title
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full p-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-lg"
                required
              />
              <label
                htmlFor="location"
                className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white"
              >
                Location
              </label>
            </div>

            <div className="relative">
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full p-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-lg"
                required
              />
              <label
                htmlFor="price"
                className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white"
              >
                Price
              </label>
            </div>

            <div className="relative col-span-full">
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-4 border border-blue-200 rounded-xl bg-white text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUploading}
                />
                <label className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white">
                  Property Images ({previewImages.length}/4)
                </label>
              </div>
              
              {/* Image Preview Grid */}
              {previewImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2 rounded-xl bg-gray-50">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative group bg-white rounded-lg p-2 shadow-sm">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="h-32 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-4 right-4 p-1.5 bg-red-500 text-white rounded-full 
                                 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600
                                 shadow-lg transform hover:scale-105"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative col-span-full">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full p-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-lg min-h-[120px]"
                required
              />
              <label
                htmlFor="description"
                className="absolute left-4 -top-2.5 px-1 text-sm text-blue-600 bg-white"
              >
                Description
              </label>
            </div>

            {/* Error and Message Display */}
            <div className="col-span-full mb-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
                  <p className="text-red-600 text-center font-medium">{error}</p>
                </div>
              )}
              {message && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-600 text-center font-medium">{message}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-span-full">
              <button
                type="submit"
                className={`w-full md:w-1/2 p-4 rounded-xl font-bold text-lg mx-auto block ${
                  loading || isUploading
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors`}
                disabled={loading || isUploading}
              >
                {loading ? 'Adding Property...' : 'Submit Property'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProperty;