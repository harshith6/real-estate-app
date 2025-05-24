import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import { useContext } from 'react';
import { UserContext } from './UserContext'; // Adjust the import path as necessary

const AddProperty = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    userId: user.id || '', // Assuming user.id is available

  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('location', formData.location);
    images.forEach((file) => {
      data.append('images', file);
    });
    data.append('userId', formData.userId);

    try {
      await api.post('/property', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Property added successfully!');
      setFormData({
        title: '',
        description: '',
        price: '',
        location: '',
        userId: user.id || '', // Reset to current user ID
      });
    } catch (error) {
      console.error('Failed to create property', error);
       setMessage('Failed tocreate property');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      {message && <p className="text-center mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;