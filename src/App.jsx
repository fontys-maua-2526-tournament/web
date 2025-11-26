import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Sidebar from './components/sidebar/Sidebar';
import TeamViewer from './pages/teamView';
import TournamentView from './pages/TournamentView';
import TournamentCreate from './pages/TournamentCreate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
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
            <Route path="/tournaments" element={<TournamentView />} />
            <Route path="/tournaments/create" element={<TournamentCreate />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
