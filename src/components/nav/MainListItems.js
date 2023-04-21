import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import ErrorIcon from "@mui/icons-material/Error";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const MainListItems = (
   <>
      <ListItemButton component={Link} to="/dashboard">
         <ListItemIcon>
            <DashboardIcon />
         </ListItemIcon>
         <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to="/track">
         <ListItemIcon>
            <TimelineIcon />
         </ListItemIcon>
         <ListItemText primary="Track" />
      </ListItemButton>
      <ListItemButton component={Link} to="/work">
         <ListItemIcon>
            <HomeWorkIcon />
         </ListItemIcon>
         <ListItemText primary="Work" />
      </ListItemButton>
      <ListItemButton component={Link} to="/plan">
         <ListItemIcon>
            <ScheduleIcon />
         </ListItemIcon>
         <ListItemText primary="Plan" />
      </ListItemButton>
      <ListItemButton component={Link} to="/cash">
         <ListItemIcon>
            <AddShoppingCartIcon />
         </ListItemIcon>
         <ListItemText primary="Cash" />
      </ListItemButton>
      <ListItemButton component={Link} to="/stress">
         <ListItemIcon>
            <ErrorIcon />
         </ListItemIcon>
         <ListItemText primary="Stress" />
      </ListItemButton>
      <ListItemButton component={Link} to="/admin">
         <ListItemIcon>
            <AdminPanelSettingsIcon />
         </ListItemIcon>
         <ListItemText primary="Admin" />
      </ListItemButton>
   </>
);

export default MainListItems;
