import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


function AddUserToTeam({ teamId, inviteCode, onClose }) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);

  const handleSubmit = async () => {
    if (!userId) {
      toast.error('User ID is required');
      return;
    }

    setLoading(true);
    try {
      // Ensure the user exists in the backend list we fetched
      const selectedUser = availableUsers.find(u => u.id === parseInt(userId));
      if (!selectedUser) {
        toast.error('User not found');
        return;
      }

      const addRes = await fetch(`http://localhost:8080/teams/${teamId}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: parseInt(userId) }),
      });

      if (!addRes.ok) {
        const errText = await addRes.text();
        throw new Error(errText || 'Failed to add user to team');
      }

      const result = await addRes.json();
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

  // Fetch users from the backend on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setUsersLoading(true);
      setUsersError(null);
      try {
        const res = await fetch('http://localhost:8080/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();

        setAvailableUsers(Array.isArray(data) ? data : data.users || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setUsersError(err.message || 'Error fetching users');
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
            {usersLoading && <div className="text-sm text-gray-600">Loading users...</div>}
            {usersError && (
              <div className="text-sm text-red-600">Error loading users: {usersError}</div>
            )}
            {!usersLoading && !usersError && availableUsers.length === 0 && (
              <div className="text-sm text-gray-600">No users found</div>
            )}
            {!usersLoading &&
              !usersError &&
              availableUsers.map(user => (
                <div
                  key={user.id}
                  className="cursor-pointer rounded p-1 text-sm text-gray-600 hover:bg-gray-200"
                  onClick={() => setUserId(String(user.id))}
                  title={`Click to fill user ID ${user.id}`}
                >
                  ID: {user.id} - {user.firstName} {user.lastName} ({user.email})
                </div>
              ))}
          </div>
        </div>
        <CustomButton className={'w-full'} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Adding...' : 'Add User to Team'}
        </CustomButton>
      </div>
    </div>
  );
}

export default AddUserToTeam;
