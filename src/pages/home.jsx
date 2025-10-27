import Navbar from '../components/navbar';
import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import CustomModal from '../components/customModal';
import { useState } from 'react';

export default function Home() {
  const [textExample, setTextExample] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center">
      <Navbar />
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-black duration-300 hover:-translate-y-1.5 hover:scale-110 hover:cursor-pointer">
          This is the home screen with Tailwind CSS!
        </h1>
        <CustomTextField
          id="example"
          name="example"
          label="Example Input blocked"
          value="this one is blocked"
          onChange={() => {}}
          blocked={true}
          placeholder="Type something..."
          className="max-w-md"
          showCopy
        />
        <CustomTextField
          id="example2"
          name="example2"
          label="Example editable with copy"
          value={textExample}
          onChange={e => setTextExample(e.target.value)}
          placeholder="Type something..."
          className="max-w-md"
          showCopy
        />
        <CustomTextField
          id="example3"
          name="example3"
          label="Example wrongly looks unblocked"
          value="this one is blocked but looks unblocked"
          onChange={() => {}}
          placeholder="Type something..."
          className="max-w-md"
        />
        <CustomButton onClick={() => setModalOpen(true)} children="Click Me" />
      </div>
      <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="My Modal">
        <p>This is the content of the modal!</p>
      </CustomModal>
    </div>
  );
}
