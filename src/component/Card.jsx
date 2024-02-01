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
} from "../config/firbase.js";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMetadata } from "firebase/storage";
import Spinner from "react-bootstrap/Spinner";

import React from "react";
import { Card, Button, Modal } from "antd";
const { Meta } = Card;
function MyCard() {
  const [productList, setProductList] = useState([]);
  const [singlePageClick, setSinglePageClick] = useState(false);
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(true);

  const products = [];
 let userId = "";
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      userId = user.uid;
    }
  });

  const getProduct = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach(async (doc) => {
     
        console.log(doc.id, " => ", doc.data());
        let fireSData = doc.data();
        fireSData.id = doc.id;
        console.log(fireSData);
        products.push(fireSData);
         console.log(userId);
        if (userId) {
          let product = products.filter((value) => value.userName.userId === userId);
          console.log("filter=========>", product)
          setProductList(product);
        } else {
          setProductList(products);
        }
      });
    } catch (error) {
      console.error("Error getting products: ", error);
    } finally {
      setLoading(false);
    }
  };
  const singleProduct = async (singleItemId) => {
    console.log(singleItemId);
    setProductId(singleItemId);
    setSinglePageClick(true);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="flex justify-around flex-wrap">
        {singlePageClick ? (
          <Navigate to={`single-product?id=${productId}`} />
        ) : // console.log(productList)
        loading ? (
          <div className="h-screen w-full flex items-center justify-center ">
            <Spinner animation="grow" variant="primary" />
          </div>
        ) : (
          productList.map((value, index) => (
            <>
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
                  <b className="font-bold text-[18px]">
                    Rs {Intl.NumberFormat().format(+value.price)}
                  </b>
                </div>
                <Meta
                  className="h-[50px] text-black text-[17px] flex items-center lea"
                  description={`${value.description.slice(0, 50)}...`}
                />
                <Meta title={value.productName} />
              </Card>
            </>
          ))
        )}
      </div>
    </>
  );
}

export default MyCard;
