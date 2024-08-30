import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import UserRoute from "./Routes/UserRoute";
import AdminRoute from "./Routes/AdminRoute";
import UserPanel from "./pages/UserPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<UserLogin />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="user-panel" element={<UserPanel />} />
        <Route path="admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
