import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LucidePlusCircle } from 'lucide-react';

function TournamentView() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      const options = { method: 'GET', url: `http://localhost:8080/tournaments` };

      try {
        const { data } = await axios.request(options);
        console.log(data);
        setTournaments(data.tournaments);
      } catch (error) {
        console.error('Failed to fetch tournaments:', error);
        setTournaments(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
    //Pull the data again every minute
    const Interval = setInterval(fetchTournaments, 60000);
    //prevent memory leakage
    return () => clearInterval(Interval);
  }, []);

  return (
    <div className="m-10 flex flex-1 flex-col p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">My Tournaments</h1>

        <Link
          to="/tournaments/create"
          className="bg-fontyssPurple inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow transition-colors hover:bg-[#874c95]"
        >
          <LucidePlusCircle className="h-5 w-5" />
          Add Tournament
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {tournaments.map(tournament => (
          <Link
            key={tournament.id}
            to={`/tournaments/${tournament.id}`}
            className="flex h-20 items-center overflow-hidden rounded-xl bg-[#BDADC0] shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-[#9A8FA0] hover:shadow-xl"
          >
            {/* Smaller dark purple section */}
            <div className="bg-fontyssPurple h-full w-6" />

            {/* Lighter purple section with text */}
            <div className="flex h-full flex-1 items-center px-6">
              <span className="text-lg font-semibold text-black transition-colors duration-200">
                {tournament.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TournamentView;
