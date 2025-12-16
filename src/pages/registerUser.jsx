import CustomTextField from '../components/customTextField';
import CustomButton from '../components/customButton';
import CustomDateTimePicker from '../components/customDateTimePicker';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerWithDetails } from '../services/user-service';

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dob: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('Please fill in all required fields.');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      await registerWithDetails({
        firstName: formData.name,
        lastName: '',
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
        dateOfBirth: formData.dob,
        userRole: 'ATHLETE',
      });

      // Success - redirect to login
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mt-6 flex flex-col items-center gap-8">
        <h1 className="mb-8 text-4xl font-bold text-black duration-300 hover:-translate-y-1.5 hover:scale-101">
          Register an user
        </h1>

        {error && <div className="mb-4 max-w-md rounded-lg bg-red-500 p-4 text-white">{error}</div>}

        <form onSubmit={handleSubmit} className="">
          <div className="grid w-sm grid-cols-1 gap-6 md:w-xl md:grid-cols-2 lg:w-3xl">
            <div className="">
              <CustomTextField
                id="name"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="mb-5"
                disabled={loading}
              />

              <CustomTextField
                id="email"
                name="email"
                label="E-mail"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mb-5"
                disabled={loading}
              />

              <CustomTextField
                id="phone"
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(11)91234-5678"
                className="mb-5"
                disabled={loading}
              />
            </div>

            <div>
              <CustomTextField
                id="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter a secure password"
                className="mb-5"
                disabled={loading}
              />

              <CustomTextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="Repeat your password"
                className="mb-5"
                disabled={loading}
              />

              <CustomDateTimePicker
                id="dob"
                name="dob"
                label="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Your date of birth"
                className="max-w-md"
                showCopy
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 md:mt-10">
            <CustomButton
              onClick={handleSubmit}
              className="rounded-2xl bg-blue-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Register
            </CustomButton>
          </div>
          <div className="mt-5 flex items-center justify-center md:mt-10">
            <Link
              to="/login"
              className="text-mauaBlue hover:text-fontyssPurple font-semibold underline"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
