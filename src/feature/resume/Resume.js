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
import { FormInputText, FormInputDropdown } from "components/form";
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
   console.log("Resume resumeData", resumeData);
   const resumeLoading = useSelector((state) => state.resume.resumeLoading);
   const dispatch = useDispatch();
   const [companyInfo, setCompanyInfo] = React.useState([
      { name: "", position: "" },
   ]);
   // 👇🏻 updates the state with user's input
   const handleAddCompany = () =>
      setCompanyInfo([...companyInfo, { name: "", position: "" }]);

   // 👇🏻 removes a selected item from the list
   const handleRemoveCompany = (index) => {
      const list = [...companyInfo];
      list.splice(index, 1);
      setCompanyInfo(list);
   };
   // 👇🏻 updates an item within the list
   const handleUpdateCompany = (e, index) => {
      const { name, value } = e.target;
      console.log("name", name, "value", value);
      const list = [...companyInfo];
      list[index][name] = value;
      setCompanyInfo(list);
   };
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
      },
   });

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
   };

   const createApiResume = (resumeEntries) => {
      dispatch(fetchResumeData(resumeEntries));
      if (!resumeLoading) {
         navigate("/resume-print");
      }
   };

   const onSubmit = (data) => {
      console.log("data", data);
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
      console.log("formdata", formData);
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
               <Grid item md={2} xs={6}>
                  <FormInputText
                     name="currentLength"
                     control={control}
                     label="For how long?(year)"
                     required
                     error={!!errors.currentLength}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.currentLength?.message}
                  </Typography>
               </Grid>
               <Grid item md={4} xs={6}>
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
                  <Grid item xs={6} md={5}>
                     <TextField
                        name="name"
                        control={control}
                        onChange={(e) => handleUpdateCompany(e, index)}
                        label="Company Name"
                        fullWidth
                        required
                     />
                  </Grid>
                  <Grid item xs={6} md={5}>
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
         </Box>
         <Box textAlign="center">
            <LoadingButton variant="contained" onClick={handleSubmit(onSubmit)}>
               Save
            </LoadingButton>
         </Box>
      </form>
   );
}
