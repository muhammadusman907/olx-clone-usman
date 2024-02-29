import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import { MdDashboard } from "react-icons/md";
import { GiTigerHead } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { Row, Col } from "antd";
import { MyInput } from "../../components/input/Input.jsx";
import { Checkbox, Form, Input } from "antd";
import Swal from "sweetalert2";
// ================ fire base ==============
import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  db,
} from "../../config/firebase.js";
import Loader from "../../components/loader/Loader.jsx";
import { emailRegex } from "../../components/constant/Constant.js";
import { useState } from "react";
const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);

  const onFinish = (values) => {
    const { email, password, username } = values;
    setIsLogin(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          email,
          username,
          userId: user.uid,
        });
        await setDoc(doc(db, "chatUser", user.uid), {
          email,
          username,
          userId: user.uid,
        });
        console.log("user signup----------->", user);
        setIsLogin(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register SuccessFully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setIsLogin(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: true,
        });
      });
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
          xs={20}
          sm={16}
          md={12}
          lg={9}
          className="h-[420px] bg-secondary rounded-md"
        >
          <h1 className="text-center font-bold text-2xl mt-2 text-primary font-sans">
            Register
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
            <label htmlFor="username">User Name:</label>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Required User Name",
                },
              ]}
            >
              <Input
                placeholder="your name"
                className="border-1 border-primary"
              />
            </Form.Item>
            <label htmlFor="email">Your Email:</label>
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
                className="border-1 border-primary"
              />
            </Form.Item>
            <label htmlFor="username">Password:</label>
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
                className="border-1 border-primary"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                btnName="submit"
                classAdd="w-[100%] mt-6"
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
