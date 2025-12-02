import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { cancelTournament, getTournamentById } from "../services/tournament-service";
import { Trash } from "lucide-react";
import CustomModal from "../components/customModal";
import StatusBadge from "../components/StatusBadge";

function TournamentDetails() {
    const { id } = useParams();
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [canceling, setCanceling] = useState(false);

    const fetchTournament = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getTournamentById(id);
            setTournament(data.tournament);
        } catch (err) {
            setError("Failed to load tournament details.");
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
            setError("Failed to cancel tournament.");
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
                    <StatusBadge status={tournament.status} />
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
                        <div className="flex justify-between gap-2">
                            <button
                                onClick={handleCopyInvite}
                                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>

                            {tournament.status != "CANCELLED" &&
                                <button
                                    onClick={() => setShowCancelModal(true)}
                                    className="border border-red-600 text-red-600 px-3 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                                >
                                    <Trash />
                                </button>
                            }

                        </div>
                    </div>
                )}
            </div>

            {/* Cancel Confirmation Modal */}
            <CustomModal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                title="Cancel Tournament"
            >
                {(closeModal) => (
                    <>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to cancel <strong>{tournament.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                            >
                                No, Keep It
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={canceling}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
                            >
                                {canceling ? "Canceling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </>
                )}
            </CustomModal>
        </div>
    );
}

export default TournamentDetails;