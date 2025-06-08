import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const Login = () => {
  const { user,setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user ) {
      navigate('/login');
    } else {
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!email || !password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }
    try {
      const res = await api.post('/user/login', { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

    //   Save token in localStorage
      setUser({
        id: res.data.id,
        email: res.data.email,
        name: res.data.username,
      });

    //   Redirect to dashboard or property list
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      // Improved error handling for 401 and other cases
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else if (err.response.data && typeof err.response.data === 'string') {
          setError(err.response.data);
        } else {
          setError('Login failed: ' + (err.response.statusText || 'Unknown error'));
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Login failed: Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 relative overflow-hidden">
      
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white relative animate-fade-in-up" id='Login'>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Welcome Back</h2>
        {error && <p className="text-red-500 text-center mb-4 font-semibold bg-red-50 p-3 rounded-lg">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="group">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white p-3 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] transform transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
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

export default Login;