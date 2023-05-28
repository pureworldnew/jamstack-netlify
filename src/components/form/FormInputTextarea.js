import React from "react";
import TextField from "@mui/material/TextField";

import { Controller } from "react-hook-form";

function FormInputTextarea({ name, control, error, label }) {
   return (
      <Controller
         name={name}
         control={control}
         render={({ field }) => (
            <TextField
               id={name}
               variant="outlined"
               label={label}
               multiline
               error={error || false}
               fullWidth
               rows={5}
               {...field}
            />
         )}
      />
   );
}

export default React.memo(FormInputTextarea);
