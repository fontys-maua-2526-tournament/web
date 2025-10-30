import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "./Sidebar";

function SidebarItem({ icon, text, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          isActive
            ? "bg-white text-mauaBlue"
            : "text-white hover:bg-white hover:text-mauaBlue"
        }
      `}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div className={`
            absolute left-full rounded-md px-2 py-1 ml-6 bg-mauaBlue text-white
            text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible 
            group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}

export default SidebarItem;
