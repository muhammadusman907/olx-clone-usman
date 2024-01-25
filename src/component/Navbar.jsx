import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link }from "react-router-dom";
import SELL_BTN from "../Images/SEll_BTN.svg"
import { About } from "../About.jsx";

export const MyNavbar = () => {
  console.log(Link);
  return (
    <>
      <div className="bg-gray-500 w-[100%] ">
        <ul className="flex justify-between items-center h-[60px]">
          <Link to="About">
           {<li className="text-white">home</li>}
          </Link>
          <Link to="login">
           {<li className="text-white">Login</li>}
          </Link>
          <li>
            <button className="relative flex justify-center items-center
               flex-col
            ">
              <img src={SELL_BTN} />
              <div className="absolute z-10 align-center font-bold text-1xl">+ SELL</div>
            </button>
          </li>
        </ul>
      </div>

    </>
  );
}

