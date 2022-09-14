import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import loadable from "@loadable/component";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Fallback } from "./components/fallback";
import { AppBar, Drawer, Copyright } from "components/nav";
import { withErrorBoundary } from "react-error-boundary";
import Alert from "@mui/material/Alert";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Alert severity="error">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </Alert>
  );
}

const PlanComponent = loadable(() => import("./feature/plan/Plan"), {
  fallback: <Fallback />,
});

const PlanComponentWithErrorBoundary = withErrorBoundary(PlanComponent, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
  },
});

const CashComponent = loadable(() => import("./feature/cash/Cash"), {
  fallback: <Fallback />,
});

const CashComponentWithErrorBoundary = withErrorBoundary(CashComponent, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
  },
});

const WorkComponent = loadable(() => import("./feature/work/Work"), {
  fallback: <Fallback />,
});

const WorkComponentWithErrorBoundary = withErrorBoundary(WorkComponent, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
  },
});

const DashboardComponent = loadable(() => import("./feature/dashboard"), {
  fallback: <Fallback />,
});

const DashboardComponentWithErrorBoundary = withErrorBoundary(
  DashboardComponent,
  {
    FallbackComponent: ErrorFallback,
    onError(error, info) {
      // Do something with the error
      // E.g. log to an error logging client here
    },
  }
);

const StressComponent = loadable(() => import("./feature/stress/Stress"), {
  fallback: <Fallback />,
});

const StressComponentWithErrorBoundary = withErrorBoundary(StressComponent, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
  },
});

const TrackComponent = loadable(() => import("./feature/track/Track"), {
  fallback: <Fallback />,
});

const TrackComponentWithErrorBoundary = withErrorBoundary(TrackComponent, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
  },
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
          <Container maxWidth="false" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route
                path="/plan"
                element={<PlanComponentWithErrorBoundary />}
              />
              <Route
                path="/track"
                element={<TrackComponentWithErrorBoundary />}
              />
              <Route
                path="/stress"
                element={<StressComponentWithErrorBoundary />}
              />
              <Route
                path="/cash"
                element={<CashComponentWithErrorBoundary />}
              />
              <Route
                path="/work"
                element={<WorkComponentWithErrorBoundary />}
              />
              <Route
                path="/"
                element={<DashboardComponentWithErrorBoundary />}
              />
            </Routes>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Router>
    </Box>
  );
}
