export default function CustomButton({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-mauaBlue hover:bg-fontyssPurple rounded-lg px-16 py-3 text-xl text-white transition-colors duration-300 hover:cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
