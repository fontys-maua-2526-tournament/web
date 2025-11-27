import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

function TeamCreate({ onClose, team }) {
  const [name, setName] = useState(team?.name || '');
  const [code, setCode] = useState(team?.inviteCode || '');

  const handleSubmit = async () => {
    if (!name || !code) {
      toast.error('Name and invite code are required');
      return;
    }
    try {
      if (team) {
        await axios.put(`${import.meta.env.VITE_API_URL}/teams/${team.id}`, {
          name,
          inviteCode: code,
        });
        toast.success('Team updated');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/teams/create`, {
          name,
          inviteCode: code,
        });
        toast.success('Team created');
      }
    } catch (error) {
      console.error('Failed to create team:', error);
      toast.error('Failed to create team: ' + (error?.message ?? 'Network Error'));
    } finally {
      onClose();
    }
  };

  const generateGUID = () => {
    setCode(uuid());
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex w-full flex-col items-center gap-6 px-8">
        <CustomTextField
          id="teamName"
          name="teamName"
          label="Team Name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type something..."
          className="w-full"
          showCopy
        />
        <CustomTextField
          id="teamCode"
          name="teamCode"
          label="Invite Code"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Generate your code..."
          className="w-full"
          showCopy
          readOnly
        />
        <CustomButton className={'w-full'} onClick={generateGUID} children="Generate" />
        <CustomButton
          className={'w-full'}
          onClick={handleSubmit}
          children={team ? 'Update Team' : 'Create Team'}
        />
      </div>
    </div>
  );
}

export default TeamCreate;
