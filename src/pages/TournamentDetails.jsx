import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cancelTournament, getTournamentById } from '../services/tournament-service';
import { Trash, PenLine, ChevronRight } from 'lucide-react'; // Added ChevronRight for the arrow
import CustomModal from '../components/customModal';
import TournamentCreate from './TournamentCreate';
import StatusBadge from '../components/StatusBadge';
import { useUser } from '../app/hooks/use-user';

function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const role = useUser().role;

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
          {role === 'ORGANIZER' && (
            <button
              onClick={() => setEditModal(true)}
              className="bg-mauaBlue hover:bg-fontyssPurple flex h-10 w-10 items-center justify-center rounded-xl shadow-2xs duration-200 hover:-translate-y-1 hover:cursor-pointer"
            >
              <PenLine className="h-5 w-5 text-white" />
            </button>
          )}
          <Link
            to="/tournaments"
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
          >
            Back to List
          </Link>
        </div>
      </div>

      {/* Details Drawer */}
      <div className="relative mb-4">
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg bg-white px-4 py-3 text-black shadow transition hover:bg-gray-50"
        >
          <span className="font-medium">Tournament Details</span>
          <ChevronRight
            className={`h-5 w-5 transition-transform duration-300 ${isDrawerOpen ? 'rotate-90' : ''}`}
          />
        </button>

        <div
          className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
            isDrawerOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-2 mb-4 space-y-4 rounded-xl bg-white p-6 shadow-md">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Address:</span>
              <span className="text-gray-900">{tournament.address}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Start Time:</span>
              <span className="text-gray-900">
                {new Date(tournament.startTime).toLocaleString()}
              </span>
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

                  {tournament.status !== 'CANCELLED' && (
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="rounded-lg border border-red-600 px-3 py-2 text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
