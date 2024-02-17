import React from "react";
import { Input, Button, Upload, Select } from "antd";
import { Controller } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
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
}) => {
  // console.log("messages ---------------->", messages);
  return (
    <>
     {label && <label htmlFor={names}>{ label}:</label>}
      <Controller
        name={names} // Specify the field name
        control={controls} // Pass control prop
        rules={{ required: errors }}
        render={({ field }) => (
          <Input
            disabled={disabled}
            type={types}
            {...field}
            placeholder={placeholders}
            className={`w-[100%] rounded-md ${classAdd} border-2 `}
            status={messages && "error"}
          />
        )}
      />
    </>
  );
};
const SelectInput = (
{  controls,
  placeholders,
  names,
  errors,
  classAdd,
  label,
  registers,
  types,
  messages,
 }
) => {
    //  console.log(controls)  
  return (
    <Controller
      name={names} // Specify the field name
      control={controls} // Pass control prop
      rules={{ required: errors }}
      render={({ field }) => (
        <Select
          {...field}
          placeholder={placeholders}
          className={`w-[100%] rounded-md ${classAdd}`}
          options={[
            {
              label: "Jack",
              value: "jack",
            },
            {
              label: "kashan",
              value: "Kahshan",
            },
          ]}
        />
      )}
    />
  );
};
const UploadInput = ({
  registers,
  names,
  controls,
  placeholders,
  classAdd,
  errors,
  label,
}) => {
  return (
    <>
      <label htmlFor={names}>{label}:</label>
      <div>
        <Controller
          name={names} // Specify the field name
          control={controls} // Pass control prop
          rules={{ required: errors }}
          render={({ field }) => (
            <Upload
              {...field}
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
          )}
        />
      </div>
    </>
  );
};
export { MyInput, UploadInput, SelectInput };
 