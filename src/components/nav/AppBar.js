/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import * as myConsts from "consts";
import { useAuth } from "hooks/useAuth";
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

function AppBar({ position, open, toggleDrawer }) {
   const [anchorElUser, setAnchorElUser] = useState(null);

   const { user, logout } = useAuth();
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
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
            <IconButton color="inherit">
               <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
               </Badge>
            </IconButton>
            {!!user && (
               <Box sx={{ flexGrow: 0, marginLeft: 4 }}>
                  <Tooltip title="Open settings">
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar {...stringAvatar("Kent Dodds")} />
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
                     {myConsts.SETTINGS.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                           {setting === "Logout" ? (
                              <Typography textAlign="center" onClick={logout}>
                                 {setting}
                              </Typography>
                           ) : (
                              <Typography textAlign="center">
                                 {setting}
                              </Typography>
                           )}
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            )}
         </Toolbar>
      </CustomAppBar>
   );
}

export default AppBar;
