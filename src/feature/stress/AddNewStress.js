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
   stressTitle: Yup.string().required("Stress Title is required"),
   stressReason: Yup.string().required("Stress Reason is required"),
});

export default function AddNewStress({
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
         setValue("stressTitle", editData.stressTitle);
         setValue("stressDescription", editData.stressDescription);
         setValue("stressStartDate", new Date(editData.stressStartDate));
         setValue("stressEndDate", new Date(editData.stressEndDate));
         setValue("stressStatus", editData.stressStatus);
         setValue("stressSolution", editData.stressSolution);
         setValue("stressReason", editData.stressReason);
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
         stressTitle: "",
         stressDescription: "",
         stressStatus: "",
         stressSolution: "",
         stressReason: "",
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
                  <Divider>Stress Information</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item md={3} xs={6}>
                        <FormInputText
                           name="stressTitle"
                           control={control}
                           label="Stress Title"
                           required
                           error={!!errors.stressTitle}
                        />
                        <Typography variant="inherit" color="textSecondary">
                           {errors.stressTitle?.message}
                        </Typography>
                     </Grid>
                     <Grid item md={3} xs={6}>
                        <FormInputText
                           name="stressDescription"
                           control={control}
                           label="Stress Description"
                        />
                     </Grid>
                     <Grid item md={3} xs={6}>
                        <FormInputDatePicker
                           name="stressStartDate"
                           control={control}
                        />
                     </Grid>
                     <Grid item md={3} xs={6}>
                        <FormInputDatePicker
                           name="stressEndDate"
                           control={control}
                        />
                     </Grid>
                  </Grid>
                  <Divider>Stress Status / Reason / Solution</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item xs={6} md={4}>
                        <FormInputDropdown
                           id="stressStatus"
                           labelId="stress-status-label"
                           labelText="Status"
                           options={myConsts.STRESS_STATUS_OPTIONS}
                           name="stressStatus"
                           control={control}
                        />
                     </Grid>

                     <Grid item xs={6} md={4}>
                        <FormInputText
                           name="stressReason"
                           control={control}
                           label="Reason"
                           required
                           error={!!errors.stressReason}
                        />
                        <Typography variant="inherit" color="textSecondary">
                           {errors.stressReason?.message}
                        </Typography>
                     </Grid>

                     <Grid item xs={6} md={4}>
                        <FormInputTextarea
                           name="stressSolution"
                           control={control}
                           label="Solution"
                        />
                     </Grid>
                  </Grid>
               </Box>
            </form>
         </Dialog>
      </div>
   );
}
