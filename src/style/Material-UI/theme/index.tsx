import { createTheme } from "@mui/material/styles";

const Index = createTheme({
  palette: {
    primary: {
      main: "#ED0226",
    },
    secondary: {
      light: "#4E5764",
      main: "#EDECF0",
      dark: "#001A41",
      contrastText: "#fff",
    },
    success: {
      main: "#83BB57",
    },
    error: {
      main: "#9B000B",
    },
    warning: {
      main: "#F7A810",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
  },

  typography: {
    h1: {
      fontSize: 36,
      fontWeight: 700,
    },
    h2: {
      fontSize: 24,
      fontWeight: 700,
    },
    h3: {
      fontSize: 21,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
    overline: {
      fontSize: 16,
      fontWeight: 400,
    },
    button: {
      fontSize: 16,
      fontWeight: 700,
    },
    caption: {
      fontSize: 16,
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 10,
  },
});
export default Index;
