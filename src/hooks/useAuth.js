import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import authService from "services/auth";
// import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children, userData }) {
   const [user, setUser] = useLocalStorage("user", userData);
   const navigate = useNavigate();

   const setAuthToken = (token) => {
      localStorage.setItem("token", token);
   };

   const login = (data) => authService.signIn(data);

   const logout = () => {
      localStorage.clear();
      navigate("/", { replace: true });
   };

   const value = useMemo(
      () => ({
         user,
         login,
         logout,
         setUser,
         setAuthToken,
      }),
      [user]
   );

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
