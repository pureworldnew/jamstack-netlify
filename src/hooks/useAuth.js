import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import authService from "services/auth";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children, userData }) {
   const [user, setUser] = useLocalStorage("user", userData);
   const navigate = useNavigate();

   const login = async (data) => {
      setUser(data);
      authService.signIn(data).then((res) => console.log(res));
      navigate("/dashboard", { replace: true });
   };

   const logout = () => {
      setUser(null);
      navigate("/", { replace: true });
   };

   const value = useMemo(
      () => ({
         user,
         login,
         logout,
      }),
      [user]
   );

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
