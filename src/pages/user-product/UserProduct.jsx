import Navbar from "../../components/navbar/Navbar";
import { Row, Col } from "antd";
import { Modal } from "antd";
import CAR from "../../assets/images/car.jpg";
import Button from "../../components/button/Button";
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import Auth from "../../context/AuthProvider";
import { db, collection, query, where, getDocs } from "../../config/firebase";
import { useForm } from "react-hook-form";
import {
  MyInput,
  SelectInput,
  UploadInput,
} from "../../components/input/Input";
const UserProduct = () => {
  const { userData } = useContext(Auth);
  const [currentUserProduct, setCurrentUserProduct] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
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
  const getCurrentUserProduct = async () => {
    let product = [];
    const q = query(
      collection(db, "products"),
      where("productUserData.userId", "==", localStorage.getItem("userId"))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      product.push(doc.data());
    });
    setCurrentUserProduct(product);
  };

  useEffect(() => {
    getCurrentUserProduct();
  }, []);
  return (
    <>
      <Navbar />
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        // onOk={() => setModal2Open(false)}
        // onCancel={() => setModal2Open(false)}
      >
        <form
          className="flex flex-col w-full bg-secondary p-5 rounded-md"
          //   onSubmit={handleSubmit(onSubmit)}
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
            //   uploadImageStorage={uploadImage}
              registers={register}
            />
          </div>
          <Button type="submit" btnName="Submit" classAdd="w-[200px] mt-3" />
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
                  onClick={() => setModal2Open(true)}
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
