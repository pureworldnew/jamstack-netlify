import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink, useLocation } from "react-router-dom";

const breadcrumbNameMap = {
   "/dashboard": "Dashboard",
   "/track": "Track",
   "/work": "Work",
   "/plan": "Plan",
   "/cash": "Cash",
   "/resume": "Resume",
   "/stress": "Stress",
};

function LinkRouter(props) {
   return <Link {...props} component={RouterLink} />;
}

export function RouterBreadcrumbs() {
   const location = useLocation();
   const pathnames = location.pathname.split("/").filter((x) => x);

   return (
      <Breadcrumbs aria-label="breadcrumb">
         <LinkRouter underline="hover" color="inherit" to="/">
            Home
         </LinkRouter>
         {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            return last ? (
               <Typography color="text.primary" key={to}>
                  {breadcrumbNameMap[to]}
               </Typography>
            ) : (
               <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                  {breadcrumbNameMap[to]}
               </LinkRouter>
            );
         })}
      </Breadcrumbs>
   );
}
