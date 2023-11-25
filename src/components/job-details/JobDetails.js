import * as React from "react";
import Grid from "@mui/material/Grid";
import { FormInputText, FormInputTextarea } from "components/form";
import { AccordionComponent } from "components/accordion";

function JobDetails({ control, setValue, result }) {
   React.useEffect(() => {
      setTimeout(() => {
         setValue("parsedObjective", result.objective);
         setValue("parsedJobResp", result.jobResponsibilities);
         setValue("parsedSkillsSection", result.skillsSection);
      });
   }, [setValue]);

   return (
      <AccordionComponent summary="Job Details">
         <Grid container spacing={2} alignItems="center">
            <Grid item md={12} xs={12}>
               <FormInputText
                  name="currentTechnologies"
                  control={control}
                  label="Technologies used"
               />
            </Grid>
            <Grid item xs={12}>
               <FormInputTextarea
                  name="companyProfile"
                  control={control}
                  label="Company Description"
               />
            </Grid>
            <Grid item xs={12}>
               <FormInputTextarea
                  name="jobDescription"
                  control={control}
                  label="Job Description"
               />
            </Grid>
         </Grid>
      </AccordionComponent>
   );
}

export default JobDetails;
