import React from "react";
import { Grid, Button } from "@material-ui/core";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

import SearchBox from "./common/SearchBox";
import api, { cancelApis } from "../utils/api";
import LocationContext from "../store/LocationContext";
import RestaurantDetailsModal from "./RestaurantDetailsModal";
import RestaurantSuggestionCard from "./RestaurantSuggestionCard";
// import allData from "./data.json";

const RestaurantsSearch = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState({});

  const locationContext = React.useContext(LocationContext);

  const apiRequest = React.useRef(false);
  const timeoutRequest = React.useRef(false);

  const searchRestaurants = (e) => {
    setSearch(e.target.value);
    setSuggestions([]);

    // Cancel if there is any prev in progress api call
    if (apiRequest.current) {
      cancelApis([apiRequest.current]);
    }

    if (timeoutRequest.current) {
      clearTimeout(timeoutRequest.current);
    }
    // Do api call on 1 sec typing pause
    timeoutRequest.current = setTimeout(() => {
      getRestaurants(e.target.value);
    }, 1000);
  };

  // Returns top 20 results
  // Pagination not implementing for ease of use.
  // Lets user type right keywords to get accurate results
  const getRestaurants = (key) => {
    if (!key) {
      return;
    }
    setLoading(true);
    apiRequest.current = api
      .request({
        url: `/v2.1/search?entity_id=${locationContext.location.id}&entity_type=city&q=${key}`,
      })
      .then(
        (response) => {
          setLoading(false);
          setSuggestions(response.restaurants);
        },
        () => {
          setLoading(false);
        }
      );
  };
  const onSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setSelectedRestaurant({});
    setShowModal(false);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={3} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <SearchBox
            icon={RestaurantIcon}
            placeholder="Start typing to search restaurants..."
            options={suggestions}
            loading={loading}
            onChange={searchRestaurants}
            value={search}
            renderOption={(item) => (
              <RestaurantSuggestionCard
                restaurant={item.restaurant}
                onClick={onSelect}
              />
            )}
            getOptionLabel={(option) =>
              `${option.restaurant.name} ${option.restaurant.cuisines} ${option.restaurant.location.address}` ||
              ""
            }
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <Button
            type="link"
            color="primary"
            onClick={props.toggleSearchView}
            style={{ marginTop: 10 }}
          >
            <KeyboardReturnIcon /> Advanced
          </Button>
        </Grid>
      </Grid>
      <RestaurantDetailsModal
        key={selectedRestaurant.id}
        restaurant={selectedRestaurant}
        open={showModal}
        handleClose={handleModalClose}
      />
    </>
  );
};

export default RestaurantsSearch;
