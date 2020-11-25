import React from "react";
import { Grid } from "@material-ui/core";
import { Waypoint } from "react-waypoint";

import Restaurant from "./Restaurant";
import RestaurantFiltering from "./RestaurantFiltering";
import api from "../utils/api";
import LocationContext from "../store/LocationContext";
import EmptyLoader from "./EmptyLoader";
import { PAGINATION_LIMIT } from "../constants";
import SortingMenu from "./SortingMenu";

import allData from "./data.json";
import RestaurantDetailsModal from "./RestaurantDetailsModal";

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
        // ...allData,
      },
      selectedData: {
        cuisineIds: [],
        categoryIds: [],
        sort: "",
        order: "",
      },
      selectedRestaurant: {},
      loading: false,
      showDetailsModal: false,
    };
  }

  onSearch = (selectedData) => {
    this.setState(
      (prevState) => ({ ...prevState.selectedData, ...selectedData }),
      this.getRestaurants
    );
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
        url: `/v2.1/search?entity_id=${location.id}&entity_type=city&cuisines=${cuisineIds}&categories=${categoryIds}&start=${start}&count=${PAGINATION_LIMIT}&sort=${selectedData.sort}&order=${selectedData.order}`,
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
  handleOnClick = (selectedRestaurant) => {
    this.setState({ selectedRestaurant, showDetailsModal: true });
  };
  handleClose = () => {
    this.setState({ selectedRestaurant: {}, showDetailsModal: false });
  };
  render() {
    const { data, loading, selectedData, selectedRestaurant } = this.state;

    const canApplyWaypoint =
      !loading && // Apply waypoint if api is not in progress
      data.results_found && // Apply waypoint if there are any records
      data.results_start + data.results_shown < data.results_found; // Apply waypoint if there are more records to load

    return (
      <>
        <RestaurantFiltering
          onSearch={this.onSearch}
          toggleSearchView={this.props.toggleSearchView}
        />
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
              <Restaurant
                restaurant={item.restaurant}
                handleOnClick={this.handleOnClick}
              />
            </Grid>
          ))}
          {loading &&
            [1, 2, 3, 4].map((key) => (
              <Grid key={key} item xs={12} sm={6} md={3}>
                <EmptyLoader />
              </Grid>
            ))}
          {canApplyWaypoint ? (
            <Waypoint onEnter={this.getMoreRestaurants} />
          ) : null}
        </Grid>
        <RestaurantDetailsModal
          open={this.state.showDetailsModal}
          restaurant={selectedRestaurant}
          key={selectedRestaurant.id}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}

RestaurantsContainer.contextType = LocationContext;

export default RestaurantsContainer;
