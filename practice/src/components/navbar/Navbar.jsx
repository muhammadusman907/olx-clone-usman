import { Link, useLocation } from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import { MdDashboard } from "react-icons/md";
import { GiTigerHead } from "react-icons/gi";
import { IoHomeSharp } from "react-icons/io5";
const Navbar = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  const elementName = {
    "/": {
      btnName: "login",
      link: "/login",
      pageName: "Dashboard",
      pageLink: "/dashboard",
      iconName: <IoHomeSharp />,
    },
    "/login": { btnName: "SignUp", link: "/signup" },
    "/dashboard": {
      btnName: "Profile",
      link: "profile",
      pageName: "Home",
      pageLink: "/",
      iconName: <MdDashboard />,
    },
    "/signup": { btnName: "Login", link: "/login" },
  };

  return (
    <>
      <div className="bg-secondary h-auto w-full ">
        <ul className="flex justify-between items-center h-[60px] ps-4 pe-4">
          <li>
            <GiTigerHead className="text-primary text-3xl" />
          </li>
          <li className="flex items-center">
            <Link
              to={elementName[pathname].pageLink}
              className="flex items-center me-4"
            >
              {elementName[pathname].iconName}
              {elementName[pathname].pageName}
            </Link>
            <Link to={elementName[pathname].link}>
              <Button btnName={elementName[pathname].btnName} />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
