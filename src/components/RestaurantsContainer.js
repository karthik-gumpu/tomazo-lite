import React from "react";
import { Grid } from "@material-ui/core";

import Restaurant from "./Restaurant";
import RestaurantSearch from "./RestaurantSearch";
import api from "../utils/api";
import LocationContext from "../store/LocationContext";

import allData from "./data.json";

class RestaurantsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: allData.restaurants,
      loading: false,
    };
  }

  getRestaurants = (data) => {
    const { location } = this.context;
    api
      .request({
        url: `/v2.1/search?entity_id=${
          location.id
        }&entity_type=city&cuisines${data.cuisineIds.join(
          ","
        )}&categories${data.categoryIds.join(",")}&q=${data.searchKey}`,
      })
      .then((response) => {
        this.setState({ restaurants: response.restaurants });
      });
  };
  render() {
    const { restaurants } = this.state;
    return (
      <Grid container style={{ margin: 20 }}>
        <RestaurantSearch onSearch={this.getRestaurants} />
        <Grid container spacing={2} style={{ paddingTop: 30 }}>
          {restaurants.map((item) => (
            <Grid item xs={12} sm={6} md={3}>
              <Restaurant
                restaurant={item.restaurant}
                key={item.restaurant.id}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

RestaurantsContainer.contextType = LocationContext;

export default RestaurantsContainer;
