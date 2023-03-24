import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Controller } from "react-hook-form";

export function FormInputTextarea({ name, control, label }) {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field: { onChange, value } }) => (
            <TextareaAutosize
               onChange={onChange}
               value={value}
               aria-label={label}
               minRows={3}
               placeholder={label}
               style={{ width: "100%", margin: "8px" }}
            />
         )}
      />
   );
}
