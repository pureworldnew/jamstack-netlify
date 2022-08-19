import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Controller } from "react-hook-form";

export const FormInputDropdown = ({
  name,
  control,
  id,
  labelId,
  labelText,
  options,
}) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id={labelId}>{labelText}</InputLabel>
          <Select
            labelId={labelId}
            id={id}
            onChange={onChange}
            value={value || ""}
            autoWidth
            label={labelText}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {generateSelectOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
};
