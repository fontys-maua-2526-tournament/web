import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import CreateTournament from "./pages/CreateTournament";
import { TeamProvider } from "@/app/context/team-context";
import { TournamentProvider } from "@/app/context/tournament-context";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tournaments" element={<CreateTournament />} />
      </Routes>
    </BrowserRouter>
  );
}
