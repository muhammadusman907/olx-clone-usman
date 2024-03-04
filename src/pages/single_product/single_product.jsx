import React from "react";
import { useContext } from "react";
import Auth from "../../context/AuthProvider.jsx";
import {
  RouterProvider,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Row, Col } from "antd";
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
      <Row className="mt-4 gap-4">
        <Col lg={14} className="h-[80vh] ms-12 select-none">
          <div className="">
            <Card
              classAdd="w-[100%] h-[250px] my-shadow"
              images={singleProduct[0]?.productImage}
              imgAddClass="object-contain  h-[250px]"
              //
              // prices={singleProduct[0]?.price}
              // descriptions={singleProduct[0]?.description}
            />
            {/* <Card names={singleProduct[0]?.productName}/> */}
          </div>
          <div className="h-auto mt-2 p-2 my-shadow font-bold text-[1.6rem] w-full rounded-sm">
            <p>{`RS: ${singleProduct[0]?.price}`}</p>
            <p className="text-[1.2rem] ">{`${singleProduct[0]?.title}`}</p>
          </div>
          <div className="rounded-sm h-auto mt-2 p-2 my-shadow text-[0.9rem] w-full">
            <h2 className="text-[1.5rem] font-bold">Description:</h2>
            {`${singleProduct[0]?.description}`}
          </div>
        </Col>
        <Col className=" rounded-sm" lg={8}>
          <div className="my-shadow p-4 ">
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
          <div className="h-[130px] my-shadow mt-4">
            <h1>Location</h1>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Single_product;
