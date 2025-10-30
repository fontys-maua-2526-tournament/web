import CustomButton from '../components/customButton';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusCircleIcon } from '@phosphor-icons/react';

const TeamViewer = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true)
            const options = {method: 'GET', url: `http://localhost:8080/teams`};

            try {
                const { data } = await axios.request(options);
                console.log(data);
                setTeams(data.teams);
            } catch (error) {
                console.error('Failed to fetch teams:', error);
                setTeams(null);
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
        <div className="flex flex-col flex-1 p-8 ml-20">
            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-4xl font-bold text-gray-900">My Teams</h1>
                <Link to={`/teams/new`}>
                    <PlusCircleIcon className='text-purple-600 hover:text-purple-800 transition-colors'/>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {teams.map(team => (
                    <Link className='flex items-end justify-center h-48 bg-white border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200' to={`/teams/${team.id}`} >
                        <div className='w-full bg-white rounded-b-xl py-3 text-center font-semibold text-purple-600'>
                            {team.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TeamViewer;