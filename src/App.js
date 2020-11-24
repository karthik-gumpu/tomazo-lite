import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AppContainer from "./components/AppContainer";
import theme from "./utils/theme";
import LocationContext from "./store/LocationContext";
import { ZOMATO_LOCAL_STORAGE } from "./constants";
import { getKeyFromLocal } from "./utils/lsUtils";

const defaultLocation = getKeyFromLocal(ZOMATO_LOCAL_STORAGE.LOCATION);

const App = () => {
  const [location, setLocation] = React.useState(defaultLocation);
  // const updateLocation = (location) => {};
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <MuiThemeProvider theme={theme}>
        <AppContainer />
      </MuiThemeProvider>
    </LocationContext.Provider>
  );
};

export default App;
