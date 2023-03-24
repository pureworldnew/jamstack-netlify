import React from "react";

import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export function FormInputText({ name, control, label, required, error }) {
   return <Controller name={name} control={control} render={({ field: { onChange, value } }) => <TextField onChange={onChange} value={value || ""} label={label} required={required || false} fullWidth error={error || false} />} />;
}
