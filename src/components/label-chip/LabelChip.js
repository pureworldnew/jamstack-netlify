import * as React from "react";
import Chip from "@mui/material/Chip";

export function LabelChip({ label, color }) {
  return <Chip label={label} color={color} />;
}
