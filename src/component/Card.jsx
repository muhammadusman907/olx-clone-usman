import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Button from "react-bootstrap/Button";
// import Card from 'react-bootstrap/Card';
import { collection, query, where, getDocs, db } from "../config/firbase.js";
import { useEffect, useState } from "react";
import { getMetadata } from "firebase/storage";
import Spinner from "react-bootstrap/Spinner";

import React from "react";
import { Card } from "antd";
const { Meta } = Card;
function MyCard() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const products = [];
  const getProduct = async () => {
   try {
     const querySnapshot = await getDocs(collection(db, "products"));
     querySnapshot.forEach((doc) => {
       products.push(doc.data());
       console.log(doc.id, " => ", doc.data());
       setProductList(products);
       // console.log(products);
     });
   } catch (error) {
     console.error("Error getting products: ", error);
   } finally {
     setLoading(false); // Set loading to false when data is fetched (success or error)
   }

  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div className="flex justify-around flex-wrap">
        {
          // console.log(productList)
       
   productList.map((value, index) => (
            // console.log(value)
           
      !loading ? <Card key={index}
              className="border-2"
              hoverable
              style={{
                width: 240,
              }}
              cover={
                <img
                  alt="example"
                  src={value.ProductImage}
                  className="width-[100%] h-[150x] object-cover"
                />
              }
            >
              <div>
                <b>Rs : {value.price}</b>
              </div>
              <Meta
                title={value.productName}
                description={`${value.description.slice(0, 50)}...`}
              />
            </Card> :  <Spinner animation="grow" variant="primary" /> 
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
