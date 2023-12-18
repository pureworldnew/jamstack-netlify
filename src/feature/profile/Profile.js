import React, { useEffect } from "react";
import {
   Toolbar,
   Typography,
   AppBar as MuiAppBar,
   Box,
   Grid,
   Button,
} from "@mui/material";

import { FormInputText } from "components/form";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import authApi from "services/auth";
import * as myConsts from "consts";

const validationSchema = Yup.object().shape({
   directCompany: Yup.string().required("Direct Company is required"),
   position: Yup.string().required("Position is required"),
});

function Profile() {
   const queryClient = useQueryClient();
   const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validationSchema),
   });

   const { isLoading, data: queryResults } = useQuery(
      ["get_profile_info"],
      () => authApi.getProfile(),
      {
         select: (res) => {
            console.log("response from getProfile api", res);
            return res;
         },
         onError: (error) => {
            if (Array.isArray(error.data.error)) {
               error.data.error.forEach((el) =>
                  toast.error(el.message, {
                     position: "top-right",
                  })
               );
            } else {
               toast.error(error.data.message, {
                  position: "top-right",
               });
            }
         },
      }
   );

   useEffect(() => {
      if (queryResults) {
         setValue("userEmail", queryResults.email);
         setValue("firstName", queryResults.firstName);
         setValue("lastName", queryResults.lastName);
      }
   }, [setValue, queryResults]);

   console.log("queryResults", queryResults);

   const { isLoading: loadingUpdate, mutate: saveUserProfile } = useMutation(
      (userEntries) => authApi.updateProfile(userEntries),
      {
         onSuccess: () => {
            queryClient.invalidateQueries(["get_profile_info"]);
            toast.success(
               "Profile updated successfully",
               myConsts.TOAST_CONFIG
            );
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

   const onSubmit = (param) => {
      console.log("Param of profile is", param);
      saveUserProfile(param);
   };

   return (
      <form>
         <MuiAppBar sx={{ position: "relative" }}>
            <Toolbar sx={{ display: "flex", flexDirection: "row-reverse" }}>
               <LoadingButton
                  color="inherit"
                  loading={isLoading || loadingUpdate}
                  onClick={handleSubmit(onSubmit)}
               >
                  Save
               </LoadingButton>
            </Toolbar>
         </MuiAppBar>
         <Box
            sx={{
               "& .MuiTextField-root": { m: 1 },
               p: 3,
            }}
            noValidate
            autoComplete="off"
         >
            <Grid
               container
               spacing={2}
               alignItems="center"
               justifyContent="center"
            >
               <Grid item md={2} xs={6}>
                  <FormInputText
                     name="userEmail"
                     control={control}
                     label="User Email"
                     required
                     error={!!errors.userEmail}
                     readOnly
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.userEmail?.message}
                  </Typography>
               </Grid>
               <Grid item md={2} xs={6}>
                  <FormInputText
                     name="userRole"
                     control={control}
                     label="User Role"
                     required
                     error={!!errors.userRole}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.userRole?.message}
                  </Typography>
               </Grid>
               <Grid item md={3} xs={6}>
                  <FormInputText
                     name="firstName"
                     control={control}
                     label="First Name"
                     required
                     error={!!errors.firstName}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.firstName?.message}
                  </Typography>
               </Grid>
               <Grid item md={3} xs={6}>
                  <FormInputText
                     name="lastName"
                     control={control}
                     label="Last Name"
                     required
                     error={!!errors.lastName}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.lastName?.message}
                  </Typography>
               </Grid>
               <Grid item md={2} xs={6}>
                  <Button>Update Password</Button>
               </Grid>
            </Grid>
         </Box>
      </form>
   );
}
export default Profile;
