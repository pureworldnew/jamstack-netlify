import * as React from "react";
import Grid from "@mui/material/Grid";
import { RichEditor } from "components/rich-editor";
import { AccordionComponent } from "components/accordion";

function JobDetails({ jobDescription, setJobDescription }) {
   return (
      <AccordionComponent summary="Job Description">
         <Grid container spacing={2} alignItems="center">
            <RichEditor
               setContent={setJobDescription}
               content={jobDescription}
            />
         </Grid>
      </AccordionComponent>
   );
}

export default JobDetails;
