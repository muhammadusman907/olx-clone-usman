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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center mt-3 flex-col "
      >
        <Controller
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
        
        <Button type="submit" btnName="submit" />
      </form>
    </>
  );
};
export default Dashboard;
