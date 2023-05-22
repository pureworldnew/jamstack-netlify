/* eslint-disable react/no-array-index-key */
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import workApi from "services/work";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FormInputText } from "components/form";

const validationSchema = Yup.object().shape({
   fullName: Yup.string().required("Full Name is required"),
   currentPosition: Yup.string().required("Position is required"),
   howLong: Yup.string().required("How long is required"),
   techUsed: Yup.string().required("Technology used is required"),
   companyName: Yup.string().required("Company Name is required"),
   positionHeld: Yup.string().required("Position Held is required"),
});

export default function Resume() {
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
      const list = [...companyInfo];
      list[index][name] = value;
      setCompanyInfo(list);
   };
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validationSchema),
   });

   const { isLoading, mutate: createNewWorkEntry } = useMutation(
      (workEntries) => workApi.create(workEntries),
      {
         onSuccess: () => {
            toast.success("API fetched successfully", {
               autoClose: 1000,
               closeOnClick: true,
               pauseOnHover: false,
               pauseOnFocusLoss: false,
            });
         },
         onError: (error) => {
            if (Array.isArray(error.data.error)) {
               error.data.error.forEach((el) => {
                  toast.error(el.message, {
                     position: "top-right",
                  });
               });
            } else {
               toast.error(error.data.message, {
                  position: "top-right",
               });
            }
         },
      }
   );

   const onSubmit = (data) => {
      console.log("errors", errors);
      console.log("data", data);
      const formData = { ...data, workHistory: JSON.stringify(companyInfo) };
      console.log("formdata", formData);
      createNewWorkEntry(data);
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
               <Grid item xs={6} md={12}>
                  <FormInputText
                     name="fullName"
                     control={control}
                     label="Full Name"
                     required
                     error={!!errors.fullName}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.fullName?.message}
                  </Typography>
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
                     name="howLong"
                     control={control}
                     label="For how long?(year)"
                     required
                     error={!!errors.howLong}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.howLong?.message}
                  </Typography>
               </Grid>

               <Grid item md={8} xs={6}>
                  <FormInputText
                     name="techUsed"
                     control={control}
                     label="Technologies used"
                     required
                     error={!!errors.techUsed}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.techUsed?.message}
                  </Typography>
               </Grid>
            </Grid>
            <Divider>Work history</Divider>
            {companyInfo.map((company, index) => (
               <Grid container spacing={2} alignItems="center" key={index}>
                  <Grid item xs={6} md={5}>
                     <TextField
                        name="companyName"
                        onChange={(e) => handleUpdateCompany(e, index)}
                        label="Company Name"
                        fullWidth
                        required
                        error={
                           (errors.companyName && company.name === "") || false
                        }
                     />
                     <Typography variant="inherit" color="textSecondary">
                        {errors.companyName && company.name === ""}
                     </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                     <TextField
                        name="positionHeld"
                        control={control}
                        onChange={(e) => handleUpdateCompany(e, index)}
                        label="Position Held"
                        fullWidth
                        required
                        error={errors.positionHeld || false}
                     />
                     <Typography variant="inherit" color="textSecondary">
                        {errors.positionHeld?.message}
                     </Typography>
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
         <LoadingButton
            color="inherit"
            loading={isLoading}
            onClick={handleSubmit(onSubmit)}
         >
            Save
         </LoadingButton>
      </form>
   );
}
