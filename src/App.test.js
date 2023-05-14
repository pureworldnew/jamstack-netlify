/* eslint-disable no-undef */
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "hooks/useAuth";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "context/theme";

import { render, screen } from "@testing-library/react";
import App from "./App";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: false,
      },
   },
});

test("renders Dream header", () => {
   render(
      <React.StrictMode>
         <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
               <AuthProvider>
                  <ThemeProvider theme={theme}>
                     <App />
                  </ThemeProvider>
               </AuthProvider>
            </BrowserRouter>
         </QueryClientProvider>
      </React.StrictMode>
   );
});
