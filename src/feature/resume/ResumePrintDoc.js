/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import workApi from "services/work";

export default function ResumePrintDoc() {
   const handleGenerateResume = () => {
      workApi.createWordResume({
         name: "John Doe",
         email: "john.doe@example.com",
         phone: "1234567890",
         experience: "5 years",
         education: "Bachelor of Science",
         // Add more data properties as needed
      });
   };
   return (
      <Box>
         <Button onClick={handleGenerateResume}>Create Word Resume</Button>
      </Box>
   );
}
