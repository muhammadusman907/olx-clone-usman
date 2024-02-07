import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import { MdDashboard} from "react-icons/md";
import { GiTigerHead } from "react-icons/gi";
// import LOGO from "../../assets/images/logo.png"

const Login = () => {
  return (
    <>
    <Navbar/>
      {/* <Navbar>
        <ul className="flex justify-between items-center h-[60px] ps-4 pe-4">
          <li >
              <GiTigerHead className="text-primary text-3xl"/>
          </li>
          <li className="flex items-center">
              <Link to="dashboard" className="flex items-center me-4">
              <MdDashboard  /> Dashboard
              </Link>
            <Link to="signup">
              <Button btnName="signup" />
            </Link>
          </li>
        </ul>
      </Navbar> */}
    </>
  );
};
export default Login;
