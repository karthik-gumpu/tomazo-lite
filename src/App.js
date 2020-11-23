import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AppContainer from "./components/AppContainer";
import theme from "./utils/theme";
import LocationContext from "./store/LocationContext";

const App = () => (
  <LocationContext.Provider>
    <MuiThemeProvider theme={theme}>
      <AppContainer />
    </MuiThemeProvider>
  </LocationContext.Provider>
);

export default App;
