import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTournaments } from '../services/tournament-service';
import { LucidePlusCircle, PenLine } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import TournamentCreate from './TournamentCreate';
import CustomModal from '../components/customModal';
import CustomButton from '../components/customButton';
import { useUser } from '../app/hooks/use-user';

function TournamentView() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem('authToken');
  const role = useUser().role;

  const fetchTournaments = async () => {
    setLoading(true);

    try {
      const data = await getAllTournaments();
      setTournaments(data.tournaments || data);
    } catch (error) {
      console.error('Failed to fetch tournaments:', error);
      setTournaments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
    const interval = setInterval(fetchTournaments, 60000);
    return () => clearInterval(interval);
  }, []);

  // Apply filters
  const filteredTournaments = tournaments.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;

    const matchesStartDate = !startDateFilter || new Date(t.startTime) >= new Date(startDateFilter);

    const matchesEndDate =
      !endDateFilter || new Date(t.startTime) <= new Date(endDateFilter + 'T23:59:59');

    return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="m-10 flex flex-1 flex-col p-8">
      {loading && (
        <div className="fixed inset-0 flex h-screen w-screen items-center justify-center gap-10 bg-[rgba(0,0,0,0.5)]">
          <p className="animate-bounce text-[14rem] text-white transition-all duration-700">.</p>
          <p
            className="animate-bounce text-[14rem] text-white transition-all duration-700"
            style={{ animationDelay: '300ms' }}
          >
            .
          </p>
          <p
            className="animate-bounce text-[14rem] text-white transition-all duration-700"
            style={{ animationDelay: '600ms' }}
          >
            .
          </p>
        </div>
      )}
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">
          {role === 'ORGANIZER' ? 'My Tournaments' : 'Tournaments'}
        </h1>

        {token && role === 'ORGANIZER' && (
          <Link
            to="/tournaments/create"
            className="bg-fontyssPurple inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow transition-colors hover:bg-[#874c95]"
          >
            <LucidePlusCircle className="h-5 w-5" />
            Add Tournament
          </Link>
        )}
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl bg-white p-4 shadow-md">
        {/* Search */}
        <input
          type="text"
          placeholder="Search tournaments..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-64 rounded-lg border border-gray-300 p-2"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        {/* Start Date */}
        <input
          type="date"
          value={startDateFilter}
          onChange={e => setStartDateFilter(e.target.value)}
          className="rounded-lg border border-gray-300 p-2"
        />

        {/* End Date */}
        <input
          type="date"
          value={endDateFilter}
          onChange={e => setEndDateFilter(e.target.value)}
          className="rounded-lg border border-gray-300 p-2"
        />

        {/* Reset Button */}
        <button
          onClick={() => {
            setSearch('');
            setStatusFilter('ALL');
            setStartDateFilter('');
            setEndDateFilter('');
          }}
          className="ml-auto rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
        >
          Reset Filters
        </button>
      </div>

      {/* Tournament List */}
      <div className="flex flex-col gap-4">
        {filteredTournaments.map(tournament => (
          <Link
            key={tournament.id}
            to={`/tournaments/${tournament.id}`}
            className="flex h-20 items-center overflow-hidden rounded-xl bg-[#BDADC0] shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-[#9A8FA0] hover:shadow-xl"
          >
            <div className="bg-fontyssPurple h-full w-6" />

            <div className="flex flex-1 items-center justify-between px-6">
              <span className="text-lg font-semibold text-black">{tournament.name}</span>
              <div
                className="flex items-center justify-center gap-4"
                onClick={e => e.stopPropagation()}
              >
                <StatusBadge status={tournament.status} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {modalOpen && (
        <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Tournament">
          <TournamentCreate
            onClose={() => {
              setModalOpen(false);
              fetchTournaments();
            }}
          />
        </CustomModal>
      )}
    </div>
  );
}

export default TournamentView;
