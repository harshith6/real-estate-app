import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    const data = new FormData();
    data.append('username', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (formData.image) data.append('image', formData.image);

    try {
      const res = await api.post('/user', data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', res);
      // Only proceed if response is 200 and has user data
      if (res.status === 200 && res.data) {
        setUser({
          id: res.data.id,
          email: res.data.email,
          name: res.data.username,
        });
        setError('');
        navigate('/dashboard');
      } else {
        setError(res?.data?.message || 'Registration failed: Unexpected response');
      }
    } catch (err) {
      // Handle all error cases and show server error message if available
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Registration failed: Unknown error');
      }
      setLoading(false); // Ensure loading is reset on error
      console.error(err);
    }
  };

  return (    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 relative overflow-hidden">
      
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white relative animate-fade-in-up mx-4" id='Register'>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Create Account</h2>
        {error && <p className="text-red-500 text-center mb-4 font-semibold bg-red-50 p-3 rounded-lg">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          <div className="group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              onChange={handleChange}
              required
            />
          </div>
          <div className="group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              onChange={handleChange}
              required
            />
          </div>
          <div className="group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="space-y-2">
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
              className="w-full p-3 border border-blue-200 rounded-lg bg-white/50 backdrop-blur-sm text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-300"
              onChange={handleChange}
              accept="image/*"
            />
          </div> */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white p-3 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] transform transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <button
            type="button"
            className="w-full bg-white text-blue-600 p-3 rounded-lg font-bold border-2 border-blue-100 hover:bg-blue-50 hover:shadow-lg transform transition-all duration-300"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;