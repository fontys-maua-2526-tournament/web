import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Sidebar from "./components/sidebar/Sidebar";
import TeamViewer from "./pages/teamView";
import TournamentView from "./pages/TournamentView";
import TournamentCreate from "./pages/TournamentCreate";
import RegisterUser from "./pages/registerUser.jsx";
import CoachTeamView from "./pages/coachTeamView.jsx";

export default function App() {

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex h-screen">
      <Sidebar hideIcons={isLoginPage} />
      <div className="flex-1 p-5 bg-gray-50 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teams/view" element={<TeamViewer />} />
          <Route path="/tournaments" element={<TournamentView />} />
          <Route path="/tournaments/create" element={<TournamentCreate />} />
          <Route path="/user/register" element={<RegisterUser />}/>
          <Route path="/coach/teams/view" element={<CoachTeamView/>}/>
        </Routes>
      </div>
    </div>
  );
}
