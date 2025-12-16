import CustomTextField from '../components/customTextField';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/user-service';
import React, { useState } from 'react';
import { useEffect } from 'react';
import mauaFontyssLogo from '../assets/mauaFontysLogo.png';
import { useUser } from '../app/hooks/use-user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserContext } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

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
      setUserContext(response.token, response.email, response.role);

      // Redirect to tournaments
      navigate('/tournaments');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-h-screen min-h-[94vh] grow-0 items-center justify-center">
      <div className="from-fontyssPurple to-mauaBlue my-auto w-2/5 rounded-2xl bg-linear-to-b p-10 text-center text-white shadow-lg">
        <div className="mb-3 flex-col justify-center">
          <div className="mb-6 flex justify-center">
            <img src={mauaFontyssLogo} alt="Logo" className="h-30 w-auto" />
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
