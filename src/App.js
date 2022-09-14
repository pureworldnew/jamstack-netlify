import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import loadable from "@loadable/component";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Fallback } from "./components/fallback";
import { AppBar, Drawer, Copyright } from "components/nav";

const PlanComponent = loadable(() => import("./feature/plan/Plan"), {
  fallback: <Fallback />,
});

const CashComponent = loadable(() => import("./feature/cash/Cash"), {
  fallback: <Fallback />,
});

const WorkComponent = loadable(() => import("./feature/work/Work"), {
  fallback: <Fallback />,
});

const DashboardComponent = loadable(() => import("./feature/dashboard"), {
  fallback: <Fallback />,
});

const StressComponent = loadable(() => import("./feature/stress/Stress"), {
  fallback: <Fallback />,
});

const TrackComponent = loadable(() => import("./feature/track/Track"), {
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
          <Container sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/plan" element={<PlanComponent />} />
              <Route path="/track" element={<TrackComponent />} />
              <Route path="/stress" element={<StressComponent />} />
              <Route path="/cash" element={<CashComponent />} />
              <Route path="/work" element={<WorkComponent />} />
              <Route path="/" element={<DashboardComponent />} />
            </Routes>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Router>
    </Box>
  );
}
