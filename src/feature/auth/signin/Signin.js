/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signInImage from "assets/difficult-roads.jpg";
// eslint-disable-next-line import/no-unresolved
import { Copyright } from "components/nav";
import CustomizedSnackbars from "components/customized-snackbars/CustomizedSnackbars";
// eslint-disable-next-line import/no-unresolved
import { useAuth } from "hooks/useAuth";

const theme = createTheme({
   components: {
      MuiCssBaseline: {
         styleOverrides: {
            body: {
               overflow: "hidden",
            },
         },
      },
   },
});

function SignInSide() {
   const navigate = useNavigate();

   const [openToast, setOpenToast] = React.useState(false);
   const [rememberMe, setRememberMe] = React.useState(false);
   const [toastText, setToastText] = React.useState("");
   const { login, setUser, setAuthToken } = useAuth();

   const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
         email: data.get("email"),
         password: data.get("password"),
      });
      try {
         const res = await login({
            email: data.get("email"),
            password: data.get("password"),
         });
         console.log("signIn response is", res);
         // get token from response
         const { token } = res.data;
         // set JWT token to local
         setUser(token);
         // set token to axios common header
         setAuthToken(token);
         navigate("/dashboard", { replace: true });
      } catch (err) {
         console.log("error is ", err);
         setOpenToast(true);
         setToastText("Invalid credentials!");
      }
   };

   return (
      <ThemeProvider theme={theme}>
         <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
               item
               xs={false}
               sm={4}
               md={7}
               data-testid="signInBackgroundImage"
               sx={{
                  backgroundImage: `url(${signInImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundColor: (t) =>
                     t.palette.mode === "light"
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
               }}
            />
            <Grid
               item
               xs={12}
               sm={8}
               md={5}
               component={Paper}
               elevation={6}
               square
            >
               <Box
                  sx={{
                     my: 8,
                     mx: 4,
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                  }}
               >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Sign in
                  </Typography>
                  <Box
                     component="form"
                     noValidate
                     onSubmit={handleSubmit}
                     sx={{ mt: 1 }}
                  >
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                     />
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputProps={{ "data-testid": "password" }}
                     />
                     <FormControlLabel
                        control={
                           <Checkbox
                              value="remember"
                              color="primary"
                              name="remeber-me"
                              onChange={() => setRememberMe(!rememberMe)}
                           />
                        }
                        label="Remember me"
                     />
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        data-testid="submitBtn"
                     >
                        Sign In
                     </Button>
                     <Grid container>
                        <Grid item xs>
                           <Link href="/" variant="body2">
                              Forgot password?
                           </Link>
                        </Grid>
                        <Grid item>
                           <Link href="/signup" variant="body2">
                              Don't have an account? Sign Up
                           </Link>
                        </Grid>
                     </Grid>
                     <Copyright sx={{ mt: 5 }} />
                  </Box>
               </Box>
            </Grid>
            <CustomizedSnackbars
               open={openToast}
               setOpen={setOpenToast}
               labelText={toastText}
            />
         </Grid>
      </ThemeProvider>
   );
}

export default SignInSide;
