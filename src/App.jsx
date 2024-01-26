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

function App() {
  const [islogin, setIslogin] = useState(false);
  const navigate = useNavigate();

 
  useEffect(() => {
 onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid );
      uid && setIslogin(true);

    } else {
            setIslogin(false)
    }
  });
  }, []);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashbord />}></Route>
          <Route path="/" element={islogin ? <Navigate to="/home" /> :<Login />} />
          <Route path="/home" element={islogin ?<Home /> : <Navigate to="/"/>}></Route>
          <Route path="about" element={<About />} />
          {/* <Route path="login" element={<Login />}></Route> */}
          <Route path="signup" element={islogin ? <Navigate to="/home"/> : <SignUp />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
