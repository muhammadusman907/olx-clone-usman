// import logo from './logo.svg';
import "./App.css";
import { auth, onAuthStateChanged } from "./config/firbase.js";
// import { MyNavbar } from "./component/Navbar.jsx";
// import MyCard from './component/Card.jsx'
import { About } from "./About.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./Home.jsx";
import { Login } from "./login/Login.jsx";
import { SignUp } from "./signup/SignUp.jsx";
import { useEffect, useState } from "react";
function App() {
  const [islogin, setIslogin] = useState(false);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user);
      
      const uid = user.uid;
      localStorage.setItem("user_id", JSON.stringify(uid));
      console.log({ uid });
      uid && setIslogin(true);
      if (localStorage.getItem("user_id")) return false;
    } else {
      // User is signed out
      // ...
    }
  });
  useEffect(() => {
    islogin ? navigate("/") : navigate("/login");
  }, [islogin]);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
