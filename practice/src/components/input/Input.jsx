import React from "react";
import { Input } from "antd";
import { Controller } from "react-hook-form";

const MyInput = ({
  controls,
  placeholders,
  names,
  errors,
  classAdd,
  label,
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
            {...field}
            placeholder={placeholders}
            className={`w-[100%] ${classAdd}`}
          />
        )}
      />
    </>
  );
};
export default MyInput;
