import { Button, Card, Row, Col } from "antd";
import "./single_product.css";
// import { query } from "firebase/firestore"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import  { Navigate } from "react-router-dom"
import { doc, db, getDoc } from "../config/firbase.js";
import LOGO from "../Images/PROFILE.png";

export const SingleProduct = () => {
  const [searchParams] = useSearchParams();
  const [singleProductItem, setSingleProductItem] = useState({});
  const [chatPageOpen, setChatPageOpen] = useState(false);

  //   ===================================================
  // =================== get single product with fire base
  // =====================================================
  const getSingleProduct = async () => {
    // console.log(searchParams.get("id"))
    const productId = searchParams.get("id");
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //   setSingleProductItem(docSnap.data());
      console.log("Document data:", docSnap.data());
      setSingleProductItem(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  // =================================
  //======================== chat page
  // =================================
  const chatPage = () => {
    setChatPageOpen(true);
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <>
      {chatPageOpen ? 
        <Navigate to={`chat?chat=${searchParams.get("id")}`} />
      :
      <Row className="ms-10 mt-12 me-10">
        <Col span={16}>
          <div className="image-card">
            <Card className="h-[402px] flex justify-center rounded-none my-shadow">
              <img
                src={singleProductItem.ProductImage}
                className="h-[400px] object-contain my-shadow"
                alt="productImage"
              />
            </Card>
          </div>

          <Card className="border-solid my-shadow rounded-none mt-2">
            <h1 className="font-bold">
              Rs {Intl.NumberFormat().format(+singleProductItem.price)}
            </h1>
            <h5 className="font-bold">{singleProductItem.productName}</h5>
          </Card>
          <Card className="my-shadow rounded-none mt-2">
            <h3 className="font-bold">Description</h3>
            <p>{singleProductItem.description}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="my-shadow ms-4">
            <Row align="middle">
              <Col span={5}>
                <div className="w-[60px] h-[60px] rounded-full border-2">
                  <img src={LOGO} alt="" />
                </div>
              </Col>
              <Col span={16}>
                <span className="ps-2 font-bold cursor-pointer">
                  user@gamil.com
                </span>
                <div className="ps-2 font-bold cursor-pointer">
                  see profile{">"}{" "}
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  className="bg-blue-500 w-[100%] rounded-2 mt-3"
                >
                  Show Phone Number
                </Button>
              </Col>
              <Col span={24}>
                <Button className="w-[100%] rounded-2 mt-3" onClick={chatPage}>
                  Chat
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>}
    </>
  );
};
