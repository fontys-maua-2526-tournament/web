import CustomButton from '../components/customButton';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LucidePlusCircle } from 'lucide-react';

const TeamViewer = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      const options = { method: 'GET', url: `http://localhost:8080/teams` };

      try {
        const { data } = await axios.request(options);
        console.log(data);
        setTeams(data.teams);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
    //Pull the data again every minute
    const Interval = setInterval(fetchTeams, 60000);
    //prevent memory leakage
    return () => clearInterval(Interval);
  }, []);

  return (
    <div className="ml-20 flex flex-1 flex-col p-8">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-4xl font-bold text-gray-900">My Teams</h1>
        <Link to={`/teams/new`}>
          <LucidePlusCircle className="text-purple-600 transition-colors hover:text-purple-800" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {teams.map(team => (
          <Link
            className="flex h-48 items-end justify-center rounded-xl border-2 border-black bg-white shadow-md transition-all duration-200 hover:shadow-lg"
            to={`/teams/${team.id}`}
          >
            <div className="w-full rounded-b-xl bg-white py-3 text-center font-semibold text-purple-600">
              {team.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamViewer;
