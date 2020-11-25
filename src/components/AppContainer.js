import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Header from "./Header";
import RestaurantsContainer from "./RestaurantsContainer";
import RestaurantsSearch from "./RestaurantSearch";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));
const AppContainer = () => {
  const classes = useStyles();

  const [isBasicSearch, setIsBasicSearch] = React.useState(true);

  const toggleSearchView = () => {
    setIsBasicSearch(!isBasicSearch);
  };

  return (
    <div className={classes.root}>
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
    </div>
  );
};

export default AppContainer;
