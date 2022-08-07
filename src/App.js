import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import loadable from "@loadable/component";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Fallback from "./components/fallback/Fallback";
import { AppBar, Drawer, Copyright } from "components/nav";

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
