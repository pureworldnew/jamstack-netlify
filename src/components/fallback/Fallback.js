import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export function Fallback() {
   return (
      <Box sx={{ width: 300 }}>
         <Skeleton />
         <Skeleton animation="wave" />
         <Skeleton animation={false} />
      </Box>
   );
}
