import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Sidebar from './components/sidebar/Sidebar';
import TeamViewer from './pages/teamView';
import TeamCreate from './pages/teamCreate';
import TournamentView from './pages/TournamentView';
import TournamentDetails from './pages/TournamentDetails';
import { UserProvider } from './context/userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="flex h-screen">
          <Sidebar />
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
              <Route path="/teams/new" element={<TeamCreate />} />
              <Route path="/tournaments" element={<TournamentView />} />
              <Route path="/tournaments/:id" element={<TournamentDetails />} />
            </Routes>
          </div>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}
