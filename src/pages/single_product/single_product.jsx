import React from "react";
import { useContext } from "react";
import Auth from "../../context/UserData.jsx";
import "animate.css";

import {
  RouterProvider,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Row, Col, Rate } from "antd";
import Card from "../../components/card/Card.jsx";
import Button from "../../components/button/Button.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import { FaUser } from "react-icons/fa";

const Single_product = () => {
  const { url, pathname, search } = useLocation();
  const navigate = useNavigate();
  const { productList } = useContext(Auth);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const singleProduct = productList.filter(
    (value) => value.productId === productId
  );
  console.log(singleProduct);
  return (
    <>
      <Navbar />
      <Row className="mt-4 gap-4 bg-white w-[90%] m-auto p-2 my-shadow rounded-[4px]">
        <Col
          md={21}
          lg={14}
          xs={19}
          sm={20}
          className="flex select-none animate__animated animate__fadeIn m-auto"
        >
          <Row className="w-full gap-3 ">
            <Col
              lg={13}
              md={11}
              sm={21}
              className="h-[380px] overflow-hidden my-shadow rounded-[4px] w-full"
            >
              <img
                src={singleProduct[0]?.productImage}
                className="object-contain h-[380px] m-auto hover:scale-105 duration-500"
                alt=""
              />
            </Col>
            <Col lg={9} md={11} sm={21} className="h-fit">
              <div className="h-auto w-full ">
                <p className="text-[1.4rem] font-bold ">{`${singleProduct[0]?.title}`}</p>
                <p className="text-[1.5rem] text-primary font-semibold leading-[30px]">{`Rs. ${singleProduct[0]?.price}`}</p>
              </div>
              <div className=" leading-[30px]">
                <Rate allowHalf defaultValue={5} />
              </div>
              <hr />

              <div className="flex rounded-sm h-auto text-[0.9rem] w-full gap-1">
                <h2 className="text-[1rem] font-semibold h-fit">
                  Description:
                </h2>
                <div className="text-[gray]">{`${singleProduct[0]?.description}`}</div>
              </div>
              <hr />
            </Col>
          </Row>
        </Col>
        <Col
          className="rounded-[4px] my-shadow ms-auto me-auto"
          xs={19}
          sm={20}
          md={21}
          lg={8}
        >
          <div className="p-4 ">
            <div className=" h-[70px] flex items-center">
              <div className=" h-[60px] w-[60px] rounded-full">
                <FaUser className="w-full h-full rounded-full p-1 my-shadow" />
              </div>
              <p className="ms-2">{singleProduct[0]?.productUserData?.email}</p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button btnName="phone number" />
              <Button
                btnName="Chat"
                onClick={() => {
                  localStorage.setItem(
                    "getChatId",
                    singleProduct[0]?.productUserData?.userId
                  );
                  navigate(
                    `/chat?id=${singleProduct[0]?.productUserData?.userId}`
                  );
                }}
              />
            </div>
          </div>
          {/* <div className="h-[130px] my-shadow mt-4">
            <h1>Location</h1>
          </div> */}
        </Col>
      </Row>
    </>
  );
};
export default Single_product;
