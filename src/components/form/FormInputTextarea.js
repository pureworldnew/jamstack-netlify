import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";

import { Controller } from "react-hook-form";

export function FormInputTextarea({ name, control, error, label }) {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field }) => (
            <TextField
               id="standard-basic"
               placeholder={label}
               multiline
               error={error || false}
               label={label}
               fullWidth
               InputProps={{
                  inputProps: {
                     style: {
                        resize: "auto",
                     },
                  },
               }}
               inputComponent={TextareaAutosize}
               {...field}
            />
         )}
      />
   );
}
