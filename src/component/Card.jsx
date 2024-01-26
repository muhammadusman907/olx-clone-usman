import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Button from "react-bootstrap/Button";
// import Card from 'react-bootstrap/Card';
import { collection, query, where, getDocs, db } from "../config/firbase.js";
import { useEffect, useState } from "react";
import { getMetadata } from "firebase/storage";

import React from "react";
import { Card } from "antd";
const { Meta } = Card;
function MyCard() {
  const [productList, setProductList] = useState([]);
  const products = [];
  const getProduct = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
      console.log(doc.id, " => ", doc.data());
      setProductList(products);
      // console.log(products);
    });
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
    <div className="flex justify-around">
      {
        // console.log(productList)
      
        productList.map((value, index) => (
          // console.log(value)
          <Card
          className="border-2"
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="example" src={value.ProductImage} />}
            >
            <div><b>Rs : {value.price}</b></div>
            <Meta title={value.productName} description={value.description} />
          </Card>
        ))
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
