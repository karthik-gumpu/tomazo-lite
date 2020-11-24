import React from "react";
import { Grid } from "@material-ui/core";
import { Waypoint } from "react-waypoint";

import Restaurant from "./Restaurant";
import RestaurantSearch from "./RestaurantSearch";
import api from "../utils/api";
import LocationContext from "../store/LocationContext";
import EmptyLoader from "./EmptyLoader";
import { PAGINATION_LIMIT } from "../constants";
import SortingMenu from "./SortingMenu";

import allData from "./data.json";

class RestaurantsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.defaultData = {
      restaurants: [],
      results_found: 0,
      results_start: 0,
      results_shown: 0,
    };
    this.state = {
      data: {
        ...this.defaultData,
        ...allData,
      },
      selectedData: {},
      loading: false,
    };
  }

  onSearch = (selectedData) => {
    this.setState({ selectedData }, this.getRestaurants);
  };

  getRestaurants = (fetchMore) => {
    if (!fetchMore) {
      this.setState({ data: this.defaultData });
    }
    this.setState({ loading: true });
    const { selectedData, data } = this.state;
    const { location } = this.context;
    const cuisineIds = selectedData.cuisineIds.join(",");
    const categoryIds = selectedData.categoryIds.join(",");
    const start = fetchMore ? data.results_start + data.results_shown : 0;
    api
      .request({
        url: `/v2.1/search?entity_id=${location.id}&entity_type=city&cuisines${cuisineIds}&categories${categoryIds}&q=${selectedData.searchKey}&start=${start}&count=${PAGINATION_LIMIT}&sort=${selectedData.sort}&order=${selectedData.order}`,
      })
      .then((response) => {
        this.setState((prevState) => {
          const updatedData = {
            ...prevState.data,
            ...response,
            restaurants: [
              ...prevState.data.restaurants,
              ...response.restaurants,
            ],
          };
          return { data: updatedData, loading: false };
        });
      });
  };

  getMoreRestaurants = () => {
    this.getRestaurants(true);
  };

  handleSortChange = (key, value) => {
    this.setState(
      (prevState) => ({
        selectedData: { ...prevState.selectedData, [key]: value },
      }),
      this.getRestaurants
    );
  };
  render() {
    const { data, loading, selectedData } = this.state;
    const canApplyWaypoint =
      !loading && // Apply waypoint if api is not in progress
      data.results_found && // Apply waypoint if there are any records
      data.results_start + data.results_shown < data.results_found; // Apply waypoint if there are more records to load

    return (
      <Grid container style={{ margin: 20 }}>
        <RestaurantSearch onSearch={this.onSearch} />
        <Grid container spacing={2} style={{ paddingTop: 30 }}>
          {data.results_found ? (
            <>
              <Grid item xs={6} md={6}>
                Showing {data.results_start + data.results_shown} of{" "}
                {data.results_found} restaurants
              </Grid>
              <Grid item xs={6} md={6} style={{ textAlign: "right" }}>
                <SortingMenu
                  selectedData={selectedData || {}}
                  onSortChange={this.handleSortChange}
                />
              </Grid>
            </>
          ) : null}
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
          {canApplyWaypoint ? (
            <Waypoint onEnter={this.getMoreRestaurants} />
          ) : null}
        </Grid>
      </Grid>
    );
  }
}

RestaurantsContainer.contextType = LocationContext;

export default RestaurantsContainer;
