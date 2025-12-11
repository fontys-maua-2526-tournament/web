import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cancelTournament, getTournamentById } from '../services/tournament-service';
import { Trash } from 'lucide-react';
import CustomModal from '../components/customModal';
import TournamentCreate from './TournamentCreate';
import StatusBadge from '../components/StatusBadge';
import { PenLine } from 'lucide-react';

function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const fetchTournament = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTournamentById(id);
      setTournament(data.tournament);
    } catch (err) {
      console.error('Failed to fetch tournament details:', err);
      setError('Failed to load tournament details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournament();
  }, [id]);

  const handleCancel = async () => {
    setCanceling(true);
    try {
      await cancelTournament(id);
      await fetchTournament();
      setShowCancelModal(false);
    } catch (err) {
      console.error('Failed to cancel tournament:', err);
      setError('Failed to cancel tournament.');
    } finally {
      setCanceling(false);
    }
  };

  const handleCopyInvite = () => {
    if (!tournament?.invite) return;
    navigator.clipboard.writeText(tournament.invite);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <p className="py-6 text-center text-gray-500">Loading tournament...</p>;
  if (error) return <p className="py-6 text-center text-red-500">{error}</p>;
  if (!tournament) return <p className="py-6 text-center text-gray-500">Tournament not found.</p>;

  return (
    <div className="w-full p-8 px-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{tournament.name}</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setEditModal(true);
            }}
            className="bg-mauaBlue hover:bg-fontyssPurple flex h-10 w-10 items-center justify-center rounded-xl shadow-2xs duration-200 hover:-translate-y-1 hover:cursor-pointer"
          >
            <PenLine className="h-5 w-5 text-white" />
          </button>
          <Link
            to="/tournaments"
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
          >
            Back to List
          </Link>
        </div>
      </div>

      {/* Details Card */}
      <div className="space-y-4 rounded-xl bg-white p-6 shadow-md">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Address:</span>
          <span className="text-gray-900">{tournament.address}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Start Time:</span>
          <span className="text-gray-900">{new Date(tournament.startTime).toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">End Time:</span>
          <span className="text-gray-900">{new Date(tournament.endTime).toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Status:</span>
          <StatusBadge status={tournament.status} />
        </div>

        {tournament.invite && (
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-600">Invite Code:</label>
            <input
              type="text"
              readOnly
              value={tournament.invite}
              className="flex-1 rounded-lg border border-gray-300 p-2 text-gray-900"
            />
            <div className="flex justify-between gap-2">
              <button
                onClick={handleCopyInvite}
                className="rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>

              {tournament.status != 'CANCELLED' && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="rounded-lg border border-red-600 px-3 py-2 text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                  <Trash />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <CustomModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Tournament"
      >
        {closeModal => (
          <>
            <p className="mb-6 text-gray-600">
              Are you sure you want to cancel <strong>{tournament.name}</strong>? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancel}
                disabled={canceling}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {canceling ? 'Canceling...' : 'Yes, Cancel'}
              </button>
            </div>
          </>
        )}
      </CustomModal>
      {editModal && (
        <CustomModal isOpen={editModal} onClose={() => setEditModal(false)}>
          <TournamentCreate
            onClose={() => {
              setEditModal(false);
              fetchTournament();
            }}
            tournament={tournament}
          />
        </CustomModal>
      )}
    </div>
  );
}

export default TournamentDetails;
