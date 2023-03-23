import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";

const SecondaryListItems = (
   <>
      <ListSubheader component="div" inset>
         Saved reports
      </ListSubheader>
      <ListItemButton>
         <ListItemIcon>
            <AssignmentIcon />
         </ListItemIcon>
         <ListItemText primary="Current month" />
      </ListItemButton>
      <ListItemButton>
         <ListItemIcon>
            <AssignmentIcon />
         </ListItemIcon>
         <ListItemText primary="Last quarter" />
      </ListItemButton>
   </>
);

export default SecondaryListItems;
