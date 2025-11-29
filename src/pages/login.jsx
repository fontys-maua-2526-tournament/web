import CustomTextField from '../components/customTextField';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { login } from '../services/user-service';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      const response = await login(email, password);
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('userName', response.name);
      
      // Redirect to tournaments
      navigate('/tournaments');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-linear-to-b from-fontyssPurple to-mauaBlue p-10 rounded-2xl w-400px text-center text-white shadow-lg">
        <div className="flex-col justify-center mb-3">
            <div className="flex justify-center mb-6">
              <img 
                src=""
                alt="Logo" 
              />
            </div>

            <h2 className="text-2xl font-bold mb-6">Welcome back!</h2>

            {error && (
              <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3">

              <CustomTextField
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="w-full"
                disabled={loading}
              />

              <CustomTextField
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="w-full"
                disabled={loading}
              />
              
              <div className="flex gap-2 justify-between items-center text-sm">
                <Link
                  to="/tournaments"
                  className="font-bold underline text-indigo-200 cursor-pointer hover:text-white"
                >
                  Enter without login
                </Link>
                <Link
                  to="/user/register"
                  className="font-bold underline text-indigo-200 cursor-pointer hover:text-white"
                >
                  Register
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="border-2 border-white rounded-2xl py-3 mt-2 hover:bg-white hover:text-mauaBlue font-semibold transition-all duration-200 w-full hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onSubmit={handleLogin}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

            </form>
        </div>

      </div>
    </div>
  );
}