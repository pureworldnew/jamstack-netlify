import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";

import { Controller } from "react-hook-form";

export function FormInputTextarea({ name, control, error, label }) {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field: { onChange, onBlur, value } }) => (
            <TextField
               id="standard-basic"
               placeholder="Standard"
               multiline
               error={error || false}
               label={label}
               value={value || ""}
               onChange={(val) => {
                  onChange(val);
               }}
               onBlur={onBlur}
               InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                     style: {
                        resize: "auto",
                     },
                  },
               }}
               fullWidth
            />
         )}
      />
   );
}
