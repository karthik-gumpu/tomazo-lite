import React from "react";
import Grid from "@material-ui/core/Grid";

import Header from "./Header";
import RestaurantsContainer from "./RestaurantsContainer";
import RestaurantsSearch from "./RestaurantSearch";

const AppContainer = () => {
  const [isBasicSearch, setIsBasicSearch] = React.useState(true);

  const toggleSearchView = () => {
    setIsBasicSearch(!isBasicSearch);
  };

  return (
    <Grid container>
      <Header />
      <Grid container style={{ margin: 20 }}>
        {isBasicSearch ? (
          <RestaurantsSearch toggleSearchView={toggleSearchView} />
        ) : (
          <RestaurantsContainer toggleSearchView={toggleSearchView} />
        )}
      </Grid>
    </Grid>
  );
};

export default AppContainer;
