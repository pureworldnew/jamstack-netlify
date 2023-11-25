import * as React from "react";
import Grid from "@mui/material/Grid";
import { FormInputTextarea } from "components/form";
import { AccordionComponent } from "components/accordion";

function ParsedResume({ control, setValue, result }) {
   React.useEffect(() => {
      setTimeout(() => {
         setValue("parsedObjective", result.objective);
         setValue("parsedJobResp", result.jobResponsibilities);
         setValue("parsedSkillsSection", result.skillsSection);
      });
   }, [setValue]);

   return (
      <AccordionComponent summary="Parsed Resume Data">
         <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
               <FormInputTextarea
                  name="parsedObjective"
                  control={control}
                  label="Objective"
               />
            </Grid>
            <Grid item xs={12}>
               <FormInputTextarea
                  name="parsedJobResp"
                  control={control}
                  label="Job Responsibilities"
               />
            </Grid>
            <Grid item xs={12}>
               <FormInputTextarea
                  name="parsedSkillsSection"
                  control={control}
                  label="Skills Section"
               />
            </Grid>
         </Grid>
      </AccordionComponent>
   );
}

export default ParsedResume;
