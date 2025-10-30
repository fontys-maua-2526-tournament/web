import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-5 bg-gray-50 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}
