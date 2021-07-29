import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#c0c0c0",
      contrastText: "#000",
    },
    secondary: {
      main: "#BB1D15",
      contrastText: "#a9a9a9",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
