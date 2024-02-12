import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import { MdDashboard} from "react-icons/md";
import { GiTigerHead } from "react-icons/gi";
import  {Row , Col} from "antd"
// import LOGO from "../../assets/images/logo.png"

const Login = () => {
  return (
    <>
      <Navbar />
      <Row className=" w-full">
        <Col xs={24} xl={8} className="border-2 h-20">
          One of three columns
        </Col>
        <Col xs={24} xl={8} className="border-2 h-20">
          One of three columns
        </Col>
        <Col xs={24} xl={8} className="border-2 h-20">
          One of three columns
        </Col>
        <Col xs={24} xl={8} className="border-2 h-20">
          One of three columns
        </Col>
      </Row>
    </>
  );
};
export default Login;
