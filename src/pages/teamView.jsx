import CustomButton from '../components/customButton';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTeams } from '../services/team-service';
import { LucidePlusCircle, PenLine } from 'lucide-react';
import CustomModal from '../components/customModal';
import TeamCreate from './teamCreate';
import { useUser } from '../app/hooks/use-user';

const TeamViewer = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const token = localStorage.getItem('authToken');
  const role = useUser().role;

  const fetchTeams = async () => {
    setLoading(true);

    try {
      const data = await getAllTeams();
      setTeams(data.teams || data);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
    //Pull the data again every minute
    const Interval = setInterval(fetchTeams, 60000);
    //prevent memory leakage
    return () => clearInterval(Interval);
  }, []);

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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">My Teams</h1>

        {token && role === 'ORGANIZER' && (
          <CustomButton
            onClick={() => setModalOpen(true)}
            className="bg-fontyssPurple inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow transition-colors hover:bg-[#874c95]"
          >
            <LucidePlusCircle className="h-5 w-5" />
            Add Team
          </CustomButton>
        )}
      </div>

      {/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3"> */}
      <div className="flex flex-col gap-8">
        {teams.map(team => (
          // <Link
          //   key={team.id}
          //   className="flex h-48 items-end justify-center rounded-xl border-2 border-black bg-white shadow-md transition-all duration-200 hover:shadow-lg"
          //   // to={`/teams/${team.id}`}
          // >
          //   <div className="w-full rounded-b-xl bg-white py-3 text-center font-semibold text-purple-600">
          //     {team.name}
          //   </div>
          // </Link>
          <Link
            key={team.id}
            to={`/teams/${team.id}`}
            className="flex h-20 items-center overflow-hidden rounded-xl bg-[#BDADC0] shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-[#9A8FA0] hover:shadow-xl"
          >
            <div className="bg-fontyssPurple h-full w-6" />

            <div className="flex flex-1 items-center justify-between px-6">
              <span className="text-lg font-semibold text-black">{team.name}</span>
              <div className="flex items-center justify-center gap-4">
                <strong className="text-black">Code:</strong> {team.inviteCode}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <CustomModal isOpen={!!selectedTeam} title="Edit Team" onClose={() => setSelectedTeam(null)}>
        <TeamCreate
          team={selectedTeam}
          onClose={() => {
            setSelectedTeam(null);
            fetchTeams();
          }}
        />
      </CustomModal>
      <CustomModal isOpen={modalOpen} title={'Create a Team'} onClose={() => setModalOpen(false)}>
        <TeamCreate
          onClose={() => {
            setModalOpen(false);
            fetchTeams();
          }}
        />
      </CustomModal>
    </div>
  );
};

export default TeamViewer;
