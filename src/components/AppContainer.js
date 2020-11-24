import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Toolbar } from "@material-ui/core";

import Header from "./Header";
import RestaurantsContainer from "./RestaurantsContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
const AppContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Header />
        <RestaurantsContainer />
      </Grid>
    </div>
  );
};

export default AppContainer;
