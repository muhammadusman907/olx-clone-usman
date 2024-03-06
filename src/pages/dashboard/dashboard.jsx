import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import {
  MyInput,
  SelectInput,
  UploadInput,
} from "../../components/input/Input.jsx";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import Card from "../../components/card/Card.jsx";
import CardImage from "../../assets/images/car.jpg";
import { useState } from "react";
import { Row, Col } from "antd";
import Loader from "../../components/loader/Loader.jsx";
import { useContext } from "react";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Auth from "../../context/UserData.jsx";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  addDoc,
  db,
  collection,
  getDoc,
  doc,
} from "../../config/firebase.js";
// import Map from "../../components/map/Map.jsx";

const storage = getStorage();
const Dashboard = () => {
  const { userData } = useContext(Auth);
  const [cardData, setCardData] = useState({});
  const [ImageUrl, setImageUrl] = useState();
  const [loader, setLoader] = useState(false);

  console.log("dashboard", userData);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  console.log(errors);

  const uploadImage = (file) => {
    setLoader(true);
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      //Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            setLoader(false);
            console.log("File available at", downloadURL);
          });
        }
      );
    });
  };
  const onSubmit = async (data) => {
    setLoader(true);
    console.log(ImageUrl);
    console.log(data);
    const docRef = await addDoc(collection(db, "products"), {
      ...data,
      productImage: ImageUrl,
      productUserData: { ...userData },
    });

    // ===================
    //  fire base add data
    // ===================

    setLoader(false);

    reset();
  };
  return (
    <>
      {/* {console.log("card data ------------>", cardData)} */}

      <Navbar />
      {loader && <Loader />}
      <Row className="mt-3 w-full gap-2 justify-around md:flex-col-reverse md:items-center">
        <Col className="flex w-full" lg={13} md={13} sm={22} xs={22}>
          <form
            className="flex flex-col w-full bg-white p-5 rounded-[4px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-[1.2rem] font-bold text-center">
              Post Your Product
            </h1>
            <MyInput
              names="title"
              controls={control}
              placeholders="title"
              errors="title is required"
              classAdd="mb-2  h-[45px]"
              label="Title"
              types="text"
              messages={errors}
            />
            <MyInput
              names="description"
              controls={control}
              placeholders="description"
              errors="description is required"
              classAdd="mb-2 h-[45px]"
              label="Description"
              types="text"
              messages={errors}
            />
            <MyInput
              names="price"
              controls={control}
              placeholders="price"
              errors="price is required"
              classAdd="mb-2 h-[45px]"
              label="Price"
              types="text"
              messages={errors}
            />
            <SelectInput
              names="category"
              controls={control}
              placeholders="Category"
              errors="category is required"
              classAdd="mb-2 h-[45px]"
              label="Category"
              messages={errors}
            />
            <div>
              <UploadInput
                names="image"
                controls={control}
                placeholders="price"
                errors="image is required"
                classAdd="mb-2 h-[45px]"
                label="Product Image"
                types="file"
                uploadImageStorage={uploadImage}
                registers={register}
              />
            </div>
            <Button type="submit" btnName="Submit" classAdd="w-[200px] mt-3" />
          </form>
        </Col>
        {/*
          //    ============================================= 
           =================== USER INFORMATION =====================
                ============================================== // */}
        <Col lg={6} md={7} sm={22} xs={22} className="w-full">
          <div className="w-full">
            <div className="bg-white h-[150px] w-[100%] me-2 p-3 rounded-[4px]">
              <div className="flex items-center h-[70px]">
                <div className="h-[60px] w-[60px] rounded-full bg-primary ">
                  <img
                    className="h-[60px] w-[60px] rounded-full object-cover"
                    src={userData?.photoUrl ? userData?.photoUrl : CardImage}
                    alt=""
                  />
                </div>
                <p className="ps-2 font-bold">{userData.username}</p>
              </div>
              <div className="">
                <Button
                  btnName="Show my prorduct"
                  classAdd="w-[80%] mt-4"
                  onClick={() => navigate("/user-product")}
                />
              </div>
            </div>
            {/*
          //    ============================================= 
                =================== CARD =====================
                ============================================== // */}
            {/* <Card classAdd="bg-secondary mt-3 w-[100%] h-[300px] md:hidden" />/ */}
          </div>
          {/* <Map/> */}
        </Col>
      </Row>
    </>
  );
};
export default Dashboard;
