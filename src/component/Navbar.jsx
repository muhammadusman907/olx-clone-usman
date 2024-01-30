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
import { auth, onAuthStateChanged, signOut } from "../config/firbase.js";
import { Routes, Route, Navigate } from "react-router-dom";
import LOGO from "../Images/logo.png";
import { Profile } from "../profile/Profile.jsx";

// import { Profile } from "../profile/profile.jsx";

export const MyNavbar = () => {
  const [page, setPage] = useState("");
// =====================
// ==============logout 
  const logOut = () =>{
    // const auth = getAuth();
    signOut(auth).then(() => {
               alert("logout")
    }).catch((error) => {
         
    });
  }
  const onClick = ({ key }) => {
    // message.info(`Click on item ${key}`);
    switch (key) {
      case "1":
        setPage("profile");
        break;
      case "2":
        setPage("dashboard");
        break;
      case "3":
          logOut()
        // setPage("logout");
        break;
      default:
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
      <div className="bg-gray-200 w-[100%] ">
        <ul className="flex justify-between items-center h-[60px]">
          <Link to="About">
            {
              <li className="text-white">
                <img src={LOGO} alt="" srcset="" className="w-20" />
              </li>
            }
          </Link>

          <li className="flex items-center border-2 justify-around text-black w-[200px]">
            {islogin && (
              <div className="flex items-center border-2 ">
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
            )}
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
