import React from "react";
import { render } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "hooks/useAuth";
import theme from "context/theme";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: false,
      },
   },
});

function Wrapper({ children }) {
   return (
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         <BrowserRouter>
            <AuthProvider>
               <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AuthProvider>
         </BrowserRouter>
      </QueryClientProvider>
   );
}

const customRender = (ui, options) =>
   render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
