/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import { useLocation } from "react-router-dom";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import debounce from "lodash.debounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as myConsts from "consts";
import {
   FormInputText,
   FormInputDropdown,
   FormInputDatePicker,
   FormInputTextarea,
} from "components/form";
import { toast } from "react-toastify";

import * as Yup from "yup";
import workApi from "services/work";
import ErrorPage from "./ErrorPage";
import PrintPdf from "./PdfViewer/PrintPdf";

const validationSchema = Yup.object().shape({
   directCompany: Yup.string().required("Direct Company is required"),
   position: Yup.string().required("Position is required"),
});

export default function ResumePrint() {
   const [duplicated, setDuplicated] = React.useState([]);
   const queryClient = useQueryClient();

   const location = useLocation();
   const storeResult = useSelector((state) => state.resume.resumeData);
   const result = { ...storeResult, ...location.state };
   console.log("location.state", location.state);
   console.log("real result", result);
   const resumeLoading = useSelector((state) => state.resume.resumeLoading);
   const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validationSchema),
   });

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
      createNewWorkEntry(data);
   };

   const checkCompanyDup = async (val, name) => {
      const res = await workApi.checkDupCompany(val, name);
      setDuplicated(res);
   };

   const checkCompanyDuplicates = (name) => {
      checkCompanyDup(name);
   };

   const debouncedResults = React.useMemo(
      () => debounce(checkCompanyDuplicates, 300),
      []
   );

   const handleAccountChange = (e) => {
      setValue("account", e.target.value);
   };

   const handleJobBoardChange = (e) => {
      setValue("jobBoard", e.target.value);
   };

   const handleStatusChange = (e) => {
      setValue("status", e.target.value);
   };

   // 👇🏻 returns an error page if the result object is empty
   if (JSON.stringify(result) === "{}") {
      return <ErrorPage />;
   }

   if (resumeLoading) {
      return <div>...loading</div>;
   }

   return (
      <Box>
         <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
         >
            <Grid item md={4} xs={12} justify="center" alignItems="center">
               <PDFDownloadLink
                  document={<PrintPdf {...result} />}
                  fileName={`${result.fullName} resume.pdf`}
                  style={{ display: "flex", justifyContent: "center" }}
               >
                  {({ loading }) =>
                     loading ? "Loading document..." : "Download Pdf"
                  }
               </PDFDownloadLink>
            </Grid>
            <Grid item md={4} xs={12} justify="center" alignItems="center">
               <BlobProvider document={<PrintPdf {...result} />}>
                  {({ url }) => (
                     <Link
                        href={url}
                        underline="hover"
                        style={{ display: "flex", justifyContent: "center" }}
                     >
                        View PDF
                     </Link>
                  )}
               </BlobProvider>
            </Grid>
            <Grid item container md={4} xs={12} justifyContent="center">
               <LoadingButton
                  color="inherit"
                  loading={isLoading}
                  onClick={handleSubmit(onSubmit)}
               >
                  Save
               </LoadingButton>
            </Grid>
         </Grid>
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
                  <Grid item md={2} xs={6}>
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
                          <Grid container spacing={2} key={each.ref["@ref"].id}>
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
                  <Grid item xs={6} md={4}>
                     <FormInputDropdown
                        id="job-board"
                        labelId="job-board-label"
                        labelText="Job Board"
                        defaultValues={myConsts.JOB_BOARD_OPTIONS[0].value}
                        options={myConsts.JOB_BOARD_OPTIONS}
                        name="jobBoard"
                        control={control}
                        onChangeCustom={handleJobBoardChange}
                     />
                  </Grid>
                  <Grid item xs={6} md={4}>
                     <FormInputDropdown
                        id="status"
                        labelId="status-label"
                        labelText="Status"
                        options={myConsts.STATUS_OPTIONS}
                        defaultValues={myConsts.STATUS_OPTIONS[0].value}
                        name="status"
                        control={control}
                        onChangeCustom={handleStatusChange}
                     />
                  </Grid>
                  <Grid item xs={6} md={4}>
                     <FormInputDatePicker name="createDate" control={control} />
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
      </Box>
   );
}
