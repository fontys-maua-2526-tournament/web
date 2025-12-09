import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomButton from '../components/customButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      toast.success('Login successful!');

      navigate('/');
    } catch (err) {
      console.error(err);

      const message = err.response?.data?.message || 'Login failed';
      // either git is bugged or i bugged it
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-lg border p-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-lg border p-3"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <CustomButton
          type="submit"
          disabled={loading}
          className="w-full bg-fontyssPurple py-3 text-white hover:bg-[#874c95]"
        >
          {loading ? 'Logging in...' : 'Login'}
        </CustomButton>

        <p className="mt-4 text-center text-sm">
          No account?{' '}
          <Link to="/register" className="text-purple-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};
