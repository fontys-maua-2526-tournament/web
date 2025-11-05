import CustomTextField from '../components/customTextField';
import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function Login() {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  }

  const handleEnterWithoutLogin = () => {
    alert('entrando sem login...')
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

            <h2 className="text-2xl font-bold mb-6"> Welcome back!</h2>

            <form onSubmit={handleLogin} className="space-y-3">

              <CustomTextField
                id="user"
                name="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="User"
                className="w-full"
              />

              <CustomTextField
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full"
              />
              
              <Link
                to="/tournaments"
                className="font-bold text-sm underline text-indigo-200 cursor-pointer hover:text-white"
              >
                Enter without login
              </Link>

              <button
                type="submit"
                className="border-2 border-white rounded-2xl py-3 mt-2 hover:bg-white hover:text-mauaBlue font-semibold transition-all duration-200 w-full hover:cursor-pointer"
              >
                  Login
              </button>

            </form>
        </div>

      </div>
    </div>
  );
}