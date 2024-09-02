import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import UserRoute from "./Routes/UserRoute";
import AdminRoute from "./Routes/AdminRoute";
import UserPanel from "./pages/UserPanel";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Location from "./pages/Location";
import Clue from "./pages/Clue";
import Photo from "./pages/Photo";
import Team from "./pages/Team";
import TeamDetail from "./pages/TeamDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<UserLogin />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="user-panel" element={<UserPanel />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="location" element={<Location />} />
          <Route path="clue" element={<Clue />} />
          <Route path="photo" element={<Photo />} />
          <Route path="team" element={<Team />} />
          <Route path="team-detail" element={<TeamDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
