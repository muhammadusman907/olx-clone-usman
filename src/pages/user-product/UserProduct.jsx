import Navbar from "../../components/navbar/Navbar";
import { Row, Col } from "antd";
import { Modal } from "antd";
import CAR from "../../assets/images/car.jpg";
import Button from "../../components/button/Button";
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import Auth from "../../context/AuthProvider";
import Swal from "sweetalert2";

import {
  db,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  storage,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "../../config/firebase";
import { useForm } from "react-hook-form";
import {
  MyInput,
  SelectInput,
  UploadInput,
} from "../../components/input/Input";
import Loader from "../../components/loader/Loader";
const UserProduct = () => {
  const { userData } = useContext(Auth);
  const [currentUserProduct, setCurrentUserProduct] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const [ImageUrl, setImageUrl] = useState();
  const [loader, setLoader] = useState(false);
  const [updateProductId, setUpdateProductId] = useState("");
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
  // update product fuction
console.log(updateProductId);
  const uploadImage = (file) => {
    setLoader(true);
    return new Promise((resolve, reject) => {
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
          // ******************************************************************
          // <-------- url upload hona ka baad download url mila ga -------->
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
    // const docRef = await addDoc(collection(db, "products",), {});
    const productRef = doc(db, "products",updateProductId);
    await updateDoc(productRef, {
      ...data,
      productImage: ImageUrl,
      productUserData: { ...userData },
    });
    setLoader(false);
    reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "update SuccessFully",
        showConfirmButton: false,
        timer: 1500,
      });
    setModal2Open(false);
  };

  // *************************************//
  // <---------- get product -----------> //

  const getCurrentUserProduct = async () => {
    let product = [];
    const q = query(
      collection(db, "products"),
      where("productUserData.userId", "==", localStorage.getItem("userId"))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      product.push({ ...doc.data(), userId: doc.id });
    });
    setCurrentUserProduct(product);
  };

  useEffect(() => {
    getCurrentUserProduct();
  }, []);
  return (
    <>
      <Navbar />
      {loader && <Loader />}
      <Modal
        maskClosable={false}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        title="Update your product"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <form
          className="flex flex-col w-full bg-secondary p-5 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <Button type="submit" btnName="Update" classAdd="w-[200px] mt-3" />
        </form>
      </Modal>
      <Row>
        <Col lg={24} className="">
          <h1 className="text-center font-bold text-[1.5rem]">
            Manage Your Card
          </h1>
          {currentUserProduct.map((value) => (
            // console.log(value);
            <div
              className="my-shadow h-22 m-auto  w-[80%] mt-2 h-[120px] flex items-center p-2 justify-between"
              key={value.userId}
            >
              <div className="flex">
                <div className="">
                  <img
                    src={value.productImage}
                    alt=""
                    className="h-[100px] w-[100px] object-cover"
                  />
                </div>
                <div className="ms-4 flex flex-col justify-end">
                  <p className="font-bold text-[2rem]">{value.title}</p>
                  <p className="font-bold">Rs: {value.price}</p>
                  <p className="font-bold">Description: {value.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button btnIcons={<AiFillDelete />} classAdd="bg-[#df1717]" />
                <Button
                  btnIcons={<MdEditSquare />}
                  onClick={() => {
                    setModal2Open(true);
                    setUpdateProductId(value.userId);
                  }}
                />
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};
export default UserProduct;

//  <>
//       <Button type="primary" onClick={() => setModal2Open(true)}>
//         Vertically centered modal dialog
//       </Button>
//       <Modal
//         title="Vertically centered modal dialog"
//         centered
//         open={modal2Open}
//         onOk={() => setModal2Open(false)}
//         onCancel={() => setModal2Open(false)}
//       >
//         <p>some contents...</p>
//         <p>some contents...</p>
//         <p>some contents...</p>
//       </Modal>
//       </>
