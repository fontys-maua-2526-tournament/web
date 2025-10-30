import Navbar from '../components/navbar';
import CustomTextField from '../components/customTextField';
import CustomButton from '../components/customButton';
import { useState } from 'react';

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please, fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // send data to database
    // maybe return to home page?
    // alert(`${formData.name} registered  successfuly!`)
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Navbar />
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-black- text-3xl font-bold duration-300 hover:-translate-y-1.5 hover:scale-110">
          Register an user
        </h1>

        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col items-center gap-6">
          <CustomTextField
            id="name"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full"
          />

          <CustomTextField
            id="email"
            name="email"
            label="E-mail"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full"
          />

          <CustomTextField
            id="phone"
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(11)91234-5678"
            className="w-full"
          />

          <CustomTextField
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter a secure password"
            className="w-full"
          />

          <CustomTextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Repeat your password"
            className="w-full"
          />

          <CustomButton onClick={() => {}} className="mt-4 w-full" children="click me" />
        </form>
      </div>
    </div>
  );
}
