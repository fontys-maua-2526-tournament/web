import { createContext, useState } from 'react';
import { House, Trophy, User, Users } from 'lucide-react';
import SidebarLayout from './SidebarLayout';
import SidebarItem from './SidebarItem';

export const SidebarContext = createContext();

function Sidebar({ hideIcons }) {
  const [expanded, setExpanded] = useState(false);
  const token = localStorage.getItem('authToken');

  if (window.location.pathname === '/login' || window.location.pathname === '/user/register') {
    return <></>;
  }

  if (hideIcons) {
    return (
      <SidebarContext.Provider value={{ expanded, setExpanded }}>
        <SidebarLayout></SidebarLayout>
      </SidebarContext.Provider>
    );
  } else {
    return (
      <SidebarContext.Provider value={{ expanded, setExpanded }}>
        <SidebarLayout>
          <SidebarItem icon={<House size={20} />} text="Home" to="/" />
          <SidebarItem icon={<Trophy size={20} />} text="Tournaments" to="/tournaments" />
          {token && <SidebarItem icon={<Users size={20} />} text="Teams" to="/teams/view" />}
          {token && <SidebarItem icon={<User size={20} />} text="Profile" to="/profile" />}
        </SidebarLayout>
      </SidebarContext.Provider>
    );
  }
}

export default Sidebar;
