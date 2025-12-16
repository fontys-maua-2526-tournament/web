export default function CustomButton({ children, onClick, className, middleSize = true }) {
  return (
    <button
      onClick={onClick}
      className={`bg-mauaBlue hover:bg-fontyssPurple flex items-center justify-center rounded-lg px-16 py-3 text-xl text-white transition-colors duration-300 hover:cursor-pointer ${className} ${middleSize ? 'min-w-[400px]' : ''}`}
    >
      {children}
    </button>
  );
}
