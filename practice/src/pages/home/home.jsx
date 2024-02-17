import Navbar from "../../components/navbar/Navbar";
import Button from "../../components/button/Button.jsx";
import { Link } from "react-router-dom";
import { MyInput, SelectInput } from "../../components/input/Input.jsx";
import { Row, Col } from "antd";
import { useForm } from "react-hook-form";
import Card from "../../components/card/Card.jsx";
import { useContext } from "react";
import Auth from "../../context/AuthProvider.jsx";
import Loader from "../../components/loader/Loader.jsx";
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
  const { isLogin, userData, productList, loading } = useContext(Auth);
  const { control } = useForm({
    defaultValues: {
      firstName: "",
      select: {},
    },
  });
  console.log("home page", productList);
  console.log("home page loading", loading);

  return (
    <>
      <Navbar />
      {loading && <Loader />}
      <Row className="gap-3 p-3">
        <Col lg={10} className="ps-4">
          <MyInput
            names="search_category"
            controls={control}
            placeholders="search"
            errors="search is required"
            classAdd="h-[45px]"
            label=""
            types="text"
          />
        </Col>
        <Col lg={10}>
          <SelectInput
            names="select_category"
            controls={control}
            placeholders="Select"
            errors="select is required"
            classAdd="h-[45px]"
            label=""
            types="text"
          />
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col lg={24} className="flex flex-wrap">
          {productList.map((value , ) => (
            <Card key={value.userId} classAdd="w-[18rem] ms-5 mt-5" productData={value} />
          ))}
          {/* <Card classAdd="w-[23%] ms-5 mt-5" />
          <Card classAdd="w-[23%] ms-5 mt-5" />
          <Card classAdd="w-[23%] ms-5 mt-5" />
          <Card classAdd="w-[23%] ms-5 mt-5" />
          <Card classAdd="w-[23%] ms-5 mt-5" />
          <Card classAdd="w-[23%] ms-5 mt-5" />
          <Card classAdd="w-[23%] ms-5 mt-5" />
          <Card classAdd="w-[23%] ms-5 mt-5" />
          <Card classAdd="w-[23%] ms-5 mt-5" />
          <Card classAdd="w-[23%] ms-5 mt-5" /> */}
        </Col>
      </Row>
    </>
  );
};
export default Home;
