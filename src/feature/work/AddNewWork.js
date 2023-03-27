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
import { useForm } from "react-hook-form";
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
   open,
   handleClickOpen,
   handleSubmitNew,
   handleSubmitEdit,
   handleClose,
   editData,
}) {
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
         console.log(editData);
         setValue("directCompany", editData.directCompany);
         setValue("agencyCompany", editData.agencyCompany);
         setValue("companyUrl", editData.companyUrl);
         setValue("status", editData.status);
         setValue("account", editData.account);
         setValue("jobBoard", editData.jobBoard);
         setValue("createDate", new Date(editData.createDate));
         setValue("jobDescription", editData.jobDescription);
         setValue("position", editData.position);
      }
   }, [editData]);

   const onSubmit = (data) => {
      if (Object.keys(editData).length !== 0) {
         handleSubmitEdit(editData.id, data);
      } else {
         handleSubmitNew(data);
      }
   };

   const handleCloseDialog = () => {
      reset({
         directCompany: "",
         agencyCompany: "",
         companyUrl: "",
         status: "",
         account: "",
         jobBoard: "",
         jobDescription: "",
         position: "",
      });
      handleClose();
   };

   return (
      <div>
         <Button variant="outlined" onClick={handleClickOpen}>
            Create New
         </Button>
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
                     <Button
                        autoFocus
                        color="inherit"
                        onClick={handleSubmit(onSubmit)}
                     >
                        Save
                     </Button>
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
                     <Grid item md={3} xs={6}>
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
                     <Grid item md={3} xs={6}>
                        <FormInputText
                           name="agencyCompany"
                           control={control}
                           label="Agency Company"
                        />
                     </Grid>
                     <Grid item md={6} xs={6}>
                        <FormInputText
                           name="companyUrl"
                           control={control}
                           label="Company Url"
                        />
                     </Grid>
                  </Grid>
                  <Divider>Application Information</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item xs={6} md={3}>
                        <FormInputDropdown
                           id="status"
                           labelId="status-label"
                           labelText="Status"
                           options={myConsts.STATUS_OPTIONS}
                           name="status"
                           control={control}
                        />
                     </Grid>

                     <Grid item xs={6} md={3}>
                        <FormInputDropdown
                           id="account"
                           labelId="account-label"
                           labelText="Account"
                           options={myConsts.ACCOUNT_OPTIONS}
                           name="account"
                           control={control}
                        />
                     </Grid>

                     <Grid item xs={6} md={3}>
                        <FormInputDropdown
                           id="job-board"
                           labelId="job-board-label"
                           labelText="Job Board"
                           options={myConsts.JOB_BOARD_OPTIONS}
                           name="jobBoard"
                           control={control}
                        />
                     </Grid>
                     <Grid item xs={6} md={3}>
                        <FormInputDatePicker
                           name="createDate"
                           control={control}
                        />
                     </Grid>
                  </Grid>
                  <Divider>Job Details</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item md={4} xs={6}>
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
