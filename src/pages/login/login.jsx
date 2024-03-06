import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import { MdDashboard } from "react-icons/md";
import { GiTigerHead } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { Row, Col } from "antd";
import { MyInput } from "../../components/input/Input.jsx";
import { Checkbox, Form, Input } from "antd";
import { auth, signInWithEmailAndPassword } from "../../config/firebase.js";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader.jsx";
import { emailRegex } from "../../components/constant/Constant.js";
import { useState } from "react";
import { useContext } from "react";
import Auth from "../../context/UserData.jsx";
const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  // ===========================================
  // ================== context ================
  // ===========================================
  const userAuth = useContext(Auth);
  console.log("user Auth----------> ", userAuth);
  const onFinish = (values) => {
    const { email, password } = values;
    setIsLogin(true);
    console.log(email);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLogin(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login succsessFully",
          showConfirmButton: false,
          timer: 1500,
        });

        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLogin(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: true,
        });
      });
    console.log("Received values of form:", values);

    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Navbar />
      {isLogin && <Loader />}
      <Row className="w-full flex justify-center mt-5">
        <Col
          xs={24}
          lg={9}
          className="h-[480px] flex flex-col justify-center bg-white rounded-md hover:scale-[1.02] duration-500"
        >
          <h1 className="text-center font-bold text-2xl mt-2 text-primary font-sans">
            Login
          </h1>
          <Form
            className="p-8"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <label htmlFor="username">Your Email:</label>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please valid email",
                  pattern: new RegExp(emailRegex),
                },
              ]}
            >
              <Input
                placeholder="email@gmail.com"
                className="border-1 border-primary h-[50px]"
              />
            </Form.Item>
            <label htmlFor="username">Password: </label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "At Least 6 Character",
                  pattern: /(?=.{6,40}$)/,
                },
              ]}
            >
              <Input.Password
                placeholder="•••••••"
                className="border-1 border-primary h-[50px]"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                btnName="submit"
                classAdd="w-[100%] mt-6 h-[100px]"
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Login;
