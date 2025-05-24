import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        navigate('/dashboard'); // Redirect to dashboard if already logged in
      }
    }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });

    //   Save token in localStorage
      localStorage.setItem('token', res.data.token);

      setUser({
        id: res.data.user.id,
        email: res.data.user.email,
        name: res.data.user.username,
      });

    //   Redirect to dashboard or property list
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 flex flex-col shadow rounded-lg" id='Login'>
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
      </div>
    </div>
  );
};

export default Login;