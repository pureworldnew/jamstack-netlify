import React from "react";
import { Routes, Route } from "react-router-dom";

import loadable from "@loadable/component";
import { withErrorBoundary } from "react-error-boundary";
import Alert from "@mui/material/Alert";

import { Fallback } from "components/fallback";
import { ProtectedLayout, HomeLayout } from "components/layout";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Alert severity="error">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </Alert>
  );
}

const LoginComponent = loadable(() => import("./feature/auth/signin/Signin"), {
  fallback: <Fallback />,
});

const LoginComponentWithErrorBoundary = withErrorBoundary(LoginComponent, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
  },
});

const SignupComponent = loadable(() => import("./feature/auth/signup/Signup"), {
  fallback: <Fallback />,
});

const SignupComponentWithErrorBoundary = withErrorBoundary(SignupComponent, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
  },
});

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
  return (
    <Routes>
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<DashboardComponentWithErrorBoundary />} />
        <Route path="/plan" element={<PlanComponentWithErrorBoundary />} />
        <Route path="/track" element={<TrackComponentWithErrorBoundary />} />
        <Route path="/stress" element={<StressComponentWithErrorBoundary />} />
        <Route path="/cash" element={<CashComponentWithErrorBoundary />} />
        <Route path="/work" element={<WorkComponentWithErrorBoundary />} />
      </Route>
      <Route element={<HomeLayout />}>
        <Route path="/signin" element={<LoginComponentWithErrorBoundary />} />
        <Route path="/signup" element={<SignupComponentWithErrorBoundary />} />
      </Route>
    </Routes>
  );
}
