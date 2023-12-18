import React from "react";

import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export function FormInputText({
   name,
   control,
   label,
   required,
   error,
   changeHandler,
   readOnly = false,
}) {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field: { onChange, onBlur, value } }) => (
            <TextField
               onChange={(val) => {
                  if (changeHandler) {
                     onChange(val);
                     changeHandler(val.target.value);
                  } else {
                     onChange(val);
                  }
               }}
               onBlur={onBlur}
               value={value || ""}
               label={label}
               required={required || false}
               fullWidth
               error={error || false}
               InputProps={{
                  readOnly,
               }}
            />
         )}
      />
   );
}
