import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  cancelTournament,
  getTournamentById,
  deleteTournament,
} from '../services/tournament-service';
import { Trash, PenLine, ChevronRight } from 'lucide-react'; // Added ChevronRight for the arrow
import CreateMatchModal from '../components/createMatchModal';
import CustomButton from '../components/customButton';
import CustomModal from '../components/customModal';
import TournamentCreate from './TournamentCreate';
import StatusBadge from '../components/StatusBadge';
import { useUser } from '../app/hooks/use-user';
import { getMatchesByTournament, deleteMatch } from '../services/match-service';
import { getAllTeams } from '../services/team-service';

// ...existing code...
function TournamentDetails() {
  const navigate = useNavigate();
  const [showDeleteTournamentModal, setShowDeleteTournamentModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const [deletingTournament, setDeletingTournament] = useState(false);
  const [showDeleteMatchModal, setShowDeleteMatchModal] = useState(false);
  const [deletingMatch, setDeletingMatch] = useState(false);
  const [matchToDelete, setMatchToDelete] = useState(null);

  const handleDeleteTournament = async () => {
    setDeletingTournament(true);
    try {
      await deleteTournament(id);
      setShowDeleteTournamentModal(false);
      navigate('/tournaments');
    } catch {
      setError('Failed to delete tournament.');
    } finally {
      setDeletingTournament(false);
    }
  };

  const handleDeleteMatch = async () => {
    if (!matchToDelete) return;
    setDeletingMatch(true);
    try {
      await deleteMatch(matchToDelete.id);
      setShowDeleteMatchModal(false);
      setMatchToDelete(null);
      fetchMatches();
    } catch {
      setError('Failed to delete match.');
    } finally {
      setDeletingMatch(false);
    }
  };
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [createMatchModalOpen, setCreateMatchModalOpen] = useState(false);

  const role = useUser().role;

  const fetchMatches = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getMatchesByTournament(id);
      setMatches(data);
      console.log('Matches data:', matches);
    } catch {
      // error intentionally ignored
    } finally {
      setLoading(false);
    }
  };

  const fetchTournament = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTournamentById(id);
      setTournament(data.tournament);
    } catch {
      setError('Failed to load tournament details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllTeams();
      // Support both array and object with .teams
      if (Array.isArray(data)) {
        setTeams(data);
      } else if (data && Array.isArray(data.teams)) {
        setTeams(data.teams);
      } else {
        setTeams([]);
      }
    } catch {
      setError('Failed to load teams.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournament();
    fetchMatches();
    fetchTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <CustomButton onClick={() => setCreateMatchModalOpen(true)}>Create Match</CustomButton>
          )}
          {role === 'ORGANIZER' && (
            <button
              onClick={() => setEditModal(true)}
              className="bg-mauaBlue hover:bg-fontyssPurple flex h-10 w-10 items-center justify-center rounded-xl shadow-2xs duration-200 hover:-translate-y-1 hover:cursor-pointer"
            >
              <PenLine className="h-5 w-5 text-white" />
            </button>
          )}
          {role === 'ORGANIZER' && (
            <button
              onClick={() => setShowDeleteTournamentModal(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow-2xs duration-200 hover:-translate-y-1 hover:cursor-pointer hover:bg-red-700"
            >
              <Trash className="h-5 w-5 text-white" />
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
        {matches.map(match => (
          <div
            key={match.id}
            className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Match ID: {match.id}</h2>
                <p className="text-gray-600">Round: {match.round}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-800">
                  Team 1:{' '}
                  {teams.find(t => String(t.id) === String(match.team1Id))?.name ?? match.team1Id} -
                  Score: {match.team1Score ?? 'N/A'}
                </p>
                <p className="text-gray-800">
                  Team 2:{' '}
                  {teams.find(t => String(t.id) === String(match.team2Id))?.name ?? match.team2Id} -
                  Score: {match.team2Score ?? 'N/A'}
                </p>
                {/* edit match */}
                {role === 'ORGANIZER' && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedMatch(match);
                        setCreateMatchModalOpen(true);
                      }}
                      className="bg-mauaBlue hover:bg-fontyssPurple mt-2 rounded-lg px-3 py-1 text-white transition"
                    >
                      Edit Match
                    </button>
                    <button
                      onClick={() => {
                        setMatchToDelete(match);
                        setShowDeleteMatchModal(true);
                      }}
                      className="mt-2 ml-2 rounded-lg bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                    >
                      Delete Match
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Delete Tournament Modal */}
        <CustomModal
          isOpen={showDeleteTournamentModal}
          onClose={() => setShowDeleteTournamentModal(false)}
          title="Delete Tournament"
        >
          <div className="mb-6 text-gray-600">
            Are you sure you want to delete <strong>{tournament.name}</strong>? This action cannot
            be undone.
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteTournamentModal(false)}
              className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteTournament}
              disabled={deletingTournament}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {deletingTournament ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </CustomModal>

        {/* Delete Match Modal */}
        <CustomModal
          isOpen={showDeleteMatchModal}
          onClose={() => setShowDeleteMatchModal(false)}
          title="Delete Match"
        >
          <div className="mb-6 text-gray-600">Are you sure you want to delete this match?</div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteMatchModal(false)}
              className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteMatch}
              disabled={deletingMatch}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {deletingMatch ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </CustomModal>
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
      {createMatchModalOpen && (
        <CustomModal isOpen={createMatchModalOpen} onClose={() => setCreateMatchModalOpen(false)}>
          <CreateMatchModal
            tournamentId={id}
            match={selectedMatch}
            onCreated={() => {
              fetchMatches();
              setSelectedMatch(null);
              setCreateMatchModalOpen(false);
            }}
          />
        </CustomModal>
      )}
    </div>
  );
}

export default TournamentDetails;
