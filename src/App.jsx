import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import CreateTournament from "./pages/CreateTournament";
import TournamentCreate from './pages/TournamentCreate';
import RegisterUser from "./pages/registerUser.jsx";
import CoachTeamView from "./pages/coachTeamView.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
<BrowserRouter>
      <div className="flex h-screen">
        <Sidebar hideIcons={isLoginPage}/>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={2}
          theme="colored"
        />
        <div className="flex-1 overflow-y-auto bg-gray-50 p-5">
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
    </BrowserRouter>
  );
}
