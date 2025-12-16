import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import CustomDateTimePicker from '../components/customDateTimePicker';
import { useState } from 'react';
import { registerWithDetails } from '../services/user-service';
import { addUserToTeam, addUserToTeamByInvite } from '../services/team-service';
import { toast } from 'react-toastify';

function AddUserToTeam({ teamId, inviteCode, onClose }) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('existing'); // 'existing' | 'create'

  // create fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [userRole, setUserRole] = useState('ATHLETE');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === 'existing') {
        if (!userId) {
          toast.error('User ID is required');
          setLoading(false);
          return;
        }
        // Prefer invite-based add if inviteCode provided
        if (inviteCode) {
          await addUserToTeamByInvite(parseInt(userId), inviteCode);
        } else {
          await addUserToTeam(teamId, parseInt(userId));
        }

        toast.success(`User added to team successfully`);
        setUserId('');
        onClose();
      } else {
        // create new user flow
        if (!firstName || !email || !phoneNumber || !dateOfBirth) {
          toast.error('Please fill in all required fields');
          setLoading(false);
          return;
        }

        const payload = {
          firstName,
          lastName,
          email,
          password: 'password123@',
          phoneNumber,
          dateOfBirth,
          userRole,
        };

        const created = await registerWithDetails(payload);
        // assume created contains the new user object with id
        const newUserId = created?.id || created?.userId || created?.data?.id;
        if (!newUserId) {
          console.error('Unexpected create user response', created);
          toast.error('User created but could not determine id');
          setLoading(false);
          return;
        }

        // add to team using invite if provided, otherwise by teamId
        if (inviteCode) {
          await addUserToTeamByInvite(newUserId, inviteCode);
        } else {
          await addUserToTeam(teamId, newUserId);
        }

        toast.success(`User ${firstName} ${lastName} created and added to team`);
        // reset fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setDateOfBirth('');
        setUserRole('ATHLETE');
        onClose();
      }
    } catch (error) {
      console.error('Failed to add/create user to team:', error);
      toast.error(error?.message || 'Failed to add/create user to team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex w-full flex-col gap-6 px-8">
        <div className="flex gap-3">
          <button
            onClick={() => setMode('existing')}
            className={`rounded px-3 py-1 ${mode === 'existing' ? 'bg-fontyssPurple text-white' : 'bg-gray-200'}`}
          >
            Add Existing User
          </button>
          <button
            onClick={() => setMode('create')}
            className={`rounded px-3 py-1 ${mode === 'create' ? 'bg-fontyssPurple text-white' : 'bg-gray-200'}`}
          >
            Create And Add User
          </button>
        </div>

        {mode === 'existing' ? (
          <>
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
                {/* {usersLoading && <div className="text-sm text-gray-600">Loading users...</div>}
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
                  ))} */}
              </div>
            </div>
            <CustomButton className={'w-full'} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Adding...' : 'Add User to Team'}
            </CustomButton>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <CustomTextField
                id="firstName"
                name="firstName"
                label="First Name*"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full"
              />
              <CustomTextField
                id="lastName"
                name="lastName"
                label="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full"
              />
              <CustomTextField
                id="email"
                name="email"
                label="Email*"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full"
              />
              <CustomTextField
                id="phone"
                name="phone"
                label="Phone*"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className="w-full"
              />
              <CustomDateTimePicker
                id="dob"
                name="dob"
                label="Date of Birth"
                value={dateOfBirth}
                onChange={value => setDateOfBirth(value)}
                placeholder="Your date of birth"
                className="max-w-md"
                showCopy
              />
              <div>
                <label className="mb-1 block text-sm font-medium">Role*</label>
                <select
                  value={userRole}
                  onChange={e => setUserRole(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2"
                >
                  <option value="ATHLETE">Athlete</option>
                  <option value="COACH">Coach</option>
                </select>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Password will be set to <strong>password123@</strong> by default.
            </p>
            <CustomButton className={'w-full'} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Creating and Adding...' : 'Create Account & Add to Team'}
            </CustomButton>
          </>
        )}
      </div>
    </div>
  );
}

export default AddUserToTeam;
