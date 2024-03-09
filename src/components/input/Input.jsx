import React from "react";
import { Input, Button, Upload, Select } from "antd";
import { Controller } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";

const MyInput = ({
  controls,
  placeholders,
  names,
  errors,
  classAdd,
  label,
  registers,
  types,
  messages,
  disabled,
  defaultValue,
}) => {
  // console.log(messages[names]);
  // console.log(names);
  // console.log("messages ---------------->", messages);
  return (
    <>
      {label && <label htmlFor={names}>{label}: </label>}
      <div className="text-[red]">{messages && messages[names]?.message}</div>
      <Controller
        name={names} // Specify the field name
        control={controls} // Pass control prop
        rules={{ required: errors }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            disabled={disabled}
            type={types}
            {...field}
            placeholder={placeholders}
            className={`w-[100%] ${classAdd} border-2 `}
            status={messages && messages[names]?.message && "error"}
          />
        )}
      />
    </>
  );
};
const SelectInput = ({
  controls,
  placeholders,
  names,
  errors,
  classAdd,
  label,
  registers,
  types,
  messages,
}) => {
  //  console.log(messages);
  return (
    <>
      {label && <label htmlFor={names}>{label}:</label>}
      <div className="text-[red]">{}</div>
      <Controller
        name={names} // Specify the field name
        control={controls} // Pass control prop
        rules={{ required: errors }}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={placeholders}
            className={`w-[100%] rounded-lg ${classAdd} bg-white `}
            options={[
              {
                label: "Car",
                value: "car",
              },
              {
                label: "Electronics",
                value: "electronics",
              },
              {
                label: "Clothing",
                value: "clothing",
              },
              {
                label: "Home Appliances",
                value: "home_appliances",
              },
              {
                label: "Furniture",
                value: "furniture",
              },
              {
                label: "Beauty and Personal Care",
                value: "beauty_personal_care",
              },
              {
                label: "Sports and Outdoors",
                value: "sports_outdoors",
              },
              {
                label: "Books and Literature",
                value: "books_literature",
              },
              {
                label: "Toys and Games",
                value: "toys_games",
              },
              {
                label: "Health and Wellness",
                value: "health_wellness",
              },
            ]}
          />
        )}
      />
    </>
  );
};
const UploadInput = ({
  names,
  // controls,
  placeholders,
  classAdd,
  errors,
  label,
  // registers,
  uploadImageStorage,
}) => {
  return (
    <>
      <label htmlFor={names}>{label}:</label>
      <div>
        {/* <Controller
          name={names} // Specify the field name
          control={controls} // Pass control prop
          rules={{ required: errors }}
          {...registers(names)}
          render={({ field }) => ( */}
        <Upload
          // {...field}
          beforeUpload={() => true}
          onChange={(e) =>
            e.file.status !== "removed" &&
            uploadImageStorage(e.file.originFileObj)
          }
          placeholder={placeholders}
          className={`${classAdd} text-primary border-primary`}
          listType="picture"
          maxCount={1}
        >
          <Button
            className="bg-default rounded-md h-[45px]"
            icon={<UploadOutlined />}
          >
            Upload
          </Button>
        </Upload>
        {/* )}
        /> */}
      </div>
    </>
  );
};
export { MyInput, UploadInput, SelectInput };
