import Navbar from "../../components/navbar/Navbar";
import Button from "../../components/button/Button.jsx";
import { Link } from "react-router-dom";
import { MyInput, SelectInput } from "../../components/input/Input.jsx";
import { Row, Col } from "antd";
import { useForm } from "react-hook-form";
import Card from "../../components/card/Card.jsx";
import { useContext } from "react";
import Auth from "../../context/authProvider.jsx";
import Loader from "../../components/loader/Loader.jsx";

// import { useNavigate } from "react-router-dom";
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
  const { isLogin, userData, productList, loading } = useContext(Auth);
  const productotherUser = productList.filter(
    (value) => value.productUserData.userId !== userData.userId
  );
  const isLoginProductData = {
    renderData: userData ? productotherUser : productList,
  };
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
  const onSubmit = async (data) => {
    console.log(data);
    const q = query(
      collection(db, "products"),
      where("category", "==", data.search_category)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };
  // console.log("home page", productList);
  // console.log("home page loading", loading)
  return (
    <>
      <Navbar />
      {loading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
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
              messages={errors}
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
              messages={errors}
              types="text"
            />
          </Col>
          <Col>
            <Button btnName="search" classAdd="mt-1" />
          </Col>
        </Row>
      </form>
      <Row justify={"center"}>
        <Col lg={24} className="flex flex-wrap">
          {isLoginProductData.renderData.map((value, index) => (
            <Card
              onClick={() => {
                navigate(`/single_product?productId=${value.productId}`);
                // console.log("card onclick------->", value.productId);
              }}
              imgAddClass="object-cover"
              key={value?.productId}
              classAdd="w-[18rem] ms-5 mt-5"
              productData={value}
              images={value?.productImage}
              names={value?.title}
              prices={`Rs:${value?.price}`}
              descriptions={`${value?.description?.slice(0, 50)}.......`}
            />
          ))}
        </Col>
      </Row>
    </>
  );
};
export default Home;
