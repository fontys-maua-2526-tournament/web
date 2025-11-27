import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function TournamentDetails() {
    const { id } = useParams(); // get tournament ID from URL
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchTournament = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:8080/tournaments/${id}`);
                setTournament(data.tournament);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch tournament details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTournament();
    }, [id]);

    const handleCopyInvite = () => {
        if (!tournament?.invite) return;
        navigator.clipboard.writeText(tournament.invite);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2s
    };

    if (loading) return <p className="text-center py-6 text-gray-500">Loading tournament...</p>;
    if (error) return <p className="text-center py-6 text-red-500">{error}</p>;
    if (!tournament) return <p className="text-center py-6 text-gray-500">Tournament not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{tournament.name}</h1>
                <Link
                    to="/tournaments"
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                    Back to List
                </Link>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                
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
                    <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-800 font-medium">{tournament.status}</span>
                </div>

                {tournament.invite && (
                    <div className="flex items-center gap-2">
                        <label className="font-medium text-gray-600">Invite Code:</label>
                        <input
                            type="text"
                            readOnly
                            value={tournament.invite}
                            className="border border-gray-300 rounded-lg p-2 flex-1 text-gray-900"
                        />
                        <button
                            onClick={handleCopyInvite}
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TournamentDetails;
