import { useState } from 'react';
import CustomModal from './customModal';
import CustomButton from './customButton';
import { createMatch, updateMatch } from '../services/match-service';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

/**
 * CreateMatchModal
 * Renders a trigger button that opens a modal with a form to create a match.
 * Props:
 * - tournamentId: number | string (required)
 * - onCreated?: (match: any) => void (optional callback after successful creation)
 * - triggerClassName?: string (optional classes for trigger button)
 * - buttonLabel?: string (optional label for trigger button)
 */
export default function CreateMatchModal({ tournamentId, onCreated, match, onClose }) {
  const [submitting, setSubmitting] = useState(false);

  const [round, setRound] = useState('');
  const [team1Id, setTeam1Id] = useState('');
  const [team2Id, setTeam2Id] = useState('');
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const resetForm = () => {
      setRound(match?.round || '');
      setTeam1Id(match?.team1Id || '');
      setTeam2Id(match?.team2Id || '');
      setTeam1Score(match?.team1Score || '');
      setTeam2Score(match?.team2Score || '');
      setError('');
    };
    resetForm();
  }, [match]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!round || !tournamentId || !team1Id || !team2Id) {
      setError('Round, tournamentId, team1Id and team2Id are required.');
      return;
    }
    if (String(team1Id) === String(team2Id)) {
      setError('Teams must be different.');
      return;
    }

    const payload = {
      round: Number(round),
      tournamentId: Number(tournamentId),
      team1Id: Number(team1Id),
      team2Id: Number(team2Id),
      status: 'SCHEDULED',
      team1Score: team1Score !== '' ? Number(team1Score) : undefined,
      team2Score: team2Score !== '' ? Number(team2Score) : undefined,
    };

    setSubmitting(true);
    try {
      if (match) {
        const payload = {
          id: match.id,
          round: Number(round),
          tournamentId: Number(tournamentId),
          team1Id: Number(team1Id),
          team2Id: Number(team2Id),
          status: 'SCHEDULED',
          team1Score: team1Score !== '' ? Number(team1Score) : undefined,
          team2Score: team2Score !== '' ? Number(team2Score) : undefined,
        };
        const updated = await updateMatch(match.id, payload);
        toast.success('Match updated successfully');
        if (onCreated) onCreated(updated);
      } else {
        const created = await createMatch(payload);
        toast.success('Match created successfully');
        if (onCreated) onCreated(created);
      }
      onClose();
    } catch (err) {
      const msg = err?.message || 'Failed to create match';
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded bg-red-50 p-3 text-red-600">{error}</div>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Round*</label>
          <input
            type="number"
            min={1}
            value={round}
            onChange={e => setRound(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Tournament ID*</label>
          <input
            type="number"
            value={tournamentId}
            onChange={() => {}}
            className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2"
            readOnly
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Team 1 ID*</label>
          <input
            type="number"
            value={team1Id}
            onChange={e => setTeam1Id(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Team 2 ID*</label>
          <input
            type="number"
            value={team2Id}
            onChange={e => setTeam2Id(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Team 1 Score</label>
          <input
            type="number"
            min={0}
            value={team1Score}
            onChange={e => setTeam1Score(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Team 2 Score</label>
          <input
            type="number"
            min={0}
            value={team2Score}
            onChange={e => setTeam2Score(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            close();
            onClose();
          }}
          className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting
            ? match
              ? 'Updating...'
              : 'Creating...'
            : match
              ? 'Update Match'
              : 'Create Match'}
        </button>
      </div>
    </form>
  );
}
