import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
  },
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
