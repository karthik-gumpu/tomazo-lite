import React from "react";
import { Grid } from "@material-ui/core";

import Restaurant from "./Restaurant";
import RestaurantSearch from "./RestaurantSearch";
import api from "../utils/api";
import LocationContext from "../store/LocationContext";
import EmptyLoader from "./EmptyLoader";

// import allData from "./data.json";

class RestaurantsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        restaurants: [],
        results_found: 0,
        results_start: 0,
        results_shown: 0,
        // ...allData,
      },
      loading: false,
    };
  }

  getRestaurants = (data) => {
    const { location } = this.context;
    const cuisineIds = data.cuisineIds.join(",");
    const categoryIds = data.categoryIds.join(",");
    api
      .request({
        url: `/v2.1/search?entity_id=${location.id}&entity_type=city&cuisines${cuisineIds}&categories${categoryIds}&q=${data.searchKey}`,
      })
      .then((data) => {
        this.setState({ data });
      });
  };
  render() {
    const { data, loading } = this.state;
    return (
      <Grid container style={{ margin: 20 }}>
        <RestaurantSearch onSearch={this.getRestaurants} />
        <Grid container spacing={2} style={{ paddingTop: 30 }}>
          {data.restaurants.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.restaurant.id}>
              <Restaurant restaurant={item.restaurant} />
            </Grid>
          ))}
          {loading &&
            [1, 2, 3].map((key) => (
              <Grid key={key} item xs={12} sm={6} md={3}>
                <EmptyLoader />
              </Grid>
            ))}
        </Grid>
      </Grid>
    );
  }
}

RestaurantsContainer.contextType = LocationContext;

export default RestaurantsContainer;
