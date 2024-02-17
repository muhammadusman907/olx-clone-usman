import { MyInput } from "../../components/input/Input.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import { Row, Col } from "antd";
import { useForm } from "react-hook-form";
import CAR from "../../assets/images/car.jpg";
import { FaUserEdit } from "react-icons/fa";
import { useRef } from "react";
const Profile = () => {
  const { control } = useForm();
  const ref = useRef();

  const edit = () => {
    console.log(ref.current);
    ref.current.click();
  };
  return (
    <>
      <Navbar />

      <Row justify={"center"} className="mt-6">
        <Col
          className=" bg-secondary p-8 rounded-md"
          xs={22}
          sm={18}
          md={16}
          lg={14}
        >
          <Row justify={"center"}>
            <Col className=" relative">
              <img
                src={CAR}
                className="h-[160px] shadow-md w-[160px] rounded-full object-cover"
                alt=""
              />
              <FaUserEdit
                onClick={edit}
                className="rounded-full bg-secondary p-1 shadow-lg cursor-pointer
              text-primary absolute right-1 bottom-4 text-3xl"
              />
              <input type="file" ref={ref} id="file" className="hidden" />
            </Col>
          </Row>
          <Row justify={"center"} className="mt-5">
            <Col sm={20} lg={20} xs={24}>
              <MyInput
                names="username"
                controls={control}
                placeholders="user Name"
                errors="name is required"
                classAdd="mb-2  h-[45px]"
                label="Your Name"
                types="text"
                disabled={true}
              />
              <MyInput
                names="email"
                controls={control}
                placeholders="email@gmail.com"
                errors="email is required"
                classAdd="mb-2  h-[45px]"
                label="Your Email"
                types="text"
                disabled={true}
              />
              <MyInput
                names="password"
                controls={control}
                placeholders="•••••••"
                errors="password is required"
                classAdd="mb-2  h-[45px]"
                label="Your password"
                types="password"
                disabled={true}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
