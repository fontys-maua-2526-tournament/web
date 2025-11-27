import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import CustomDateTimePicker from '../components/customDateTimePicker';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function TournamentCreate({ onClose, tournament }) {
  const [name, setName] = useState(tournament?.name || '');
  const [address, setAddress] = useState(tournament?.address || '');
  const [startTime, setStartDateTime] = useState(tournament?.startTime || '');
  const [endTime, setEndDateTime] = useState(tournament?.endTime || '');
  const handleSubmit = async () => {
    if (!name || !address || !startTime || !endTime) {
      toast.error('All fields are required');
      return;
    }
    try {
      tournament
        ? await axios.put(`${import.meta.env.VITE_API_URL}/tournaments/${tournament.id}`, {
            name,
            address,
            startTime,
            endTime,
          })
        : await axios.post(`${import.meta.env.VITE_API_URL}/tournaments`, {
            name,
            address,
            startTime,
            endTime,
          });

      toast.success(
        tournament ? 'Tournament updated successfully!' : 'Tournament created successfully!',
      );
    } catch (error) {
      console.error(error);
      toast.error(tournament ? 'Failed to update tournament.' : 'Failed to create tournament.');
    } finally {
      onClose();
    }
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <CustomTextField
          id="name"
          name="Name"
          label="Tournament Name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type something..."
          className="max-w-md"
          showCopy
        />

        <CustomTextField
          id="address"
          name="Address"
          label="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Type something..."
          className="max-w-md"
          showCopy
        />

        <CustomDateTimePicker
          id="startDate"
          name="startDate"
          label="Start Date"
          value={startTime}
          onChange={e => setStartDateTime(e.target.value)}
          placeholder="Select date and time..."
          className="max-w-md"
          showCopy
        />

        <CustomDateTimePicker
          id="endDate"
          name="endDate"
          label="End Date"
          value={endTime}
          onChange={e => setEndDateTime(e.target.value)}
          placeholder="Select date and time..."
          className="max-w-md"
          showCopy
        />

        <CustomButton onClick={handleSubmit}>
          {tournament ? 'Update Tournament' : 'Create Tournament'}
        </CustomButton>
      </div>
    </div>
  );
}

export default TournamentCreate;
