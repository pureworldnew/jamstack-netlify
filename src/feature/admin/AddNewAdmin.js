/* eslint-disable no-underscore-dangle */
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { toast, ToastContainer } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminApi from "services/admin";
import * as myConsts from "consts";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FormInputText } from "components/form";

const Transition = React.forwardRef((props, ref) => (
   <Slide direction="up" ref={ref} {...props} />
));

const validationSchema = Yup.object().shape({
   firstName: Yup.string().required("First Name is required"),
   lastName: Yup.string().required("Last Name is required"),
   email: Yup.string().required("Email is required"),
});

export default function AddNewAdmin({
   loadingUpdate,
   open,
   handleSubmitEdit,
   handleClose,
   editData,
}) {
   const queryClient = useQueryClient();
   const {
      control,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validationSchema),
   });

   React.useEffect(() => {
      if (Object.keys(editData).length !== 0) {
         setValue("firstName", editData.firstName);
         setValue("lastName", editData.lastName);
         setValue("email", editData.email);
         setValue("userRole", editData?.userRole);
      }
   }, [editData]);
   const handleCloseDialog = () => {
      reset({
         firstName: "",
         lastName: "",
         email: "",
      });
      handleClose();
   };
   const { isLoading, mutate: createNewProfileEntry } = useMutation(
      (profileEntries) => adminApi.create(profileEntries),
      {
         onSuccess: () => {
            queryClient.invalidateQueries(["get_profile_entries"]);
            toast.success(
               "Profile created successfully",
               myConsts.TOAST_CONFIG
            );

            handleCloseDialog();
         },
         onError: (error) => {
            handleCloseDialog();
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
      console.log("data on Submit", data);
      if (Object.keys(editData).length !== 0) {
         handleSubmitEdit({ id: editData.id, data });
      } else {
         createNewProfileEntry(data);
      }
   };

   return (
      <div>
         <ToastContainer />
         <Dialog
            fullScreen
            open={open}
            onClose={handleCloseDialog}
            TransitionComponent={Transition}
         >
            <form>
               <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                     <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseDialog}
                        aria-label="close"
                     >
                        <CloseIcon />
                     </IconButton>
                     <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                     >
                        Delete
                     </Typography>
                     <LoadingButton
                        color="inherit"
                        loading={isLoading || loadingUpdate}
                        onClick={handleSubmit(onSubmit)}
                     >
                        Save
                     </LoadingButton>
                  </Toolbar>
               </AppBar>
               <Box
                  sx={{
                     "& .MuiTextField-root": { m: 1 },
                     p: 3,
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <Divider>Profile Meta Information</Divider>
                  <Grid container spacing={2} alignItems="center">
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
                     <Grid item md={3} xs={6}>
                        <FormInputText
                           name="email"
                           control={control}
                           label="Email"
                           required
                           error={!!errors.email}
                           autoComplete="email"
                        />
                        <Typography variant="inherit" color="textSecondary">
                           {errors.email?.message}
                        </Typography>
                     </Grid>
                     <Grid item md={3} xs={6}>
                        <FormInputText
                           name="userRole"
                           control={control}
                           label="User Role"
                        />
                     </Grid>
                  </Grid>
               </Box>
            </form>
         </Dialog>
      </div>
   );
}
