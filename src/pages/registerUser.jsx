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
    dob: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.dob) {
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
    // <div className="flex h-screen items-center justify-center">
    <div className='flex flex-col'>
      <div className="flex flex-col items-center gap-8 mt-6">
        <h1 className="text-black text-4xl font-bold duration-300 hover:-translate-y-1.5 hover:scale-101 mb-8">
          Register an user
        </h1>

        <form 
          onSubmit={handleSubmit} 
          className=""
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-sm md:w-xl lg:w-3xl">
            <div className="">
              <CustomTextField
                id="name"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="mb-5"
              />

              <CustomTextField
                id="email"
                name="email"
                label="E-mail"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mb-5"
              />

              <CustomTextField
                id="phone"
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(11)91234-5678"
                className="mb-5"
              />
            </div>

            <div >

              <CustomTextField
                id="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter a secure password"
                className="mb-5"
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
              />

              <CustomTextField
                id="dob"
                name="dob"
                label="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
                type="date"
                placeholder="Your date of birth"
                className="mb-5"
              />
            </div>
          </div>

          <CustomButton onClick={() => {}} className="block mx-auto mt-5 md:mt-10 " children="Register" />

        </form>
      </div>
    </div>
  );
}
