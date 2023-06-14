/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
   FormInputText,
   FormInputDropdown,
   FormInputTextarea,
} from "components/form";
import { fetchResumeData } from "actions";
import * as myConsts from "consts";
import { BackDrop } from "components/backdrop";

const validationSchema = Yup.object().shape({
   email: Yup.string().required("Email is required"),
   currentPosition: Yup.string().required("Position is required"),
   currentLength: Yup.string().required("How long is required"),
   currentTechnologies: Yup.string().required("Technology used is required"),
   requiredJobResp: Yup.string().required("Job Requirements is required"),
   companyProfile: Yup.string().required("Company Description is required"),
});

export default function Resume() {
   const navigate = useNavigate();
   const resumeData = useSelector((state) => state.resume.resumeData);
   const resumeError = useSelector((state) => state.resume.resumeError);
   const resumeLoading = useSelector((state) => state.resume.resumeLoading);

   console.log("resumeError", resumeError);
   console.log("Resume resumeData", resumeData);
   const dispatch = useDispatch();
   const {
      control,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: myConsts.ACCOUNT_DETAILS.jonathan_samayoa,
   });

   React.useEffect(() => {
      setValue("account", myConsts.ACCOUNT_OPTIONS[0].value);
      setValue("parsedCoverLetter", resumeData.coverLetter);
      setValue("parsedObjective", resumeData.objective);
      setValue("parsedJobResp", resumeData.jobResponsibilities);
      setValue("parsedSkillsSection", resumeData.skillsSection);
   }, [resumeData]);
   const [companyInfo, setCompanyInfo] = React.useState(
      myConsts.ACCOUNT_DETAILS.jonathan_samayoa.companyInfo
   );

   // 👇🏻 updates the state with user's input
   const handleAddCompany = () =>
      setCompanyInfo([
         ...companyInfo,
         { name: "", position: "", fromWhenTo: "" },
      ]);

   // 👇🏻 removes a selected item from the list
   const handleRemoveCompany = (index) => {
      const list = [...companyInfo];
      list.splice(index, 1);
      setCompanyInfo(list);
   };
   // 👇🏻 updates an item within the list
   const handleUpdateCompany = (e, index) => {
      const { name, value } = e.target;
      const list = [...companyInfo];
      list[index][name] = value;
      setCompanyInfo(list);
   };

   const handleAccountChange = (e) => {
      console.log(e.target.value);
      setValue("account", e.target.value);
      setCompanyInfo(myConsts.ACCOUNT_DETAILS[e.target.value].companyInfo);
      Object.keys(myConsts.ACCOUNT_DETAILS.jonathan_samayoa).forEach((each) => {
         setValue(each, myConsts.ACCOUNT_DETAILS[e.target.value][each]);
      });
   };

   const parseResumeFromApi = (resumeEntries) => {
      dispatch(fetchResumeData(resumeEntries));
   };

   const handlePrint = () => {
      if (!resumeLoading) {
         const parsedCoverLetter = watch("parsedCoverLetter", false);
         const parsedObjective = watch("parsedObjective", false);
         const parsedJobResp = watch("parsedJobResp", false);
         console.log("parsedJobResp is", parsedJobResp);
         const re = /^At\s(\w|.)*:$/gm;
         const splitedWorkHistory = parsedJobResp.split(re);

         const parsedSkillsSection = watch("parsedSkillsSection", false);
         const requiredJobResp = watch("requiredJobResp", false);
         const companyProfile = watch("companyProfile", false);
         navigate("/resume-print", {
            state: {
               coverLetter: parsedCoverLetter,
               objective: parsedObjective,
               jobResponsibilities: parsedJobResp,
               skillsSection: parsedSkillsSection,
               jobDescription: requiredJobResp,
               companyProfile,
               companyWorkHistory: [
                  splitedWorkHistory[2],
                  splitedWorkHistory[4],
                  splitedWorkHistory[6],
               ],
            },
         });
      }
   };

   const onSubmit = (data) => {
      const formData = {
         ...data,
         fullName:
            data.account !== undefined
               ? myConsts.ACCOUNT_OPTIONS.find(
                    (each) => each.value === data.account
                 ).label
               : myConsts.ACCOUNT_OPTIONS.find(
                    (each) => each.value === "jonathan_samayoa"
                 ).label,
         workHistory: JSON.stringify(companyInfo),
      };
      parseResumeFromApi(formData);
   };

   return (
      <form>
         <Box
            sx={{
               "& .MuiTextField-root": { m: 1 },
               p: 3,
            }}
            noValidate
            autoComplete="off"
         >
            <Divider>Company Information</Divider>
            <Grid container spacing={2} alignItems="center">
               <Grid item xs={6} md={2}>
                  <FormInputDropdown
                     id="account"
                     labelId="account-label"
                     labelText="Account"
                     options={myConsts.ACCOUNT_OPTIONS}
                     name="account"
                     control={control}
                     onChangeCustom={handleAccountChange}
                  />
               </Grid>
               <Grid item xs={6} md={2}>
                  <FormInputText
                     name="email"
                     control={control}
                     label="Email"
                     required
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.email?.message}
                  </Typography>
               </Grid>
               <Grid item xs={6} md={2}>
                  <FormInputText
                     name="phone"
                     control={control}
                     label="Phone"
                     required
                  />
               </Grid>
               <Grid item xs={6} md={3}>
                  <FormInputText
                     name="address"
                     control={control}
                     label="Address"
                     required
                  />
               </Grid>
               <Grid item xs={6} md={3}>
                  <FormInputText
                     name="linkedin"
                     control={control}
                     label="LinkedIn"
                     required
                  />
               </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
               <Grid item md={2} xs={6}>
                  <FormInputText
                     name="currentPosition"
                     control={control}
                     label="Current Position"
                     required
                     error={!!errors.currentPosition}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.currentPosition?.message}
                  </Typography>
               </Grid>
               <Grid item md={1} xs={6}>
                  <FormInputText
                     name="currentLength"
                     control={control}
                     label="For how long"
                     required
                     error={!!errors.currentLength}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.currentLength?.message}
                  </Typography>
               </Grid>
               <Grid item md={3} xs={6}>
                  <FormInputText
                     name="collegeName"
                     control={control}
                     label="University"
                     required
                     error={!!errors.collegeName}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.collegeName?.message}
                  </Typography>
               </Grid>
               <Grid item md={2} xs={6}>
                  <FormInputText
                     name="collegePeriod"
                     control={control}
                     label="From ~ To"
                     required
                     error={!!errors.collegePeriod}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.collegePeriod?.message}
                  </Typography>
               </Grid>
               <Grid item md={2} xs={6}>
                  <FormInputText
                     name="collegeDegree"
                     control={control}
                     label="Degree"
                     required
                     error={!!errors.collegeDegree}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.collegeDegree?.message}
                  </Typography>
               </Grid>
               <Grid item md={2} xs={6}>
                  <FormInputText
                     name="collegeMajor"
                     control={control}
                     label="Major"
                     required
                     error={!!errors.collegeMajor}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.collegeMajor?.message}
                  </Typography>
               </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
               <Grid item md={12} xs={12}>
                  <FormInputText
                     name="currentTechnologies"
                     control={control}
                     label="Technologies used"
                     required
                     error={!!errors.currentTechnologies}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.currentTechnologies?.message}
                  </Typography>
               </Grid>
            </Grid>
            <Divider>Required Company & Job Responsibilities</Divider>
            <Grid container spacing={2} alignItems="center">
               <Grid item md={12} xs={12}>
                  <FormInputTextarea
                     name="companyProfile"
                     control={control}
                     label="Company Profile"
                     required
                     error={!!errors.companyProfile}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.companyProfile?.message}
                  </Typography>
               </Grid>
               <Grid item md={12} xs={12}>
                  <FormInputTextarea
                     name="requiredJobResp"
                     control={control}
                     label="Required Responsibilites"
                     required
                     error={!!errors.requiredJobResp}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.requiredJobResp?.message}
                  </Typography>
               </Grid>
            </Grid>
            <Divider>Work history</Divider>
            {companyInfo.map((company, index) => (
               <Grid container spacing={2} alignItems="center" key={index}>
                  <Grid item xs={6} md={4}>
                     <TextField
                        name="name"
                        control={control}
                        value={company.name}
                        onChange={(e) => handleUpdateCompany(e, index)}
                        label="Company Name"
                        fullWidth
                        required
                     />
                  </Grid>

                  <Grid item xs={6} md={4}>
                     <TextField
                        name="position"
                        control={control}
                        value={company.position}
                        onChange={(e) => handleUpdateCompany(e, index)}
                        label="Position Held"
                        fullWidth
                        required
                     />
                  </Grid>
                  <Grid item xs={6} md={2}>
                     <TextField
                        name="fromWhenTo"
                        control={control}
                        value={company.fromWhenTo}
                        onChange={(e) => handleUpdateCompany(e, index)}
                        label="from ~ To"
                        fullWidth
                        required
                     />
                  </Grid>
                  <Grid item xs={6} md={2}>
                     <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                     >
                        {companyInfo.length - 1 === index &&
                           companyInfo.length < 4 && (
                              <Button onClick={handleAddCompany}>Add</Button>
                           )}
                        {companyInfo.length > 1 && (
                           <Button onClick={() => handleRemoveCompany(index)}>
                              Del
                           </Button>
                        )}
                     </ButtonGroup>
                  </Grid>
               </Grid>
            ))}
            <Divider>Parsed Data</Divider>
            {resumeLoading ? (
               <BackDrop open={resumeLoading} />
            ) : (
               Object.keys(resumeData).length !== 0 && (
                  <Grid container spacing={2} alignItems="center">
                     <Grid item md={12} xs={12}>
                        <FormInputTextarea
                           name="parsedCoverLetter"
                           control={control}
                           label="Cover Letter"
                        />
                     </Grid>
                     <Grid item md={12} xs={12}>
                        <FormInputTextarea
                           name="parsedObjective"
                           control={control}
                           label="Objective"
                        />
                     </Grid>
                     <Grid item md={12} xs={12}>
                        <FormInputTextarea
                           name="parsedJobResp"
                           control={control}
                           label="Job Responsibilities"
                        />
                     </Grid>
                     <Grid item md={12} xs={12}>
                        <FormInputTextarea
                           name="parsedSkillsSection"
                           control={control}
                           label="Skills Section"
                        />
                     </Grid>
                  </Grid>
               )
            )}
         </Box>
         <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-evenly"
         >
            <LoadingButton variant="contained" onClick={handleSubmit(onSubmit)}>
               Parse
            </LoadingButton>
            <LoadingButton variant="contained" onClick={handlePrint}>
               Go on printing
            </LoadingButton>
         </Grid>
      </form>
   );
}
