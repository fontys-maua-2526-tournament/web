import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LucidePlusCircle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

function TournamentView() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      const url = `http://localhost:8080/tournaments`;

      try {
        const { data } = await axios.get(url);
        setTournaments(data.tournaments);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
        setTournaments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
    const interval = setInterval(fetchTournaments, 60000);
    return () => clearInterval(interval);
  }, []);

  // Apply filters
  const filteredTournaments = tournaments.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || t.status === statusFilter;

    const matchesStartDate =
      !startDateFilter || new Date(t.startTime) >= new Date(startDateFilter);

    const matchesEndDate =
      !endDateFilter || new Date(t.startTime) <= new Date(endDateFilter + "T23:59:59");

    return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="flex flex-col flex-1 p-8 m-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Tournaments</h1>

        <Link
          to="/tournaments/create"
          className="inline-flex items-center gap-2 bg-fontyssPurple text-white px-4 py-2 rounded-xl shadow hover:bg-[#874c95] transition-colors"
        >
          <LucidePlusCircle className="w-5 h-5" />
          Add Tournament
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl shadow-md items-center">

        {/* Search */}
        <input
          type="text"
          placeholder="Search tournaments..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-64"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
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
          className="border border-gray-300 rounded-lg p-2"
        />

        {/* End Date */}
        <input
          type="date"
          value={endDateFilter}
          onChange={e => setEndDateFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />

        {/* Reset Button */}
        <button
          onClick={() => {
            setSearch("");
            setStatusFilter("ALL");
            setStartDateFilter("");
            setEndDateFilter("");
          }}
          className="ml-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
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
            className="flex items-center h-20 rounded-xl overflow-hidden shadow-md bg-[#BDADC0] hover:bg-[#9A8FA0] hover:-translate-y-1  hover:shadow-xl transition-all duration-200">
            <div className="w-6 h-full bg-fontyssPurple" />

            <div className="flex flex-1 items-center justify-between px-6">
              <span className="text-lg font-semibold text-black">
                {tournament.name}
              </span>
              <StatusBadge status={tournament.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TournamentView;
