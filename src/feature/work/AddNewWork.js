import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Divider from "@mui/material/Divider";

import { AutoWidthSelect } from "components/select";
import { DateTimePickers } from "components/date-time-picker";
import * as myConsts from "consts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddNewWork() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="form"
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
              <TextField
                fullWidth
                required
                id="direct-company"
                label="Direct Company"
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <TextField fullWidth id="agency-company" label="Agency Company" />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField fullWidth id="company_url" label="Company Url" />
            </Grid>
          </Grid>
          <Divider>Application Information</Divider>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} md={3}>
              <AutoWidthSelect
                id="status"
                labelId="status-label"
                labelText="status"
                options={myConsts.STATUS_OPTIONS}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <AutoWidthSelect
                id="account"
                labelId="account-label"
                labelText="account"
                options={myConsts.ACCOUNT_OPTIONS}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <AutoWidthSelect
                id="job-board"
                labelId="job-board-label"
                labelText="job-board"
                options={myConsts.JOB_BOARD_OPTIONS}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <DateTimePickers />
            </Grid>
          </Grid>
          <Divider>Job Details</Divider>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={4} xs={6}>
              <TextField fullWidth id="position" label="Position" />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                aria-label="Job Description"
                minRows={3}
                placeholder="Job Description"
                style={{ width: "100%", margin: "8px" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
