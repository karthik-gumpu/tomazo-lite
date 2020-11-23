import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  subTitle: {
    marginBottom: -15,
    paddingLeft: 5,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">Zomato</Typography>
        <Typography className={classes.subTitle}>
          <i>Lite</i>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
