import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Button from "@material-ui/core/Button";

import LocationChangeModal from "./LocationChangeModal";

const useStyles = makeStyles((theme) => ({
  subTitle: {
    marginBottom: -15,
    paddingLeft: 5,
  },
  actions: {
    flex: 1,
    textAlign: "right",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(true);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">Zomato</Typography>
        <Typography className={classes.subTitle}>
          <i>Lite</i>
        </Typography>
        <Typography className={classes.actions}>
          <Button
            aria-label="Location"
            color="inherit"
            onClick={() => setOpenModal(true)}
          >
            <LocationOnIcon /> Hyderabad
          </Button>
        </Typography>
      </Toolbar>
      <LocationChangeModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </AppBar>
  );
};

export default Header;
