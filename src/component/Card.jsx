// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import Button from "react-bootstrap/Button";
// import Card from 'react-bootstrap/Card';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  db,
  getDoc,
} from "../config/firbase.js";
import {Navigate }from "react-router-dom"
import { useEffect, useState } from "react";
import { getMetadata } from "firebase/storage";
import Spinner from "react-bootstrap/Spinner";

import React from "react";
import { Card, Button, Modal } from "antd";
const { Meta } = Card;
function MyCard() {
  const [productList, setProductList] = useState([]);
  const [singleProductIem, setSingleProductItem] = useState({});
  const [singlePageClick, setSinglePageClick] = useState(false);
  const [loading, setLoading] = useState(true);
  const products = [];
  const getProduct = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        // products.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
        let fireSData = doc.data();
        fireSData.id = doc.id;
        console.log(fireSData);
        products.push(fireSData);
        setProductList(products);
      });
    } catch (error) {
      console.error("Error getting products: ", error);
    } finally {
      setLoading(false);
    }
  };
  const singleProduct = async (singleItemId) => {
    console.log(singleItemId);
     setSinglePageClick(true);
    // const docRef = doc(db, "products", singleItemId);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   setSingleProductItem(docSnap.data());
    //   console.log("Document data:", docSnap.data());
    //   setSingleProductItem(docSnap.data());
    //   showModal();
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  };
  useEffect(() => {
    getProduct();
  }, []);
  // =============================
  // ================ modal ======
  // =============================
  // const [open, setOpen] = useState(false);
  // const showModal = () => {
  //   setOpen(true);
  // };
  // const handleOk = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setOpen(false);
  //   }, 3000);
  // };
  // const handleCancel = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <div className="flex justify-around flex-wrap">
        {singlePageClick ?<Navigate to={`single-product${""}`}   />
        :
          // console.log(productList)
          loading ? (
            <div className="h-screen w-full flex items-center justify-center ">
              <Spinner animation="grow" variant="primary" />
            </div>
          ) : (
            productList.map((value, index) => (
              // console.log(value)
              <>
                {/* <Button type="primary" onClick={}>
                  Open Modal with customized footer
                </Button> */}
                {/* <Modal
                  className="p-0"
                  open={open}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[
                    <Button
                      key="back"
                      type="primary"
                      className="bg-blue-500 "
                      onClick={handleCancel}
                    >
                      chat
                    </Button>,

                    <Button
                      className="bg-blue-500 mb-3 me-2"
                      type="primary"
                      loading={loading}
                      onClick={handleOk}
                    >
                      add to favorite
                    </Button>,
                  ]}
                >
                  <Card
                    className="space-around"
                    style={{
                      width: "100%",
                      height: "300px",
                    }}
                    cover={
                      <img
                        alt="example"
                        src={singleProductIem.ProductImage}
                        className="h-[100px] w-[200px] object-cover"
                        style={{
                          height: "200px",
                        }}
                      />
                    }
                  >
                    <div className="font-bold">
                      RS : {singleProductIem.price}
                    </div>
                    <Meta
                      style={{}}
                      title={singleProductIem.productName}
                      description={
                        singleProductIem.description &&
                        ` ${singleProductIem.description.slice(0, 60)}...`
                      }
                    />
                  </Card>
                </Modal> */}

                <Card
                  key={index}
                  onClick={() => singleProduct(value.id)}
                  className="border-2 mt-2"
                  hoverable
                  style={{
                    width: "300px",
                    height: "314px",
                  }}
                  cover={
                    <img
                      alt="example"
                      src={value.ProductImage}
                      className="width-[100%] h-[134px] object-cover border-b-2"
                    />
                  }
                >
                  <div>
                    <b
                      className="font-bold text-[18px]"
                    >
                      Rs {Intl.NumberFormat().format(+value.price)}
                    </b>
                  </div>
                  <Meta className="h-[50px] text-black text-[17px] flex items-center lea" 
                  description={`${value.description.slice(0, 50)}...`} />
                  <Meta title={value.productName} />
                </Card>
              </>
            ))
          )
        }
      </div>
    </>
  );
}

export default MyCard;

//
//export const MyCard = () => (
//
// );
// import React, { useState } from 'react';
// import { Button, Modal } from 'antd';
// const App = () => {
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const showModal = () => {
//     setOpen(true);
//   };
//   const handleOk = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setOpen(false);
//     }, 3000);
//   };
//   const handleCancel = () => {
//     setOpen(false);
//   };
//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Open Modal with customized footer
//       </Button>
//       <Modal
//         open={open}
//         title="Title"
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>
//             Return
//           </Button>,
//           <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
//             Submit
//           </Button>,
//           <Button
//             key="link"
//             href="https://google.com"
//             type="primary"
//             loading={loading}
//             onClick={handleOk}
//           >
//             Search on Google
//           </Button>,
//         ]}
//       >
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//       </Modal>
//     </>
//   );
// };
// export default App;
