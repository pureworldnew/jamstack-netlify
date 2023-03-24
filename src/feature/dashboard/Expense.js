/* eslint-disable no-unused-vars */
import * as React from "react";

import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Typography from "@mui/material/Typography";
import cashApi from "services/cash";
import { formatDate } from "utils/formatDate";
import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Title from "./Title";

const validationSchema = Yup.object().shape({
   planTitle: Yup.string().required("Title is required"),
});

export default function Expense() {
   const {
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validationSchema),
   });

   const [expense, setExpernse] = React.useState(0);

   React.useEffect(() => {
      cashApi.cashDashboardSum("2022-09-27T05:00:00.000Z").then((res) => {
         console.log("res from expense", res);
         setExpernse(res.data[0]);
      });
   }, []);
   return (
      <Grid container spacing={2} alignItems="center">
         <Grid item md={6} xs={6}>
            <Title>Recent Expense</Title>
            <Typography component="p" variant="h4">
               {parseFloat(expense).toFixed(2)}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
               {formatDate(new Date())}
            </Typography>
            <ListItemButton component={Link} to="/cash">
               <ListItemIcon>
                  <AddShoppingCartIcon />
               </ListItemIcon>
               <ListItemText primary="Cash" />
            </ListItemButton>
         </Grid>
      </Grid>
   );
}
