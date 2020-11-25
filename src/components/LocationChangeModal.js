import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import api, { cancelApis } from "../utils/api";
import SearchBox from "./common/SearchBox";
import { storeJsonInLocal } from "../utils/lsUtils";
import { ZOMATO_LOCAL_STORAGE } from "../constants";
import LocationContext from "../store/LocationContext";

const CityRender = React.memo(({ city, onClick }) => {
  return (
    <Grid container alignItems="center" onClick={() => onClick(city)}>
      <Grid item>
        <LocationOnIcon />
      </Grid>
      <Grid item xs>
        {city.name}
        <Typography variant="body2" color="textSecondary">
          {city.state_name}, {city.country_name}
        </Typography>
      </Grid>
    </Grid>
  );
});

const ChangeLocationModal = ({ open, handleClose }) => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const locationContext = React.useContext(LocationContext);

  const apiRequest = React.useRef(false);
  const timeoutRequest = React.useRef(false);

  const searchCities = (e, t) => {
    setSearch(e.target.value);
    setResults([]);

    // Cancel if there is any prev in progress api call
    if (apiRequest.current) {
      cancelApis([apiRequest.current]);
    }

    if (timeoutRequest.current) {
      clearTimeout(timeoutRequest.current);
    }
    // Do api call on 1 sec typing pause
    timeoutRequest.current = setTimeout(() => {
      getCities(e.target.value);
    }, 1000);
  };

  const getCities = (key) => {
    if (!key) {
      return;
    }
    setLoading(true);
    apiRequest.current = api.request({ url: `/v2.1/cities?q=${key}` }).then(
      (response) => {
        setLoading(false);
        setResults(response.location_suggestions);
      },
      () => {
        setLoading(false);
      }
    );
  };

  const onSelect = (city) => {
    // Cache selected city for next time visit
    storeJsonInLocal({
      [ZOMATO_LOCAL_STORAGE.LOCATION]: city,
    });

    // Update in context
    locationContext.setLocation(city);

    // Close modal
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>
          Please search for your location to findout more restaurants near to
          you
        </DialogContentText>
        <SearchBox
          icon={LocationOnIcon}
          placeholder="Search cities..."
          onChange={searchCities}
          value={search}
          options={results}
          renderOption={(city) => <CityRender city={city} onClick={onSelect} />}
          getOptionLabel={(option) =>
            `${option.name} ${option.state_name} ${option.country_name} `
          }
          loading={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeLocationModal;
