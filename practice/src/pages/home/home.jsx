import Navbar from "../../components/navbar/Navbar";
import Button from "../../components/button/Button.jsx";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GiTigerHead } from "react-icons/gi";

const Home = () => {
  return (
    <>
      <Navbar>
        <ul className="flex justify-between items-center h-[60px] ps-4 pe-4">
          <li>
            <GiTigerHead className="text-primary text-3xl" />
          </li>
          <li className="flex items-center">
            <Link to="dashboard" className="flex items-center me-4">
              <MdDashboard /> Dashboard
            </Link>
            <Link to="signup">
              <Button btnName="signup" />
            </Link>
          </li>
        </ul>
      </Navbar>
      {/* <Navbar>
        <ul className="flex justify-around items-center h-[60px]">
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/login">
              <Button btnName="Login" />
            </Link>
          </li>
        </ul>
      </Navbar> */}
    </>
  );
};
export default Home;
