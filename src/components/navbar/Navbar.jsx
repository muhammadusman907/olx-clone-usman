import { Link, useLocation } from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import { MdDashboard } from "react-icons/md";
import { GiTigerHead } from "react-icons/gi";
import { IoHomeSharp } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { useContext } from "react";
import Auth from "../../context/AuthProvider.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.js";
const Navbar = () => {
  const { pathname } = useLocation();
  const { isLogin } = useContext(Auth);
  // console.log("Navbar", isLogin);
  const logOut = () => {
    signOut(auth);
    localStorage.removeItem("userData");
    localStorage.removeItem("userId");
    localStorage.removeItem("getChatId");
    localStorage.removeItem("margeTwoUserId");
  };

  const elementName = {
    "/": {
      btnName: isLogin ? "Logout" : "Login",
      link: !isLogin && "/login",
      pageName: "Dashboard",
      pageLink: "/dashboard",
      iconName: <IoHomeSharp />,
      btnIcon: !isLogin && <SiGnuprivacyguard />,
    },
    "/login": {
      btnName: "SignUp",
      link: "/signup",
      btnIcon: <SiGnuprivacyguard />,
    },
    "/dashboard": {
      btnName: "Profile",
      link: `${pathname}/profile`,
      pageName: "Home",
      pageLink: "/",
      iconName: <MdDashboard />,
      btnIcon: <CgProfile />,
    },
    "/signup": {
      btnName: "Login",
      link: "/login",
      btnIcon: <SiGnuprivacyguard />,
    },
    "/dashboard/profile": {
      pageName: "Dashboard",
      pageLink: "/dashboard",
      iconName: <MdDashboard />,
    },
    "/single_product": {
      btnName: isLogin ? "Logout" : "Login",
      link: !isLogin && "/login",
      pageName: "Dashboard",
      pageLink: "/dashboard",
      iconName: <IoHomeSharp />,
      btnIcon: !isLogin && <SiGnuprivacyguard />,
    },
    "/chat": {
      btnName: isLogin ? "Logout" : "Login",
      link: !isLogin && "/login",
      pageName: "Dashboard",
      pageLink: "/dashboard",
      iconName: <IoHomeSharp />,
      btnIcon: !isLogin && <SiGnuprivacyguard />,
    },
    "/user-product": {
      btnName: "Profile",
      link: `${pathname}/profile`,
      pageName: "Home",
      pageLink: "/",
      iconName: <MdDashboard />,
      btnIcon: <CgProfile />}
  };

  return (
    <>
      <div className="bg-secondary h-auto w-full ">
        <ul className="flex justify-between items-center h-[60px] ps-4 pe-4">
          <li>
            <Link to="/">
              <GiTigerHead className="text-primary text-3xl" />
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              to={elementName[pathname].pageLink}
              className="flex items-center me-4"
            >
              {elementName[pathname].iconName}
              {elementName[pathname].pageName}
            </Link>
            {elementName[pathname].btnName && (
              <Link to={elementName[pathname].link}>
                <Button
                  onClick={() => {
                    elementName[pathname].btnName === "Logout" && logOut();
                  }}
                  classAdd="flex items-center justify-center gap-1"
                  btnName={elementName[pathname].btnName}
                  btnIcons={elementName[pathname].btnIcon}
                />
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
