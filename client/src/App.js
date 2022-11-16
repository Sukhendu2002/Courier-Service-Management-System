import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Header from "./Components/Navbar/Header";
import AdminLogin from "./Pages/Admin/AdminLogin";
import DashBoard from "./Pages/Admin/DashBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/dashboard" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
