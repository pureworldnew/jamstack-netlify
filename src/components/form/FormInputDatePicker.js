import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

export const FormInputDatePicker = ({ name, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, defaultValue } }) => (
        <DatePicker
          defaultValue={new Date()}
          showTimeSelect
          value={value || new Date()}
          selected={value || new Date()}
          onChange={onChange}
          dateFormat="Pp"
          className="custom-datepicker"
        />
      )}
    />
  );
};
