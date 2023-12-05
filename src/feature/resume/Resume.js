/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import workApi from "services/work";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
   FormInputText,
   FormInputDropdown,
   FormInputTextarea,
} from "components/form";
import { ParsedResume } from "components/parsed-resume";
import { fetchResumeData } from "actions";
import * as myConsts from "consts";
import { BackDrop } from "components/backdrop";
import { RichEditor } from "components/rich-editor";

const validationSchema = Yup.object().shape({
   directCompany: Yup.string().required("Direct Company is required"),
   position: Yup.string().required("Position is required"),
   email: Yup.string().required("Email is required"),
   currentPosition: Yup.string().required("Position is required"),
   currentLength: Yup.string().required("How long is required"),
});

export default function Resume() {
   const [checked, setChecked] = React.useState(false);
   const [duplicated, setDuplicated] = React.useState([]);
   const [matchKeywords, setMatchKeywords] = React.useState([]);
   const [matchRate, setMatchRate] = React.useState("");
   const [resumeContent, setResumeContent] = React.useState("");
   const [jobDescription, setJobDescription] = React.useState("");

   const handleCoverLetterChange = (event) => {
      setChecked(event.target.checked);
   };
   const navigate = useNavigate();
   const resumeData = useSelector((state) => state.resume.resumeData);
   const resumeError = useSelector((state) => state.resume.resumeError);
   const resumeLoading = useSelector((state) => state.resume.resumeLoading);

   console.log("resumeError", resumeError);
   console.log("Resume resumeData", resumeData);
   const dispatch = useDispatch();
   const {
      control,
      handleSubmit,
      watch,
      setValue,
      getValues,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: myConsts.ACCOUNT_DETAILS.jonathan_samayoa,
   });

   React.useEffect(() => {
      setValue("account", myConsts.ACCOUNT_OPTIONS[0].value);
      setValue("parsedCoverLetter", resumeData.coverLetter);
   }, [resumeData]);
   const [companyInfo, setCompanyInfo] = React.useState(
      myConsts.ACCOUNT_DETAILS.jonathan_samayoa.companyInfo
   );

   // 👇🏻 updates the state with user's input
   const handleAddCompany = () =>
      setCompanyInfo([
         ...companyInfo,
         { name: "", position: "", fromWhenTo: "" },
      ]);

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

   const handleAccountChange = (e) => {
      console.log(e.target.value);
      setValue("account", e.target.value);
      setCompanyInfo(myConsts.ACCOUNT_DETAILS[e.target.value].companyInfo);
      Object.keys(myConsts.ACCOUNT_DETAILS.jonathan_samayoa).forEach((each) => {
         setValue(each, myConsts.ACCOUNT_DETAILS[e.target.value][each]);
      });
   };

   const parseResumeFromApi = (resumeEntries) => {
      dispatch(fetchResumeData(resumeEntries));
   };

   const handlePrint = () => {
      if (!resumeLoading) {
         const parsedCoverLetter = watch("parsedCoverLetter", false);
         const parsedObjective = watch("parsedObjective", false);
         const parsedJobResp = watch("parsedJobResp", false);
         const re = /^At\s(\w|.)*:$/gm;
         const splitedWorkHistory = parsedJobResp.split(re);

         const parsedSkillsSection = watch("parsedSkillsSection", false);
         const directCompany = watch("directCompany", false);
         const position = watch("position", false);
         const companyProfile = watch("companyProfile", false);
         navigate("/resume-print", {
            state: {
               coverLetter: parsedCoverLetter,
               objective: parsedObjective,
               jobResponsibilities: parsedJobResp,
               skillsSection: parsedSkillsSection,
               jobDescription,
               companyProfile,
               directCompany,
               position,
               companyWorkHistory: [
                  splitedWorkHistory[2],
                  splitedWorkHistory[4],
                  splitedWorkHistory[6],
               ],
            },
         });
      }
   };

   const onSubmit = (data) => {
      const formData = {
         ...data,
         jobDescription,
         fullName:
            data.account !== undefined
               ? myConsts.ACCOUNT_OPTIONS.find(
                    (each) => each.value === data.account
                 ).label
               : myConsts.ACCOUNT_OPTIONS.find(
                    (each) => each.value === "jonathan_samayoa"
                 ).label,
         workHistory: JSON.stringify(companyInfo),
      };
      parseResumeFromApi(formData);
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

   const getMatchRate = async () => {
      const originalContent = resumeContent;
      const res = await workApi.checkMatchRating({
         jobDescription,
         resumeContent,
      });
      console.log("res from matchedRate api", res);
      setMatchRate(res.matchPercentage);
      setMatchKeywords(res.matchedKeywords);
      const pattern = new RegExp(res.matchedKeywords.join("|"), "gi");

      // Replace the matched keywords with a span having a class for styling
      const highlightedText = originalContent.replace(
         pattern,
         (match) => `<strong>${match}</strong>`
      );
      // setResumeContent(highlightedText);
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
            <Divider>Required Company & Job Responsibilities</Divider>
            <Grid container spacing={2} alignItems="center">
               <Grid item md={6} xs={6}>
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

               <Grid item md={6} xs={6}>
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
            <Grid container spacing={2} alignItems="center">
               <Grid item md={12} xs={12}>
                  <Typography variant="inherit" color="textSecondary">
                     Job Description
                  </Typography>
                  <RichEditor
                     setContent={setJobDescription}
                     content={jobDescription}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.jobDescription?.message}
                  </Typography>
               </Grid>
               <Grid item md={12} xs={12}>
                  <Typography variant="inherit" color="textSecondary">
                     Resume
                  </Typography>
                  <RichEditor
                     setContent={setResumeContent}
                     content={resumeContent}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.resumeContent?.message}
                  </Typography>
                  <Typography textAlign="center" color="textSecondary">
                     {matchRate ? `This is match rating: ${matchRate}` : ""}
                  </Typography>
                  <Button onClick={getMatchRate}>Get Match Rate</Button>
               </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
               <Grid item xs={6} md={2}>
                  <FormInputDropdown
                     id="account"
                     labelId="account-label"
                     labelText="Account"
                     options={myConsts.ACCOUNT_OPTIONS}
                     name="account"
                     control={control}
                     onChangeCustom={handleAccountChange}
                  />
               </Grid>

               <Grid item xs={6} md={2}>
                  <FormInputText
                     name="email"
                     control={control}
                     label="Email"
                     required
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.email?.message}
                  </Typography>
               </Grid>
               <Grid item xs={6} md={2}>
                  <FormInputText
                     name="phone"
                     control={control}
                     label="Phone"
                     required
                  />
               </Grid>
               <Grid item xs={6} md={3}>
                  <FormInputText
                     name="address"
                     control={control}
                     label="Address"
                     required
                  />
               </Grid>
               <Grid item xs={6} md={3}>
                  <FormInputText
                     name="linkedin"
                     control={control}
                     label="LinkedIn"
                     required
                  />
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
               <Grid item md={1} xs={6}>
                  <FormInputText
                     name="currentLength"
                     control={control}
                     label="For how long"
                     required
                     error={!!errors.currentLength}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.currentLength?.message}
                  </Typography>
               </Grid>
               <Grid item md={3} xs={6}>
                  <FormInputText
                     name="collegeName"
                     control={control}
                     label="University"
                     required
                     error={!!errors.collegeName}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.collegeName?.message}
                  </Typography>
               </Grid>
               <Grid item md={2} xs={6}>
                  <FormInputText
                     name="collegePeriod"
                     control={control}
                     label="From ~ To"
                     required
                     error={!!errors.collegePeriod}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.collegePeriod?.message}
                  </Typography>
               </Grid>
               <Grid item md={2} xs={6}>
                  <FormInputText
                     name="collegeDegree"
                     control={control}
                     label="Degree"
                     required
                     error={!!errors.collegeDegree}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.collegeDegree?.message}
                  </Typography>
               </Grid>
               <Grid item md={2} xs={6}>
                  <FormInputText
                     name="collegeMajor"
                     control={control}
                     label="Major"
                     required
                     error={!!errors.collegeMajor}
                  />
                  <Typography variant="inherit" color="textSecondary">
                     {errors.collegeMajor?.message}
                  </Typography>
               </Grid>
            </Grid>

            <Divider>Work history</Divider>
            {companyInfo.map((company, index) => (
               <Grid container spacing={2} alignItems="center" key={index}>
                  <Grid item xs={6} md={4}>
                     <TextField
                        name="name"
                        control={control}
                        value={company.name}
                        onChange={(e) => handleUpdateCompany(e, index)}
                        label="Company Name"
                        fullWidth
                        required
                     />
                  </Grid>

                  <Grid item xs={6} md={4}>
                     <TextField
                        name="position"
                        control={control}
                        value={company.position}
                        onChange={(e) => handleUpdateCompany(e, index)}
                        label="Position Held"
                        fullWidth
                        required
                     />
                  </Grid>
                  <Grid item xs={6} md={2}>
                     <TextField
                        name="fromWhenTo"
                        control={control}
                        value={company.fromWhenTo}
                        onChange={(e) => handleUpdateCompany(e, index)}
                        label="from ~ To"
                        fullWidth
                        required
                     />
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
            <Divider>Parsed Data</Divider>
            {resumeLoading ? (
               <BackDrop open={resumeLoading} />
            ) : (
               Object.keys(resumeData).length !== 0 && (
                  <Grid>
                     <ParsedResume
                        control={control}
                        setValue={setValue}
                        result={resumeData}
                     />
                     <Grid item md={12} xs={12}>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 checked={checked}
                                 onChange={handleCoverLetterChange}
                                 inputProps={{ "aria-label": "controlled" }}
                              />
                           }
                           label="Cover Letter"
                        />
                        {checked ? (
                           <FormInputTextarea
                              name="parsedCoverLetter"
                              control={control}
                              label="Cover Letter"
                           />
                        ) : (
                           ""
                        )}
                     </Grid>
                  </Grid>
               )
            )}
         </Box>
         <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-evenly"
         >
            <LoadingButton variant="contained" onClick={handleSubmit(onSubmit)}>
               Parse
            </LoadingButton>
            <LoadingButton variant="contained" onClick={handlePrint}>
               Go on printing
            </LoadingButton>
         </Grid>
      </form>
   );
}
