import { Menu, MenuSquare } from "lucide-react";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

function SidebarLayout({ children }) {
  const { expanded, setExpanded } = useContext(SidebarContext);

  return (
    <aside className="h-screen">
      <nav
        className={`h-full inline-flex flex-col bg-gradient-to-b from-fontyssPurple to-mauaBlue text-white shadow-sm transition-all duration-300 ${
          expanded ? "w-64" : "w-20"
        }`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-center p-3">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`absolute top-3 transition-all duration-100 hover:scale-90 text-white p-1.5 rounded-lg ${
              expanded ? "right-3" : "left-1/2 -translate-x-1/2"
            }`}
          >
            {expanded ? <MenuSquare /> : <Menu />}
          </button>
        </div>

        {/* Sidebar Content */}
        <ul className="flex-1 flex flex-col justify-center items-center gap-4 px-3">
          {children}
        </ul>
      </nav>
    </aside>
  );
}

export default SidebarLayout;
