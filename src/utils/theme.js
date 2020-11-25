import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "rgb(237, 90, 107)",
      main: "rgb(237, 90, 107)",
      dark: "rgb(237, 90, 107)",
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: 30,
      },
    },
  },
});

export default theme;
