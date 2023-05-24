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

const validationSchema = Yup.object().shape({
   email: Yup.string().required("Email is required"),
   currentPosition: Yup.string().required("Position is required"),
   currentLength: Yup.string().required("How long is required"),
   currentTechnologies: Yup.string().required("Technology used is required"),
});

export default function Resume() {
   const navigate = useNavigate();
   const resumeData = useSelector((state) => state.resume.resumeData);
   const resumeError = useSelector((state) => state.resume.resumeError);
   console.log("resumeError", resumeError);
   console.log("Resume resumeData", resumeData);
   const resumeLoading = useSelector((state) => state.resume.resumeLoading);
   const dispatch = useDispatch();
   const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
         email: myConsts.ACCOUNT_DETAILS.jonathan_samayoa.email,
         phone: myConsts.ACCOUNT_DETAILS.jonathan_samayoa.phone,
         address: myConsts.ACCOUNT_DETAILS.jonathan_samayoa.address,
         linkedin: myConsts.ACCOUNT_DETAILS.jonathan_samayoa.linkedin,
         currentPosition:
            myConsts.ACCOUNT_DETAILS.jonathan_samayoa.currentPosition,
         currentLength: myConsts.ACCOUNT_DETAILS.jonathan_samayoa.currentLength,
         currentTechnologies:
            myConsts.ACCOUNT_DETAILS.jonathan_samayoa.currentTechnologies,
         collegeName: myConsts.ACCOUNT_DETAILS.jonathan_samayoa.collegeName,
         collegeDegree: myConsts.ACCOUNT_DETAILS.jonathan_samayoa.collegeDegree,
         collegeMajor: myConsts.ACCOUNT_DETAILS.jonathan_samayoa.collegeMajor,
         collegePeriod: myConsts.ACCOUNT_DETAILS.jonathan_samayoa.collegePeriod,
      },
   });

   React.useEffect(() => {
      setValue("parsedObjective", resumeData.objective);
      setValue("parsedKeypoints", resumeData.keypoints);
      setValue("parsedJobResp", resumeData.jobResponsibilities);
   }, [resumeData]);
   const [companyInfo, setCompanyInfo] = React.useState([
      { name: "", position: "", fromWhenTo: "" },
   ]);

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
      setValue("email", myConsts.ACCOUNT_DETAILS[e.target.value].email);
      setValue("phone", myConsts.ACCOUNT_DETAILS[e.target.value].phone);
      setValue("address", myConsts.ACCOUNT_DETAILS[e.target.value].address);
      setValue("linkedin", myConsts.ACCOUNT_DETAILS[e.target.value].linkedin);
      setValue(
         "currentPosition",
         myConsts.ACCOUNT_DETAILS[e.target.value].currentPosition
      );
      setValue(
         "currentLength",
         myConsts.ACCOUNT_DETAILS[e.target.value].currentLength
      );
      setValue(
         "currentTechnologies",
         myConsts.ACCOUNT_DETAILS[e.target.value].currentTechnologies
      );
      setValue(
         "collegeName",
         myConsts.ACCOUNT_DETAILS[e.target.value].collegeName
      );
      setValue(
         "collegeDegree",
         myConsts.ACCOUNT_DETAILS[e.target.value].collegeDegree
      );
      setValue(
         "collegeMajor",
         myConsts.ACCOUNT_DETAILS[e.target.value].collegeMajor
      );
      setValue(
         "collegePeriod",
         myConsts.ACCOUNT_DETAILS[e.target.value].collegePeriod
      );
   };

   const createApiResume = (resumeEntries) => {
      dispatch(fetchResumeData(resumeEntries));
   };

   const printResumePdf = () => {
      if (!resumeLoading) {
         navigate("/resume-print");
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
      createApiResume(formData);
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
                     defaultValues={myConsts.ACCOUNT_OPTIONS[0].value}
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
            <Divider>Work history</Divider>
            {companyInfo.map((company, index) => (
               <Grid container spacing={2} alignItems="center" key={index}>
                  <Grid item xs={6} md={4}>
                     <TextField
                        name="name"
                        control={control}
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
            {/* objective:
          "\n\nMy name is Jonathan Samayoa and I am an experienced software engineer with 5 years of experience in developing web applications using React, Node, JavaScript and AWS technologies. In my role at With-meetwithanyone.com I have been responsible for building new features from the ground up as well as maintaining existing codebase to ensure high performance standards are met. My knowledge of cutting edge technologies has enabled me to create innovative solutions that add value to our products while also providing a great user experience. I take pride in my work and strive for excellence in all areas related to software development.",
       keypoints:
          "\n\n1. Expert in developing web applications using React, Node, JavaScript and AWS technologies. \n2. Experienced in creating efficient and maintainable code with a focus on scalability and performance optimization. \n3. Demonstrated ability to develop creative solutions to complex problems while adhering to best practices of software engineering principles. \n4. Extensive knowledge of modern web development tools such as Git/GitHub for version control, npm for package management, etc.. \n5. Skilled at debugging issues quickly and efficiently by leveraging advanced troubleshooting techniques .  \n6. Proven track record of producing high-quality work within tight deadlines while maintaining excellent customer satisfaction ratings .  \n7. 5+ years experience working professionally with-meetwithanyone website platform delivering successful projects under demanding time constraints .   \n8. Self-motivated team player who can effectively collaborate with colleagues from diverse backgrounds to achieve common goals",
       jobResponsibilities: */}
            {Object.keys(resumeData).length !== 0 && (
               <Grid container spacing={2} alignItems="center">
                  <Grid item md={12} xs={12}>
                     <FormInputTextarea
                        name="parsedObjective"
                        control={control}
                        label="Objective"
                     />
                  </Grid>
                  <Grid item md={12} xs={12}>
                     <FormInputTextarea
                        name="parsedKeypoints"
                        control={control}
                        label="Keypoints"
                     />
                  </Grid>
                  <Grid item md={12} xs={12}>
                     <FormInputTextarea
                        name="parsedJobResp"
                        control={control}
                        label="Job Responsibilities"
                     />
                  </Grid>
               </Grid>
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
            <LoadingButton variant="contained" onClick={printResumePdf}>
               Print
            </LoadingButton>
         </Grid>
      </form>
   );
}
