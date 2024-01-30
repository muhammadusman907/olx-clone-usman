// import logo from './logo.svg';
import "./App.css";
import { auth, onAuthStateChanged } from "./config/firbase.js";
// import { MyNavbar } from "./component/Navbar.jsx";
// import MyCard from './component/Card.jsx'
import { About } from "./About.jsx";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Home } from "./Home.jsx";
import { Login } from "./login/Login.jsx";
import { SignUp } from "./signup/SignUp.jsx";
import { Dashbord } from "./dashboard/Dashboard.jsx";
import { useEffect, useState } from "react";
import { Profile } from "./profile/Profile.jsx";
import { SingleProduct } from "./single_product/SingleProduct.jsx";

function App() {
  const [islogin, setIslogin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        uid && setIslogin(true);
      } else {
        setIslogin(false);
      }
    });
  }, []);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="dashboard"
            element={islogin ? <Dashbord /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="login"
            element={islogin ? <Navigate to="/" /> : <Login />}
          />
          <Route path="about" element={<About />} />
          {/* <Route path="login" element={<Login />}></Route> */}
          <Route
            path="signup"
            element={islogin ? <Navigate to="/" /> : <SignUp />}
          ></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="single-product" element={<SingleProduct />}></Route>
      
        </Routes>
      </div>
    </>
  );
}

export default App;
