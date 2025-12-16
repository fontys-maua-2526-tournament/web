

export default function StatusBadge({ status }) {
  const statusStyles = {
    "ACTIVE": "bg-green-100 text-green-600",
    "COMPLETED": "bg-blue-100 text-blue-600",
    "CANCELLED": "bg-red-100 text-red-600",
    "PENDING": "bg-yellow-100 text-yellow-600"
  };

  const styles = statusStyles[status] || "bg-gray-100 text-gray-800";

  return (
    <span className={`px-2 py-1 rounded-lg font-medium ${styles}`}>
      {status}
    </span>
  );
}