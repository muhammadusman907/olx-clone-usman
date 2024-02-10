import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import { MyInput, UploadInput } from "../../components/input/Input.jsx";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import Card from "../../components/card/Card.jsx";
import CardImage from "../../assets/images/car.jpg";
import { useState } from "react";

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
  console.log(errors);

  return (
    <>
    {console.log("card data ------------>", cardData)}

      <Navbar />

      <div className="flex justify-center mt-3 flex-col w-full">
        <div className="flex">
          <form
            className="flex flex-col ms-[2%] w-[70%] bg-secondary p-5 rounded-md"
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
            <div >
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
          <div className="w-[30%] ms-3">
            <div className="bg-secondary h-[150px] w-[100%]  me-2">
              <div className="border-2 flex items-center">
                <div className="h-[60px] w-[60px] rounded-full bg-primary">
                  <img
                    className="h-[60px] w-[60px] rounded-full object-cover"
                    src={CardImage}
                    alt=""
                  />
                </div>
                <p>User Name</p>
              </div>
              <div className="flex justify-center">
                <Button btnName="Show All Card" classAdd="w-[80%] mt-4 " />
              </div>
            </div>
            <Card classAdd="bg-secondary mt-3 w-[300px] h-[300px]" 
            
            />
          </div>
        </div>
      </div>
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
