import React, { useState } from "react";
import { useContext } from "react";
import Auth from "../../context/UserData.jsx";
import "animate.css";
import {
  RouterProvider,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Row, Col, Rate, Skeleton, Image } from "antd";
import Card from "../../components/card/Card.jsx";
import Button from "../../components/button/Button.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import { FaUser } from "react-icons/fa";
import Loader from "../../components/loader/Loader.jsx";
import { spinnerFalse } from "../../helper/helper.js";
const Single_product = () => {
  const { url, pathname, search } = useLocation();
  const navigate = useNavigate();
  const { productList, loading } = useContext(Auth);
  const [searchParams] = useSearchParams();
  const [spinner, setSpinner] = useState(true);
  const productId = searchParams.get("productId");
  const singleProduct = productList.filter(
    (value) => value.productId === productId
  );
  // const spinnerFalse = () => {
  //   setSpinner(false);
  // };
  console.log("single product ---->", singleProduct);
  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <Row className="mt-4 bg-white w-[90%] m-auto p-2 my-shadow rounded-[4px]">
        <Col
          md={24}
          lg={16}
          xs={24}
          sm={24}
          className="flex select-none animate__animated animate__fadeIn p-4"
        >
          <Row className="w-full">
            <Col
              lg={12}
              md={12}
              sm={24}
              className="h-[380px] overflow-hidden rounded-[4px] px-3 flex justify-center"
            >
              {spinner && <Loader/>}
              {/* <Image
                className="object-contain h-[380px] hover:scale-105 duration-500 object-top"
                src={singleProduct[0]?.productImage}
                preview={{
                 src: singleProduct[0]?.productImage
                    
                }}
                loading="lazy"
              /> */}

              <img
                src={singleProduct[0]?.productImage}
                className="object-contain h-[380px] hover:scale-105 duration-500 object-top"
                alt=""
                loading="lazy"
                onLoad={ () => spinnerFalse(setSpinner)}
              />
            </Col>
              <Col
                lg={12}
                md={12}
                sm={24}
                className="h-fit px-3 animate__animated animate__fadeIn"
              >
           {singleProduct[0]?.title == undefined ? (
              <Skeleton className=" relative top-0 w-2/3" />
            ) : <> <div className="h-auto w-full ">
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
                </>}
                
              </Col>
            
          </Row>
        </Col>
        <Col
          className="p-4 animate__animated animate__fadeIn"
          xs={24}
          sm={24}
          md={24}
          lg={8}
        >
          <div className="p-3 my-shadow rounded-[4px]">
            <div className=" h-[70px] flex items-center">
              <div className=" h-[60px] w-[60px] rounded-full">
                <FaUser className="w-full h-full rounded-full p-1 my-shadow" />
              </div>
              <p className="ms-2">
                {singleProduct[0]?.productUserData?.email == undefined
                  ? ""
                  : singleProduct[0]?.productUserData?.email}
              </p>
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
