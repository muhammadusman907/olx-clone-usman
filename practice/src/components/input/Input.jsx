import React from "react";
import { Input, Button, Upload} from "antd";
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
}) => {
  return (
    <>
    <label htmlFor={names}>{label}:</label>
        <Controller
          name={names} // Specify the field name
          control={controls} // Pass control prop
          rules={{ required: errors }}
          render={({ field }) => (
            <Input
              type={types}
              {...field}
              placeholder={placeholders}
              className={`w-[100%] rounded-md ${classAdd}`}
            />
          )}
        />
    </>
  );
};

const UploadInput = ({
  registers,
  names,
  controls,
  placeholders,
  classAdd,
  errors,
  label
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
  export {MyInput , UploadInput} ;