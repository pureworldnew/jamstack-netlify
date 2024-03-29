/* eslint-disable no-unused-vars */

"use client";

import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import loadable from "@loadable/component";
import { withErrorBoundary } from "react-error-boundary";
import Alert from "@mui/material/Alert";

import { Button } from "@mui/material";

import { Fallback } from "components/fallback";
import { ProtectedLayout, HomeLayout } from "components/layout";

function ErrorFallback({ error, resetErrorBoundary }) {
   return (
      <Alert severity="error">
         <p>Something went wrong:</p>
         <pre>{error.message}</pre>
         <Button onClick={resetErrorBoundary}>Try again</Button>
      </Alert>
   );
}

const LoginComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/auth/signin/Signin"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const SignupComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/auth/signup/Signup"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const PlanComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/plan/Plan"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const CashComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/cash/Cash"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const WorkComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/work/Work"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const AdminComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/admin/Admin"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const ResumeComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/resume/Resume"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const ResumePrintComponentWithErrorBoundary = React.lazy(() =>
   import("./feature/resume/ResumePrint")
);

const DashboardComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/dashboard"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const CalendarComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/calendar/MyCalendar"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const StressComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/stress/Stress"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const TrackComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/track/Track"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

const ProfileComponentWithErrorBoundary = withErrorBoundary(
   loadable(() => import("./feature/profile/Profile"), {
      fallback: <Fallback />,
   }),
   {
      FallbackComponent: ErrorFallback,
      onError(error, info) {
         // Do something with the error
         // E.g. log to an error logging client here
      },
   }
);

export default function App() {
   return (
      <Suspense>
         <Routes>
            <Route path="/" element={<HomeLayout />}>
               <Route index element={<LoginComponentWithErrorBoundary />} />
               <Route
                  path="/signin"
                  element={<LoginComponentWithErrorBoundary />}
               />
               <Route
                  path="/signup"
                  element={<SignupComponentWithErrorBoundary />}
               />
            </Route>
            <Route path="/" element={<ProtectedLayout />}>
               <Route
                  path="/dashboard"
                  element={<DashboardComponentWithErrorBoundary />}
               />
               <Route
                  path="/calendar"
                  element={<CalendarComponentWithErrorBoundary />}
               />
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
                  path="/resume"
                  element={<ResumeComponentWithErrorBoundary />}
               />
               <Route
                  path="/resume-print"
                  element={<ResumePrintComponentWithErrorBoundary />}
               />
               <Route
                  path="/admin"
                  element={<AdminComponentWithErrorBoundary />}
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
                  path="/profile"
                  element={<ProfileComponentWithErrorBoundary />}
               />
            </Route>
         </Routes>
      </Suspense>
   );
}
