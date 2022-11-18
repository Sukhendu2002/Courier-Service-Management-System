import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Header from "./Components/Navbar/Header";
import AdminLogin from "./Pages/Admin/AdminLogin";
import DashBoard from "./Pages/Admin/DashBoard";
import UserLogin from "./Pages/User/UserLogin";
import UserDashBoard from "./Pages/User/DashBoard";

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
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/user/dashboard" element={<UserDashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
