import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerWithDetails } from '../services/user-service';
import CustomButton from '../components/customButton';
import { toast } from 'react-toastify';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [userRole, setUserRole] = useState('ATHLETE');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerWithDetails({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        dateOfBirth, // must be in YYYY-MM-DD format
        userRole,
      });

      toast.success('Registration succeeded');
      navigate('/login');
    } catch (err) {
      const message = err.message || 'Registration failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">Register</h1>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <input
          type="text"
          placeholder="First Name"
          className="mb-4 w-full rounded-lg border p-3"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          className="mb-4 w-full rounded-lg border p-3"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />

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
          className="mb-4 w-full rounded-lg border p-3"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="mb-4 w-full rounded-lg border p-3"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          required
        />

        <input
          type="date"
          className="mb-4 w-full rounded-lg border p-3"
          value={dateOfBirth}
          onChange={e => setDateOfBirth(e.target.value)}
          required
        />

        <select
          className="mb-6 w-full rounded-lg border p-3"
          value={userRole}
          onChange={e => setUserRole(e.target.value)}
          required
        >
          <option value="ORGANIZER">Organizer</option>
          <option value="COACH">Coach</option>
          <option value="ATHLETE">Athlete</option>
        </select>

        <CustomButton
          type="submit"
          disabled={loading}
          className="bg-fontyssPurple w-full py-3 text-white hover:bg-[#874c95]"
        >
          {loading ? 'Creating account...' : 'Register'}
        </CustomButton>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
