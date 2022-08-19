import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function AutoWidthSelect({ id, labelId, labelText, options }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={labelId}>{labelText}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={age}
        onChange={handleChange}
        autoWidth
        label={labelText}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem value={option.value} key={option.value}>
              {option.text}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
