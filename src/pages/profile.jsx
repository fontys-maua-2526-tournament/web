import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/customButton';
import { useUser } from '../app/hooks/use-user';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const user = useUser();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        console.log('User data:', user);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const SignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-8">
      <div className="relative w-full rounded-xl bg-gray-100 p-8 shadow-lg">
        {token && (
          <div className="absolute top-6 right-6 z-50">
            <CustomButton onClick={SignOut}>Sign-out</CustomButton>
          </div>
        )}
        <h1 className="mb-6 text-start text-3xl font-bold">Profile</h1>
        <div className="mb-4">
          <div className="mb-2 text-lg">
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div className="mb-2 text-lg">
            <span className="font-semibold">Role:</span> {user.role}
          </div>
        </div>
      </div>
    </div>
  );
}
