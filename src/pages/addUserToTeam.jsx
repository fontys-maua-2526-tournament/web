import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import { useState } from 'react';
import { toast } from 'react-toastify';

// Mock users disponíveis para adicionar ao time
const mockAvailableUsers = [
  { id: 7, firstName: 'Rafael', lastName: 'Gomes', email: 'rafael@example.com' },
  { id: 8, firstName: 'Fernanda', lastName: 'Lima', email: 'fernanda@example.com' },
  { id: 9, firstName: 'Bruno', lastName: 'Rocha', email: 'bruno@example.com' },
  { id: 10, firstName: 'Juliana', lastName: 'Dias', email: 'juliana@example.com' },
];

function AddUserToTeam({ teamId, inviteCode, onClose }) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userId) {
      toast.error('User ID is required');
      return;
    }

    setLoading(true);
    try {
      // Mock: Simular delay de requisição
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const selectedUser = mockAvailableUsers.find(u => u.id === parseInt(userId));
      if (!selectedUser) {
        toast.error('User not found');
        return;
      }
      
      toast.success(`User ${selectedUser.firstName} added to team successfully`);
      setUserId('');
      onClose();
    } catch (error) {
      console.error('Failed to add user to team:', error);
      toast.error('Failed to add user to team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex w-full flex-col items-center gap-6 px-8">
        <CustomTextField
          id="userId"
          name="userId"
          label="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="Enter user ID..."
          className="w-full"
          type="number"
        />
        <p className="text-sm text-gray-600">
          Invite Code: <span className="font-semibold text-gray-900">{inviteCode}</span>
        </p>
        <div className="w-full rounded-lg bg-gray-100 p-4">
          <p className="mb-2 text-sm font-semibold text-gray-700">Available Users:</p>
          <div className="space-y-2">
            {mockAvailableUsers.map(user => (
              <div key={user.id} className="text-sm text-gray-600">
                ID: {user.id} - {user.firstName} {user.lastName} ({user.email})
              </div>
            ))}
          </div>
        </div>
        <CustomButton 
          className={'w-full'} 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add User to Team'}
        </CustomButton>
      </div>
    </div>
  );
}

export default AddUserToTeam;
