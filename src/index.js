/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "hooks/useAuth";
import theme from "context/theme";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Provider store={store}>
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
      </Provider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
