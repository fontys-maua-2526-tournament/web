import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const TeamCreate = () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  const createTeam = async () => {
    setLoading(true);
    const options = {
      method: 'POST',
      url: `http://localhost:8080/teams/create`,
      data: {
        name: name,
        inviteCode: code,
      },
    };

    try {
        const { data } = await axios.request(options);
        navigate('/teams/view');
    } catch (error) {
        console.error('Failed to create team:', error);
    } finally {
        setLoading(false);
    }
  };

  const generateGUID = async () => {
    const newGuid = uuid();
    setCode(newGuid);
  };

  return (
    <div className="ml-20 flex flex-1 flex-col p-8">
      <h1 className="text-4xl font-bold text-gray-900">Add a new Team</h1>
      <div>
        <form
          onSubmit={() => {
            createTeam();
          }}
        >
          <CustomTextField
            id="teamName"
            name="nameofTeam"
            label="What's the name of the Team?"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Type something..."
            className="max-w-md"
          />
          <div className="">
            <CustomTextField
              id="teamCode"
              name="codeofTeam"
              label="Invite people to the Team"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="generate your code..."
              className="max-w-md"
              showCopy
              disabled={true}
            />
            <CustomButton
              className=""
              onClick={() => {
                generateGUID();
              }}
              children={'Generate invite code.'}
            />
          </div>
          <CustomButton
            className=""
            type="Submit"
            onClick={() => {
              createTeam();
            }}
            children={'Create Team.'}
          />
        </form>
      </div>
    </div>
  );
};

export default TeamCreate;
