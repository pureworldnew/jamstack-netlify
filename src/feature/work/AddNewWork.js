import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";

import {
   Toolbar,
   Button,
   Typography,
   Dialog,
   AppBar as MuiAppBar,
   IconButton,
   Slide,
   Box,
   Grid,
   Divider,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import workApi from "services/work";
import debounce from "lodash.debounce";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AccordionComponent } from "components/accordion";
import { RichEditor } from "components/rich-editor";

import * as myConsts from "consts";
import {
   FormInputText,
   FormInputDropdown,
   FormInputDatePicker,
   FormInputTextarea,
} from "components/form";
import { useEffect } from "react";

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
   checkCompanyDup,
   handleClose,
   editData,
   duplicated,
}) {
   console.log("editData is", editData);
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

   const [jobDescription, setJobDescription] = React.useState("");
   const [expand, setExpand] = React.useState(
      jobDescription !== "" && Object.keys(editData).length !== 0
   );
   // React.useEffect(() => {
   //    setExpand(jobDescription !== "" && Object.keys(editData).length !== 0);
   // }, [jobDescription, editData]);
   console.log("jobDescription is", jobDescription);
   React.useEffect(() => {
      if (Object.keys(editData).length !== 0) {
         console.log("edit Data is here", editData);
         setValue("directCompany", editData.directCompany);
         setValue("status", editData.status);
         setValue("account", editData.account);
         setValue("jobBoard", editData.jobBoard);
         setValue("createDate", new Date(editData.createDate));
         setValue("position", editData.position);
         setJobDescription(editData.jobDescription);
      } else {
         setValue("directCompany", "");
         setValue("status", myConsts.STATUS_OPTIONS[0].value);
         setValue("account", myConsts.ACCOUNT_OPTIONS[0].value);
         setValue("jobBoard", myConsts.JOB_BOARD_OPTIONS[0].value);
         setValue("createDate", new Date());
         setValue("position", "");
         setJobDescription("");
      }
   }, [editData]);

   const handleCloseDialog = () => {
      reset({
         directCompany: "",
         status: myConsts.STATUS_OPTIONS[0].value,
         account: myConsts.ACCOUNT_OPTIONS[0].value,
         jobBoard: myConsts.JOB_BOARD_OPTIONS[0].value,
         position: "",
      });
      handleClose();
   };
   const { isLoading, mutate: createNewWorkEntry } = useMutation(
      (workEntries) => workApi.create(workEntries),
      {
         onSuccess: () => {
            queryClient.invalidateQueries(["get_work_entries"]);
            toast.success("Work created successfully", {
               autoClose: 1000,
               closeOnClick: true,
               pauseOnHover: false,
               pauseOnFocusLoss: false,
            });
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

   const onSubmit = (param) => {
      const data = { ...param, jobDescription };
      console.log("submit data", data);

      if (Object.keys(editData).length !== 0) {
         handleSubmitEdit({ id: editData.id, data });
      } else {
         createNewWorkEntry(data);
      }
   };

   const checkCompanyDuplicates = (name) => {
      checkCompanyDup(name);
   };

   const debouncedResults = React.useMemo(
      () => debounce(checkCompanyDuplicates, 300),
      []
   );

   useEffect(
      () => () => {
         debouncedResults.cancel();
      },
      []
   );
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
               <MuiAppBar sx={{ position: "relative" }}>
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
               </MuiAppBar>
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
                           changeHandler={debouncedResults}
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
                  <Grid>
                     {duplicated
                        ? duplicated.map((each) => (
                             <Grid
                                container
                                spacing={2}
                                key={each.ref["@ref"].id}
                             >
                                <Grid item xs>
                                   {each.data.account}
                                </Grid>
                                <Grid item xs>
                                   {each.data.directCompany}
                                </Grid>
                                <Grid item xs>
                                   {each.data.jobBoard}
                                </Grid>
                                <Grid item xs>
                                   {each.data.position}
                                </Grid>
                                <Grid item xs>
                                   {each.data.status}
                                </Grid>
                             </Grid>
                          ))
                        : ""}
                  </Grid>
                  <Divider>Application Information</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item xs={6} md={2}>
                        <FormInputDropdown
                           id="job-board"
                           labelId="job-board-label"
                           labelText="Job Board"
                           options={myConsts.JOB_BOARD_OPTIONS}
                           name="jobBoard"
                           control={control}
                        />
                     </Grid>
                     <Grid item xs={6} md={2}>
                        <FormInputDropdown
                           id="status"
                           labelId="status-label"
                           labelText="Status"
                           options={myConsts.STATUS_OPTIONS}
                           name="status"
                           control={control}
                        />
                     </Grid>
                     <Grid item xs={6} md={2}>
                        <FormInputDatePicker
                           name="createDate"
                           control={control}
                        />
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <FormInputTextarea
                           name="interviewFeedback"
                           control={control}
                           label="Interview Feedback"
                        />
                     </Grid>
                  </Grid>
                  <AccordionComponent
                     summary="Job Description"
                     expand={expand}
                     setExpand={setExpand}
                  >
                     <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                           <RichEditor
                              setContent={setJobDescription}
                              content={jobDescription}
                           />
                        </Grid>
                     </Grid>
                  </AccordionComponent>
                  <Divider />
               </Box>
            </form>
         </Dialog>
      </div>
   );
}
