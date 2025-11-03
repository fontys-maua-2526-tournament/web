import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LucidePlusCircle } from 'lucide-react';

function TournamentView() {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTournaments = async () => {
            setLoading(true)
            const options = {method: 'GET', url: `http://localhost:8080/tournaments`};

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
        <div className="flex flex-col flex-1 p-8 m-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-gray-900">My Tournaments</h1>

                <Link
                to="/tournaments/create"
                className="inline-flex items-center gap-2 bg-fontyssPurple text-white px-4 py-2 rounded-xl shadow hover:bg-[#874c95] transition-colors">
                    <LucidePlusCircle className="w-5 h-5" />
                    Add Tournament
                </Link>
            </div>

            <div className="flex flex-col gap-4">
            {tournaments.map((tournament) => (
                <Link
                key={tournament.id}
                to={`/tournaments/${tournament.id}`}
                className="flex items-center h-20 rounded-xl overflow-hidden shadow-md 
                            bg-[#BDADC0] hover:bg-[#9A8FA0] hover:-translate-y-1 
                            hover:shadow-xl transition-all duration-200"
                >
                {/* Smaller dark purple section */}
                <div className="w-6 h-full bg-fontyssPurple" />

                {/* Lighter purple section with text */}
                <div className="flex-1 h-full flex items-center px-6">
                    <span className="text-lg font-semibold text-black transition-colors duration-200">
                    {tournament.name}
                    </span>
                </div>
                </Link>
            ))}
            </div>
        </div>
    );
};

export default TournamentView;