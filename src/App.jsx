import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Sidebar from "./components/sidebar/Sidebar";
import TeamViewer from "./pages/teamView";
import TournamentView from "./pages/TournamentView";
import TournamentCreate from "./pages/TournamentCreate";

export default function App() {
  return (
    <BrowserRouter>
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-5 bg-gray-50 overflow-y-auto">
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
