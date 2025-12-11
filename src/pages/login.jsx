import CustomTextField from '../components/customTextField';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/user-service';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CustomButton from '../components/customButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async e => {
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
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="from-fontyssPurple to-mauaBlue w-400px rounded-2xl bg-linear-to-b p-10 text-center text-white shadow-lg">
        <div className="mb-3 flex-col justify-center">
          <div className="mb-6 flex justify-center">
            <img src="" alt="Logo" />
          </div>

          <h2 className="mb-6 text-2xl font-bold">Welcome back!</h2>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500 p-3 text-sm text-white">{error}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-3">
            <CustomTextField
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full"
              disabled={loading}
            />

            <CustomTextField
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full"
              disabled={loading}
            />

            <div className="flex items-center justify-between gap-2 text-sm">
              <Link
                to="/tournaments"
                className="cursor-pointer font-bold text-indigo-200 underline hover:text-white"
              >
                Enter without login
              </Link>
              <Link
                to="/user/register"
                className="cursor-pointer font-bold text-indigo-200 underline hover:text-white"
              >
                Register
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="hover:text-mauaBlue mt-2 w-full rounded-2xl border-2 border-white py-3 font-semibold transition-all duration-200 hover:cursor-pointer hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
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
