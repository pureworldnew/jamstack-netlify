import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import React from "react";
import Button from "@mui/material/Button";

function NewModalAppBar({ handleCloseDialog, handleClickSave }) {
   return (
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
               Delete
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClickSave}>
               Save
            </Button>
         </Toolbar>
      </AppBar>
   );
}
export default NewModalAppBar;
