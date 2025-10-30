import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import TeamViewer from "./pages/teamView";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teamview" element={<TeamViewer />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}
