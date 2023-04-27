import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
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
import workApi from "services/work";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import * as myConsts from "consts";
import {
   FormInputText,
   FormInputDropdown,
   FormInputDatePicker,
   FormInputTextarea,
} from "components/form";

const Transition = React.forwardRef((props, ref) => (
   <Slide direction="up" ref={ref} {...props} />
));

const validationSchema = Yup.object().shape({
   directCompany: Yup.string().required("Direct Company is required"),
   position: Yup.string().required("Position is required"),
});

export default function AddNewWork({
   loadingUpdate,
   open,
   handleClickOpen,
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
      setTimeout(() => {
         setValue("status", myConsts.STATUS_OPTIONS[0].value);
         setValue("account", myConsts.ACCOUNT_OPTIONS[0].value);
         setValue("jobBoard", myConsts.JOB_BOARD_OPTIONS[0].value);
      });
   }, [setValue]);

   React.useEffect(() => {
      if (Object.keys(editData).length !== 0) {
         console.log(editData);
         setValue("directCompany", editData.directCompany);
         setValue("status", editData.status);
         setValue("account", editData.account);
         setValue("jobBoard", editData.jobBoard);
         setValue("createDate", new Date(editData.createDate));
         setValue("jobDescription", editData.jobDescription);
         setValue("position", editData.position);
      }
   }, [editData]);
   const handleCloseDialog = () => {
      reset({
         directCompany: "",
         status: myConsts.STATUS_OPTIONS[0].value,
         account: myConsts.ACCOUNT_OPTIONS[0].value,
         jobBoard: myConsts.JOB_BOARD_OPTIONS[0].value,
         jobDescription: "",
         position: "",
      });
      handleClose();
   };
   const { isLoading, mutate: createNewWorkEntry } = useMutation(
      (workEntries) => workApi.create(workEntries),
      {
         onSuccess: () => {
            queryClient.invalidateQueries(["get_work_entries"]);
            toast.success("Work created successfully");
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
      if (Object.keys(editData).length !== 0) {
         handleSubmitEdit({ id: editData.id, data });
      } else {
         createNewWorkEntry(data);
      }
   };

   return (
      <div>
         <Button variant="outlined" onClick={handleClickOpen}>
            Create New
         </Button>
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
                  <Divider>Company Information</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item md={2} xs={6}>
                        <FormInputDropdown
                           id="account"
                           labelId="account-label"
                           labelText="Account"
                           options={myConsts.ACCOUNT_OPTIONS}
                           name="account"
                           control={control}
                        />
                     </Grid>
                     <Grid item md={5} xs={6}>
                        <FormInputText
                           name="directCompany"
                           control={control}
                           label="Direct Company"
                           required
                           error={!!errors.directCompany}
                        />
                        <Typography variant="inherit" color="textSecondary">
                           {errors.directCompany?.message}
                        </Typography>
                     </Grid>

                     <Grid item md={5} xs={6}>
                        <FormInputText
                           name="position"
                           control={control}
                           label="Position"
                           required
                           error={!!errors.position}
                        />
                        <Typography variant="inherit" color="textSecondary">
                           {errors.position?.message}
                        </Typography>
                     </Grid>
                  </Grid>
                  <Divider>Application Information</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item xs={6} md={4}>
                        <FormInputDropdown
                           id="job-board"
                           labelId="job-board-label"
                           labelText="Job Board"
                           options={myConsts.JOB_BOARD_OPTIONS}
                           name="jobBoard"
                           control={control}
                        />
                     </Grid>
                     <Grid item xs={6} md={4}>
                        <FormInputDropdown
                           id="status"
                           labelId="status-label"
                           labelText="Status"
                           options={myConsts.STATUS_OPTIONS}
                           name="status"
                           control={control}
                           defaultValue={myConsts.STATUS_OPTIONS[0].value}
                        />
                     </Grid>
                     <Grid item xs={6} md={4}>
                        <FormInputDatePicker
                           name="createDate"
                           control={control}
                        />
                     </Grid>
                  </Grid>
                  <Divider>Job Details</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item xs={12}>
                        <FormInputTextarea
                           name="jobDescription"
                           control={control}
                           label="Job Description"
                        />
                     </Grid>
                  </Grid>
               </Box>
            </form>
         </Dialog>
      </div>
   );
}
