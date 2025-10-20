import Navbar from '../components/navbar';
import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import CustomDateTimePicker from '../components/customDateTimePicker';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  return (
    <div className="flex h-screen items-center justify-center">
      <Navbar />

      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-black duration-300 hover:-translate-y-1.5 hover:scale-110 hover:cursor-pointer">
          This is the screen to create a Tournament!
        </h1>

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
            value={startDateTime}
            onChange={e => setStartDateTime(e.target.value)}
            placeholder="Select date and time..."
            className="max-w-md"
            showCopy
        />

        <CustomDateTimePicker
            id="endDate"
            name="endDate"
            label="End Date"
            value={endDateTime}
            onChange={e => setEndDateTime(e.target.value)}
            placeholder="Select date and time..."
            className="max-w-md"
            showCopy
        />
        <CustomButton onClick={() => alert('Button clicked!')} children="Save" />
      </div>
    </div>
  );
}
