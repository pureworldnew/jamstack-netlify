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
import api from "services/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = Yup.object().shape({
  directCompany: Yup.string().required("Direct Company is required"),
  position: Yup.string().required("Position is required"),
});

export default function AddNewWork({
  open,
  setOpen,
  handleClickOpen,
  handleClose,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    api.create(data);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Work
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
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
                  name={"directCompany"}
                  control={control}
                  label={"Direct Company"}
                  required={true}
                  error={errors.directCompany ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.directCompany?.message}
                </Typography>
              </Grid>
              <Grid item md={3} xs={6}>
                <FormInputText
                  name={"agencyCompany"}
                  control={control}
                  label={"Agency Company"}
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <FormInputText
                  name={"companyUrl"}
                  control={control}
                  label={"Company Url"}
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
                  name={"status"}
                  control={control}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <FormInputDropdown
                  id="account"
                  labelId="account-label"
                  labelText="Account"
                  options={myConsts.ACCOUNT_OPTIONS}
                  name={"account"}
                  control={control}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <FormInputDropdown
                  id="job-board"
                  labelId="job-board-label"
                  labelText="Job Board"
                  options={myConsts.JOB_BOARD_OPTIONS}
                  name={"jobBoard"}
                  control={control}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <FormInputDatePicker name={"createDate"} control={control} />
              </Grid>
            </Grid>
            <Divider>Job Details</Divider>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={4} xs={6}>
                <FormInputText
                  name={"position"}
                  control={control}
                  label={"Position"}
                  required={true}
                  error={errors.position ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.position?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormInputTextarea
                  name={"jobDescription"}
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
