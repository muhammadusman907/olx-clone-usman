import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Spinner from "react-bootstrap/Spinner";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SELL_BTN from "../Images/SEll_BTN.svg";
import PROFILE from "../Images/PROFILE.png";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
// import { About } from "../About.jsx";
import { auth, onAuthStateChanged } from "../config/firbase.js";
import { Routes, Route, Navigate } from "react-router-dom";
import { Profile } from "../profile/Profile.jsx";

// import { Profile } from "../profile/profile.jsx";

export const MyNavbar = () => {
  const [page , setPage ] = useState("")
  const onClick = ({ key }) => {
  // message.info(`Click on item ${key}`);
  switch(key){
    case "1":
      setPage("profile");
     break; 
     case "2" :
      setPage("dashboard")
      break ;
      case "3" :
        setPage ("logout");
        break ; 
        default :
  }
  console.log(key);
};
const items = [
  {
    label: "Profile",
    key: "1",
  },
  {
    label: "Product sale",
    key: "2",
  },
  {
    label: "Logout",
    key: "3",
  },
];
  const [islogin, setIslogin] = useState("");
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
  // console.log(Link);
  return (
    <>
       {console.log(page)}
       <Navigate to={page} />
      <div className="bg-gray-500 w-[100%] ">
        <ul className="flex justify-between items-center h-[60px]">
          <Link to="About">{<li className="text-white">home</li>}</Link>

          <li className="flex items-center">
            <div className="flex items-center">
              <div className="text-white rounded-full border-2 w-[40px] h-[40px]">
                <img src={PROFILE} alt="" />
              </div>
              <Dropdown
                menu={{
                  items,
                  onClick,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <DownOutlined className="text-white" />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <Link to="/dashboard">
              <div>
                {islogin ? (
                  <>
                    <button
                      className="relative flex justify-center items-center
                    flex-col"
                    >
                      <img src={SELL_BTN} alt="sell btn" />
                      <div className="absolute z-10 align-center font-bold text-1xl text-black">
                        + SELL
                      </div>
                    </button>
                  </>
                ) : (
                  <Link to="/login">
                    <div>
                      <button
                        className="relative flex justify-center items-center
                    flex-col"
                      >
                        <img src={SELL_BTN} alt="sell btn" />
                        <div className="absolute z-10 align-center font-bold text-1xl text-black">
                          + SELL
                        </div>
                      </button>
                    </div>
                  </Link>
                )}
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

// import { DownOutlined } from "@ant-design/icons";
// import { Dropdown, message, Space } from "antd";
// const onClick = ({ key }) => {
//   message.info(`Click on item ${key}`);
// };
// const items = [
//   {
//     label: "1st menu item",
//     key: "1",
//   },
//   {
//     label: "2nd menu item",
//     key: "2",
//   },
//   {
//     label: "3rd menu item",
//     key: "3",
//   },
// ];
// const App = () => (
//   <Dropdown
//     menu={{
//       items,
//       onClick,
//     }}
//   >
//     <a onClick={(e) => e.preventDefault()}>
//       <Space>
//         Hover me, Click menu item
//         <DownOutlined />
//       </Space>
//     </a>
//   </Dropdown>
// );
// export default App;
