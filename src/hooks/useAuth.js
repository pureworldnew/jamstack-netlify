import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import authService from "services/auth";
import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children, userData }) {
   const [user, setUser] = useLocalStorage("user", userData);
   const navigate = useNavigate();

   const setAuthToken = (token) => {
      if (token) {
         axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
         delete axios.defaults.headers.common.Authorization;
      }
   };

   const login = (data) => authService.signIn(data);

   const logout = () => {
      setUser(null);
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
