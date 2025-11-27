import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

function TeamJoin() {
  const [athleteId, setAthlete] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = async () => {
    if (!athleteId || !code) {
      toast.error('invite code is required');
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/teams/join`, {
        athleteId,
        inviteCode: code,
      });
      toast.success('Team joined');
      // Optionally, redirect or clear form here
    } catch (error) {
      console.error('Failed to join team:', error);
      toast.error('Failed to join team: ' + (error?.message ?? 'Network Error'));
    }
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex w-full flex-col items-center gap-6 px-8">
        <CustomTextField
          id="teamCode"
          name="teamCode"
          label="Invite Code"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="paste your code..."
          className="w-full"
        />
        <CustomButton className={'w-full'} onClick={handleSubmit} children="Join Team" />
      </div>
    </div>
  );
}

export default TeamJoin;
