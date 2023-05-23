import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Controller } from "react-hook-form";

export function FormInputDropdown({
   name,
   control,
   id,
   labelId,
   labelText,
   options,
   defaultValues,
   onChangeCustom,
}) {
   const generateSelectOptions = () =>
      options.map((option) => (
         <MenuItem key={option.value} value={option.value}>
            {option.label}
         </MenuItem>
      ));

   return (
      <Controller
         control={control}
         name={name}
         render={({ ...field }) => (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
               <InputLabel id={labelId}>{labelText}</InputLabel>
               <Select
                  labelId={labelId}
                  id={id}
                  key={defaultValues}
                  defaultValue={defaultValues}
                  field={field}
                  onChange={onChangeCustom || field.onCh}
                  autoWidth
                  label={labelText}
               >
                  {generateSelectOptions()}
               </Select>
            </FormControl>
         )}
      />
   );
}
