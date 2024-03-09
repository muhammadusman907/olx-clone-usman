import Navbar from "../../components/navbar/Navbar";
import Button from "../../components/button/Button.jsx";
import { Link } from "react-router-dom";
import { MyInput, SelectInput } from "../../components/input/Input.jsx";
import { Row, Col, Carousel } from "antd";
import { useForm } from "react-hook-form";
import Card from "../../components/card/Card.jsx";
import { useContext, useEffect, useState } from "react";
import Auth from "../../context/UserData.jsx";
import Loader from "../../components/loader/Loader.jsx";
import { spinnerFalse } from "../../helper/helper.js";
import "animate.css";
import CARIMAGE from "../../assets/images/slider.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  db,
  getDoc,
  onAuthStateChanged,
  auth,
} from "../../config/firebase.js";
const Home = () => {
  // ********************
  // get data context api
  const { isLogin, userData, productList, loading, allProducts } =
    useContext(Auth);
  const [filterData, setFilterData] = useState([]);
  const margeArr = [...productList, ...allProducts];
  const productotherUser = margeArr.filter(
    (value) => value.productUserData.userId !== userData.userId
  );
  const isLoginProductData = {
    renderData: userData ? productotherUser : allProducts,
  };
  // ***********************
  // ------- image spinner
  const [spinner, setSpinner] = useState(true);
  let optionArr = [];

  // console.log("other user data ----> ", productotherUser);

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      select: {},
    },
  });
  console.log(errors);
  const onSubmit = (data) => {
    console.log({ data });
    const renderData = isLoginProductData.renderData.filter((value, index) => {
      return value.category === data.select_category;
    });
    console.log({ renderData });
    setFilterData(renderData);
    //   const q = query(
    //     collection(db, "products"),
    //     where("category", "==", data.search_category)
    //   );
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     // console.log(doc.id, " => ", doc.data());
    //   });
  };
  // const contentStyle = {
  //   height: "160px",
  //   color: "#fff",
  //   lineHeight: "160px",
  //   textAlign: "center",
  //   background: "#000",
  // };
  // console.log("home page", productList);
  // console.log("home page loading", loading)
  return (
    <>
      <Navbar />
      {loading && <Loader />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Row justify={"center"} className="p-3 h-[60px] sticky ">
          {/* <Col lg={10} md={10} sm={10} xs={10} className="">
            <MyInput
              names="search_category"
              controls={control}
              placeholders="Search"
              errors="search is required"
              classAdd="h-[37.2px] border border-r-none "
              label=""
              types="text"
              messages={errors}
            />
          </Col> */}
          <Col lg={10} md={10} sm={10} xs={20}>
            <SelectInput
              names="select_category"
              controls={control}
              placeholders="Search Category"
              errors="select is required"
              classAdd="h-[37.2px]"
              className=" outline-none"
              label=""
              messages={errors}
              types="text"
              option={isLoginProductData}
            />
          </Col>
          <Col>
            <Button btnName="Search" classAdd=" rounded-l-none" />
          </Col>
        </Row>
      </form>
      <Row className="w-full justify-center">
        <Col lg={22} md={22} sm={22} xm={22} className="px-4">
          <Carousel autoplay>
            <div className=" h-fit">
              <img src={CARIMAGE} alt="" className=" " />
            </div>
            <div className=" h-fit">
              <img src={CARIMAGE} alt="" className="" />
            </div>
          </Carousel>
        </Col>
      </Row>

      <Row>
        <Col lg={24} className="">
          <Row className="w-[90%] m-auto">
            {console.log({ filterData })}
            {(filterData.length == 0
              ? isLoginProductData.renderData
              : filterData
            ).map((value, index) => {
              return (
                <Col
                  lg={6}
                  md={8}
                  sm={12}
                  xs={24}
                  className="p-2 "
                  key={value.productId}
                >
                  <Card
                    onClick={() => {
                      navigate(`/single_product?productId=${value.productId}`);
                      // console.log("card onclick------->", value.productId);
                    }}
                    imgAddClass="object-contain hover:scale-[1.1] duration-500"
                    key={value?.productId}
                    classAdd={`w-full ${
                      !loading && "animate__animated animate__fadeIn"
                    } `}
                    productData={value}
                    onLoads={() => spinnerFalse(setSpinner)}
                    imageLoading={spinner}
                    images={value?.productImage}
                    names={value?.title.slice(0, 25)}
                    prices={`Rs ${value?.price}`}
                    descriptions={`${value?.description?.slice(0, 25)}`}
                    ratings={value?.rating?.rate}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default Home;
