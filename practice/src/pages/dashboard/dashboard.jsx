import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import MyInput from "../../components/input/Input.jsx";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/button/Button.jsx";
const Dashboard = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      select: {},
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  //   const titleValue = watch("title");
  //   console.log(titleValue);
  console.log(errors);

  return (
    <>
      <Navbar />

      <div className="flex justify-center mt-3 flex-col">
        <div className="flex">
          <form
            className="flex flex-col ms-[3%] w-[65%] bg-secondary p-5 rounded-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <MyInput
              names="title"
              controls={control}
              placeholders="title"
              errors="title is required"
              classAdd="mb-2"
              label="Title"
            />
            <MyInput
              names="description"
              controls={control}
              placeholders="description"
              errors="description is required"
              classAdd="mb-2"
              label="Description"
            />
            <MyInput
              names="price"
              controls={control}
              placeholders="price"
              errors="price is required"
              classAdd="mb-2"
              label="Price"
            />
            <Button type="submit" btnName="Submit" classAdd="w-[200px]" />
          </form>
          <div className="w-[30%]">
            <div className="bg-secondary h-[150px] w-[100%] ms-2 me-2">
              <div className="border-2 flex items-center">
                <div className="h-[70px] w-[70px] rounded-full bg-primary"></div>
                <p>User Name</p>
                
              </div>
              <div className="flex justify-center">
              <Button btnName="Show All Card" classAdd="w-[80%] mt-4" />
              </div>
            </div>
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
