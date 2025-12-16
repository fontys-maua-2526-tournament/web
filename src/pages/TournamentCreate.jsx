import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import CustomDateTimePicker from '../components/customDateTimePicker';
import { useState } from 'react';
import { createTournament, updateTournament } from '../services/tournament-service';
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
        ? await updateTournament(tournament.id, {
            id: tournament.id,
            name,
            invite: tournament.invite,
            address,
            status: tournament.status,
            startTime,
            endTime,
          })
        : await createTournament({
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
      toast.error(
        error.message ||
          (tournament ? 'Failed to update tournament.' : 'Failed to create tournament.'),
      );
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
