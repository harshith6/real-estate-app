import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('image', formData.image);

    try {
      const res = await api.post('/auth/register', data);
      localStorage.setItem('token', res.data.token);
      // navigate('/dashboard'); // or '/login'
      alert('Registration successful!');
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-lg" id='Register'>
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <div className="space-y-2">
          <label 
            htmlFor="profile-picture" 
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <input
            id="profile-picture"
            type="file"
            name="image"
            className="w-full p-2 border rounded text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;