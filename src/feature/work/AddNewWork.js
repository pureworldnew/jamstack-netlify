import * as React from "react";

import { Typography, Dialog, Slide, Box, Grid, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import debounce from "lodash.debounce";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AccordionComponent } from "components/accordion";
import { RichEditor } from "components/rich-editor";
import { NewModalAppBar } from "components/new-modal-appbar";

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
   isUpdateLoading,
   isNewLoading,
   open,
   createNewWorkEntry,
   handleSubmitEdit,
   checkCompanyDup,
   handleClose,
   editData,
   duplicated,
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

   const [jobDescription, setJobDescription] = React.useState("");
   const [expand, setExpand] = React.useState(
      jobDescription !== "" && Object.keys(editData).length !== 0
   );
   React.useEffect(() => {
      if (Object.keys(editData).length !== 0) {
         setValue("directCompany", editData.directCompany);
         setValue("status", editData.status);
         setValue("account", editData.account);
         setValue("jobBoard", editData.jobBoard);
         setValue("createDate", new Date(editData.createDate));
         setValue("position", editData.position);
         setJobDescription(editData.jobDescription);
      } else {
         const savedAccountOption = localStorage.getItem(
            "selectedAccountOption"
         );
         if (savedAccountOption) {
            setValue("account", savedAccountOption);
         } else {
            setValue("account", myConsts.ACCOUNT_OPTIONS[0].value);
         }
         const savedJobBoardOption = localStorage.getItem(
            "selectedJobBoardOption"
         );
         if (savedJobBoardOption) {
            setValue("jobBoard", savedJobBoardOption);
         } else {
            setValue("jobBoard", myConsts.JOB_BOARD_OPTIONS[0].value);
         }

         const savedStatusOption = localStorage.getItem("selectedStatusOption");
         if (savedStatusOption) {
            setValue("status", savedStatusOption);
         } else {
            setValue("status", myConsts.STATUS_OPTIONS[0].value);
         }
         setValue("createDate", new Date());
         setValue("directCompany", "");
         setValue("position", "");
         setJobDescription("");
      }
   }, [editData]);

   const handleCloseDialog = () => {
      reset({
         directCompany: "",
         // status: myConsts.STATUS_OPTIONS[0].value,
         // account: myConsts.ACCOUNT_OPTIONS[0].value,
         // jobBoard: myConsts.JOB_BOARD_OPTIONS[0].value,
         position: "",
      });
      handleClose();
   };

   const onSubmit = (param) => {
      const data = { ...param, jobDescription };

      if (Object.keys(editData).length !== 0) {
         handleSubmitEdit({ id: editData.id, data });
      } else {
         createNewWorkEntry(data);
      }
      handleCloseDialog();
   };

   const checkCompanyDuplicates = (name) => {
      checkCompanyDup(name);
   };

   const debouncedResults = React.useMemo(
      () => debounce(checkCompanyDuplicates, 300),
      []
   );
   const handleCustomChange = (e) => {
      switch (e.target.name) {
         case "account":
            localStorage.setItem("selectedAccountOption", e.target.value);
            break;

         case "jobBoard":
            localStorage.setItem("selectedJobBoardOption", e.target.value);
            break;
         case "status":
            localStorage.setItem("selectedStatusOption", e.target.value);
            break;
         default:
            break;
      }
   };

   useEffect(
      () => () => {
         debouncedResults.cancel();
      },
      []
   );
   return (
      <div>
         <Dialog
            fullScreen
            open={open}
            onClose={handleCloseDialog}
            TransitionComponent={Transition}
         >
            <form>
               <NewModalAppBar
                  handleCloseDialog={handleCloseDialog}
                  handleClickSave={handleSubmit(onSubmit)}
                  isNewLoading={isNewLoading}
                  isUpdateLoading={isUpdateLoading}
               />
               <Box
                  sx={{
                     "& .MuiTextField-root": { m: 1 },
                     p: 3,
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <Grid container spacing={2} alignItems="center">
                     <Grid item md={2} xs={6}>
                        <FormInputDropdown
                           id="account"
                           labelId="account-label"
                           labelText="Account"
                           options={myConsts.ACCOUNT_OPTIONS}
                           name="account"
                           control={control}
                           onChangeCustom={handleCustomChange}
                        />
                     </Grid>
                     <Grid item xs={6} md={2}>
                        <FormInputDropdown
                           id="job-board"
                           labelId="job-board-label"
                           labelText="Job Board"
                           options={myConsts.JOB_BOARD_OPTIONS}
                           name="jobBoard"
                           control={control}
                           onChangeCustom={handleCustomChange}
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
                           onChangeCustom={handleCustomChange}
                        />
                     </Grid>

                     <Grid item xs={6} md={4}>
                        <FormInputTextarea
                           name="interviewFeedback"
                           control={control}
                           label="Interview Feedback"
                        />
                     </Grid>
                     <Grid item>
                        <FormInputDatePicker
                           name="createDate"
                           control={control}
                        />
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
                  <Grid container spacing={2} alignItems="center">
                     <Grid item md={3} xs={6}>
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
                     <Grid item md={3} xs={6}>
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
