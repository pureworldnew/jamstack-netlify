import React from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import { AppBar, Drawer, Copyright } from "components/nav";

export function ProtectedLayout() {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="absolute" open={open} toggleDrawer={toggleDrawer} />
      <Drawer variant="permanent" open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="false" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}
