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
import { debounce } from "lodash";
import * as Yup from "yup";

import * as myConsts from "consts";
import {
   FormInputText,
   FormInputDropdown,
   FormInputDatePicker,
} from "components/form";
import InputLabel from "@mui/material/InputLabel";

const Transition = React.forwardRef((props, ref) => (
   <Slide direction="up" ref={ref} {...props} />
));

const INTERVAL = 1000;

const validationSchema = Yup.object().shape({
   planTitle: Yup.string().required("Title is required"),
});

export default function AddNewPlan({
   open,
   handleClickOpen,
   handleSubmitNew,
   handleSubmitEdit,
   handleClose,
   editData,
}) {
   const planEditData = { ...editData };
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
         setValue("planTitle", editData.planTitle);
         setValue("planDescription", editData.planDescription);
         setValue("planTags", editData.planTags);
         setValue("planResult", editData.planResult);
         setValue("planStatus", editData.planStatus);
         setValue("createDate", new Date(editData.createDate));
         setValue(
            "finishedDate",
            editData.finishedDate ? new Date(editData.finishedDate) : new Date()
         );
      }
   }, [editData]);

   const handleCloseDialog = () => {
      reset({
         planTitle: "",
         planDescription: "",
         planTags: "",
         planResult: "",
         planStatus: "",
      });
      handleClose();
   };

   const debouncedClick = React.useCallback(
      debounce(
         (data) => {
            handleSubmitNew(data);
            handleCloseDialog();
         },
         INTERVAL,
         { leading: true, trailing: false, maxWait: INTERVAL }
      ),
      []
   );

   const handlePlanStatusChange = (e) => {
      setValue("planStatus", e.target.value);
   };

   const onSubmit = (data) => {
      if (Object.keys(planEditData).length !== 0) {
         handleSubmitEdit(planEditData.id, data);
      } else {
         debouncedClick(data);
      }
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
                  <Divider>What must be done tomorrow?</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item md={3} xs={6}>
                        <FormInputText
                           name="planTitle"
                           control={control}
                           label="Title"
                           required
                           error={!!errors.planTitle}
                        />
                        <Typography variant="inherit" color="textSecondary">
                           {errors.planTitle?.message}
                        </Typography>
                     </Grid>
                     <Grid item md={3} xs={6}>
                        <FormInputText
                           name="planDescription"
                           control={control}
                           label="Description"
                        />
                     </Grid>
                     <Grid item md={3} xs={6}>
                        <FormInputText
                           name="planTags"
                           control={control}
                           label="Tags"
                        />
                     </Grid>
                     <Grid item md={3} xs={6}>
                        <FormInputText
                           name="planResult"
                           control={control}
                           label="Result"
                        />
                     </Grid>
                  </Grid>
                  <Divider>Status of todos</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item xs={6} md={3}>
                        <FormInputDropdown
                           id="status"
                           labelId="status-label"
                           labelText="Status"
                           options={myConsts.PLAN_STATUS_OPTIONS}
                           defaultValues={myConsts.PLAN_STATUS_OPTIONS[0].value}
                           name="planStatus"
                           control={control}
                           onChangeCustom={handlePlanStatusChange}
                        />
                     </Grid>

                     <Grid item xs={6} md={3}>
                        <InputLabel>Create Date</InputLabel>
                        <FormInputDatePicker
                           name="createDate"
                           control={control}
                        />
                     </Grid>
                     <Grid item xs={6} md={3}>
                        <InputLabel>Finished Date</InputLabel>
                        <FormInputDatePicker
                           name="finishedDate"
                           control={control}
                        />
                     </Grid>
                  </Grid>
               </Box>
            </form>
         </Dialog>
      </div>
   );
}
