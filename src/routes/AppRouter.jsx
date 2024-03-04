import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "../pages/home/home.jsx";
import Login from "../pages/login/login.jsx";
import Signup from "../pages/signup/signup.jsx";
import Dashboard from "../pages/dashboard/dashboard.jsx";
import Profile from "../pages/profile/profile.jsx";
import { useContext } from "react";
import Auth from "../context/AuthProvider.jsx";
import Single_product from "../pages/single_product/single_product.jsx";
import Chat from "../pages/chat/Chat.jsx";
import UserProduct from "../pages/user-product/UserProduct.jsx";
const AppRouter = () => {
  const { isLogin } = useContext(Auth);
  const { pathname } = useLocation();

  // console.log({ pathname });

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/signup"
        element={isLogin ? <Navigate to="/" /> : <Signup />}
      ></Route>
      <Route
        path="/login"
        element={isLogin ? <Navigate to="/" /> : <Login />}
      ></Route>
      <Route
        path="/dashboard"
        element={isLogin ? <Dashboard /> : <Navigate to="/login" />}
      ></Route>
      <Route
        path={`/dashboard/profile`}
        element={isLogin && <Profile />}
      ></Route>
      <Route path="/single_product" element={<Single_product />}></Route>
      <Route
        path="/chat"
        element={isLogin ? <Chat /> : <Navigate to="/login" />}
      ></Route>
      <Route
        path="/user-product"
        element={isLogin ? <UserProduct /> : <Navigate to="/login" />}
      ></Route>
    </Routes>
  );
};

export default AppRouter;
