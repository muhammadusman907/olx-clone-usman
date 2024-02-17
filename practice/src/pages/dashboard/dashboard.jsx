import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import { MyInput, SelectInput, UploadInput } from "../../components/input/Input.jsx";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import Card from "../../components/card/Card.jsx";
import CardImage from "../../assets/images/car.jpg";
import { useState } from "react";
import { Row , Col } from "antd" ;

const Dashboard = () => {
  const [cardData, setCardData] = useState({});
  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      select: {},
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    console.log(data.image.file.originFileObj);
    const urls = URL.createObjectURL(data.image.file.originFileObj);
    let copyData = data ;
    copyData.photoUrl = urls ;
    setCardData(copyData) ;
    reset();
  };
  //   const titleValue = watch("title");
  //   console.log(titleValue);
  // console.log(errors);

  return (
    <>
      {/* {console.log("card data ------------>", cardData)} */}

      <Navbar />

      <Row className="mt-3 w-full gap-5 justify-around md:flex-col-reverse md:items-center">
        <Col className="flex border-2" lg={13} md={18} sm={20} xs={22}>
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
              registers={register}
            />
            <MyInput
              names="description"
              controls={control}
              placeholders="description"
              errors="description is required"
              classAdd="mb-2 h-[45px]"
              label="Description"
              types="text"
              registers={register}
            />
            <MyInput
              names="price"
              controls={control}
              placeholders="price"
              errors="price is required"
              classAdd="mb-2 h-[45px]"
              label="Price"
              types="text"
              registers={register}
            />
            <SelectInput
              names="select"
              controls={control}
              placeholders="Select"
              errors="category is required"
              classAdd="mb-2 h-[45px]"
              label="Category"
            
            />
            <div>
              <UploadInput
                names="image"
                controls={control}
                placeholders="price"
                errors="image is required"
                classAdd="mb-2 h-[45px]"
                label="Product Image"
                types="text"
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
        <Col lg={9} md={18} sm={20} xs={22}>
          <div className="w-full border-2">
            <div className="bg-secondary h-[150px] w-[100%] me-2 p-5">
              <div className="flex items-center h-[70px]">
                <div className="h-[60px] w-[60px] rounded-full bg-primary mt-4">
                  <img
                    className="h-[60px] w-[60px] rounded-full object-cover"
                    src={CardImage}
                    alt=""
                  />
                </div>
                <p className="ps-2">User Name</p>
              </div>
              <div className="">
                <Button btnName="Show All Card" classAdd="w-[80%] mt-4" />
              </div>
            </div>
            {/*
          //    ============================================= 
                =================== CARD =====================
                ============================================== // */}
            <Card classAdd="bg-secondary mt-3 w-[100%] h-[300px] md:hidden" />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Dashboard;
{
  /* <Controller
          name="title" // Specify the field name
          control={control} // Pass control prop
          rules={{ required: "title is required" }}
          render={({ field }) => (
            <MyInput {...field} placeholder="Tittle" className="w-[80%]" />
          )}
        />
        <Controller
          name="description" // Specify the field name
          control={control} // Pass control prop
          rules={{ required: "description is required" }}
          render={({ field }) => (
            <MyInput {...field} placeholder="description" className="w-[80%]" />
          )}
        />
        <Controller
          name="Price" // Specify the field name
          control={control} // Pass control prop
          rules={{ required: "Price is required" }}
          render={({ field }) => (
            <MyInput {...field} placeholder="price" className="w-[80%]" />
          )}
        />
        <Controller
          name="upload" // Specify the field name
          control={control} // Pass control prop
          rules={{ required: "image is required" }}
          render={({ field }) => (
            <MyInput {...field} placeholder="image" className="w-[80%]" />
          )}
        />
        
        <Button type="submit" btnName="submit" />  */
}
