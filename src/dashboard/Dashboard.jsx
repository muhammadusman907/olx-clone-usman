import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, InputNumber, Space } from "antd";
import Spinner from "react-bootstrap/Spinner";

import { MyNavbar } from "../component/Navbar.jsx";
import "./dashborad.css";
// const {TextArea} = Input ;
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  storage,
  auth,
} from "../config/firbase.js";
import {db, collection, addDoc, getDoc ,doc  } from "../config/firbase.js";
import TextArea from "antd/es/input/TextArea.js";
export const Dashbord = () => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [fileValue, setFileValue] = useState();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const getPriceValue = (priceValue) => {
    console.log(priceValue);
    setPrice(priceValue);
  };
  //  =====================================
  //  add onclick and all values get button
  //  ====================================
  console.log(auth.currentUser.uid);
  const onFinish = async () => {
    setLoading(true);
    console.log(productName);
    console.log("price", price);
    console.log("description ", description);
    console.log(fileValue);
    const userRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data()); 
      
    const docRef = await addDoc(collection(db, "products"), {
      productName,
      price,
      description,
      ProductImage: fileValue,
      userName: docSnap.data(),
    });
     console.log("Document written with ID: ", docRef.id);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    // ===================
    //  fire base add data
    // ===================
    setProductName(() => "");
    setPrice(() => "");
    setDescription(() => "");
    console.log("1", productName);
    console.log("2", price);
    console.log("4", description);
    setLoading(false);
  };
  //   ============================
  //   fire base storage download url button
  //   ============================
  const imageUrl = (file) => {
  
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
            setFileValue(downloadURL);
            setLoading(true)
          });
        }
      );
    });
  };

  return (
    <>
      {/* <MyNavbar/> */}
      {/* =========================
            ======== heading ========  */}
      <h2 className="text-center mt-2"> Post Your Add</h2>
     (

        <div className="flex justify-center">
          {/* ============================= 
         ======== Tittle Input ==========   */}
          <Form className="w-[70%] border-2 p-10">
            <Form.Item label="Title">
              <Input
                placeholder="Tittle"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Item>

            {/* ============================= 
         ======== Price Input ==========   */}
            <Form.Item label="Price" className="w-[100%]">
              <Space>
                <InputNumber
                  className="w-[100%] "
                  value={price}
                  placeholder="price"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={getPriceValue}
                />
              </Space>
            </Form.Item>
            {/* ============================= 
         ======== description Input ==========   */}
            <Form.Item label="Description">
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>
            {/* ============================= 
         ======== product Image Input ==========   */}
            <Form.Item
              label="Product Image"
              valuePropName="fileList"
              onChange={(e) => imageUrl(e.target.files[0])}
            >
              <Upload action="/upload.do" listType="picture-card">
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item>
            <Form.Item>
              {/* ============================= 
         ======== post Button ==========   */}
              <Button
                htmlType="submit"
                type="primary"
                className="bg-blue-500 w-[100%] h-10"
                disabled = {!loading}
                onClick={onFinish}
              >
                Post Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      )
    </>
  );
};
