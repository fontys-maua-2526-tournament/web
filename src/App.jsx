import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Sidebar from "./components/sidebar/Sidebar";
import TeamViewer from "./pages/teamView";
import TeamCreate from "./pages/teamCreate";


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
          <Route path="/teams/new" element={<TeamCreate />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}
