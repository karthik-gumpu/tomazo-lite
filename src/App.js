import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AppContainer from "./components/AppContainer";
import theme from "./utils/theme";

const App = () => (
  <MuiThemeProvider theme={theme}>
    <AppContainer />
  </MuiThemeProvider>
);

export default App;
