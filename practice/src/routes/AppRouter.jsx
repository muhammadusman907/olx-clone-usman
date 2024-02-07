import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home.jsx";
import Login from "../pages/login/login.jsx";
import Signup from "../pages/signup/signup.jsx";
import Dashboard from "../pages/dashboard/dashboard.jsx";
const AppRouter = () => {
  console.log("router");
  return (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
  );
};

export default AppRouter;
