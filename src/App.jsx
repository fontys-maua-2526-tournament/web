import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import TournamentCreate from './pages/TournamentCreate';
import RegisterUser from './pages/registerUser.jsx';
import CoachTeamView from './pages/coachTeamView.jsx';
import Register from './pages/register';
import Sidebar from './components/sidebar/Sidebar';
import TeamViewer from './pages/teamView';
import TeamDetail from './pages/teamDetail.jsx';
import TournamentView from './pages/TournamentView';
import TeamCreate from './pages/teamCreate';
import TournamentDetails from './pages/TournamentDetails';
import Profile from './pages/profile';
import { UserProvider } from './app/context/user-context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex h-screen">
      <UserProvider>
        <Sidebar hideIcons={isLoginPage} />
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
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/teams/view" element={<TeamViewer />} />
            <Route path="/teams/new" element={<TeamCreate />} />
            <Route path="/teams/:teamId" element={<TeamDetail />} />
            <Route path="/user/register" element={<RegisterUser />} />
            <Route path="/tournaments" element={<TournamentView />} />
            <Route path="/tournaments/:id" element={<TournamentDetails />} />
            <Route path="/tournaments/create" element={<TournamentCreate />} />
            <Route path="/coach/teams/view" element={<CoachTeamView />} />
          </Routes>
        </div>
      </UserProvider>
    </div>
  );
}
