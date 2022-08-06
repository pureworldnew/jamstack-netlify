import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import loadable from "@loadable/component";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Fallback from "./components/fallback/Fallback";
import { AppBar } from "components/app-bar";
import { Drawer } from "components/drawer";
import { Copyright } from "components/copyright";

const OrdersComponent = loadable(() => import("./feature/dashboard/Orders"), {
  fallback: <Fallback />,
});

const DepositsComponent = loadable(
  () => import("./feature/dashboard/Deposits"),
  {
    fallback: <Fallback />,
  }
);

const DashboardComponent = loadable(() => import("./feature/dashboard"), {
  fallback: <Fallback />,
});

export default function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Router>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/deposits" element={<DepositsComponent />} />
              <Route path="/orders" element={<OrdersComponent />} />
              <Route path="/" element={<DashboardComponent />} />
            </Routes>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Router>
    </Box>
  );
}
