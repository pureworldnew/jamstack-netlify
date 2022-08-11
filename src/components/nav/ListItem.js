import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import BugReportIcon from "@mui/icons-material/BugReport";
import LayersIcon from "@mui/icons-material/Layers";
import ErrorIcon from "@mui/icons-material/Error";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
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
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
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
  </React.Fragment>
);
