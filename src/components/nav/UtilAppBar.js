/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import * as myConsts from "consts";
import { useAuth } from "hooks/useAuth";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import planApi from "services/plan";
import calendarAPI from "services/calendar";
import workApi from "services/work";
import moment from "moment";
import { RouterBreadcrumbs } from "./Breadcrumbs";

const CustomAppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      marginLeft: myConsts.DRAWER_WIDTH,
      width: `calc(100% - ${myConsts.DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));

function stringToColor(string) {
   let hash = 0;
   let i;

   /* eslint-disable no-bitwise */
   for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
   }

   let color = "#";

   for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
   }
   /* eslint-enable no-bitwise */

   return color;
}

function stringAvatar(name) {
   return {
      sx: {
         bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
   };
}

function UtilAppBar({ position, open, toggleDrawer }) {
   const [currentPlan, setCurrentPlan] = useState(0);
   const [todayEvents, setTodayEvents] = useState(0);
   const [weeklyJobs, setWeeklyJobs] = useState(0);
   const [loading, setLoading] = useState(false);
   const getCurrentPlan = async () => {
      try {
         const res = await planApi.readOnlyCurrent();
         if (res.data) {
            setCurrentPlan(res.data.length);
         }
      } catch (err) {
         console.log(err);
      }
   };
   const calendarEventsToday = async () => {
      try {
         const response = await calendarAPI.getCalendarToken({ dateRange: 0 });
         const calEvns = response.data?.events.filter((eventItem) => {
            const now = moment();
            const endOfToday = now.endOf("day").toString();
            const diffBetweenEnd = moment(endOfToday).diff(
               moment(eventItem.end),
               "minutes"
            );
            return diffBetweenEnd > 0;
         });
         setTodayEvents(calEvns.length);
      } catch (error) {
         console.error("Error fetching calendar events", error);
      }
   };
   const getWeeklyJobApply = async () => {
      try {
         const totalJobs = await workApi.readAll();
         console.log("totalJobs", totalJobs);
         const now = moment();
         const monday = now.clone().weekday(1).format("YYYY-MM-DD");
         console.log("monday is", monday);
         const saturday = now.clone().weekday(6).format("YYYY-MM-DD");
         console.log("saturday is", saturday);
         const weekJobs = totalJobs.filter((each) => {
            console.log("each of jobs", each);
            const createDateString = moment(each.data.createDate).format(
               "YYYY-MM-DD"
            );
            console.log("createDateString", moment(each.data.createDate));
            const isNowWeekday = moment(createDateString).isBetween(
               monday,
               saturday,
               null,
               "[]"
            );
            console.log("isNowWeekday", isNowWeekday);
            return isNowWeekday === true;
         });
         console.log("weeklyjobs", weekJobs);
         setWeeklyJobs(weekJobs.length);
      } catch (err) {
         console.log(err);
      }
   };
   useEffect(() => {
      setLoading(true);
      getCurrentPlan();
      calendarEventsToday();
      getWeeklyJobApply();
      setLoading(false);
   }, []);

   const navigate = useNavigate();

   const [anchorElUser, setAnchorElUser] = useState(null);
   const [loggedUser] = useLocalStorage("user", null);

   const { user, logout } = useAuth();
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };
   const goProfile = () => {
      navigate("/profile", { replace: true });
   };

   return (
      <CustomAppBar position={position} open={open}>
         <Toolbar
            sx={{
               pr: "24px", // keep right padding when drawer closed
            }}
         >
            <IconButton
               edge="start"
               color="inherit"
               aria-label="open drawer"
               onClick={toggleDrawer}
               sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
               }}
            >
               <MenuIcon />
            </IconButton>
            <Typography
               component="h1"
               variant="h6"
               color="inherit"
               noWrap
               sx={{ flexGrow: 1 }}
            >
               <RouterBreadcrumbs />
            </Typography>
            {!loading && (
               <>
                  <IconButton color="inherit">
                     <Badge badgeContent={currentPlan} color="info">
                        <WorkHistoryIcon />
                     </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                     <Badge badgeContent={todayEvents} color="success">
                        <MeetingRoomIcon />
                     </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                     <Badge badgeContent={weeklyJobs} color="secondary">
                        <PriorityHighIcon />
                     </Badge>
                  </IconButton>
               </>
            )}

            {!!user && (
               <Box sx={{ flexGrow: 0, marginLeft: 4 }}>
                  <Tooltip title="Open settings">
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                           {...stringAvatar(
                              `${loggedUser.firstName} ${loggedUser.lastName}`
                           )}
                        />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: "45px" }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={goProfile}>
                           Profile
                        </Typography>
                     </MenuItem>
                     <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={logout}>
                           Logout
                        </Typography>
                     </MenuItem>
                  </Menu>
               </Box>
            )}
         </Toolbar>
      </CustomAppBar>
   );
}

export default UtilAppBar;
