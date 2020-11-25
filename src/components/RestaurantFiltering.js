import React from "react";
import { Grid, Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

import api from "../utils/api";
import LocationContext from "../store/LocationContext";

class RestaurantFiltering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      categories: [],
      cuisines: [],
      selectedData: {
        cuisineIds: [],
        categoryIds: [],
      },
    };
  }

  componentDidMount() {
    // TODO: Commenting temporarly. Uncomment later
    // this.getCategories();
    // this.getCuisines();
  }

  updateSelectedData = (key, value) => {
    this.setState((prevState) => ({
      selectedData: {
        ...prevState.selectedData,
        [key]: value,
      },
    }));
  };

  handleSelectChange = (e, type) => {
    this.updateSelectedData(type, e.target.value);
  };

  getCuisines = () => {
    api
      .request({ url: `/v2.1/cuisines?city_id=${this.context.location.id}` })
      .then(({ cuisines }) => {
        this.setState({ cuisines });
      });
  };

  getCategories = () => {
    api
      .request({ url: `/v2.1/categories?city_id=${this.context.location.id}` })
      .then(({ categories }) => {
        this.setState({ categories });
      });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.selectedData);
  };

  render() {
    const { selectedData, cuisines, categories } = this.state;
    return (
      <Grid container spacing={3}>
        <Grid item md={3}></Grid>
        <Grid item xs={12} md={6} container spacing={3}>
          <Grid item xs={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="categories">Categories</InputLabel>
              <Select
                labelId="categories"
                id="categories-select"
                multiple
                value={selectedData.categoryIds}
                onChange={(e) => this.handleSelectChange(e, "categoryIds")}
                input={<Input />}
                renderValue={(selectedValues) => {
                  return selectedValues
                    .map((id) => {
                      const item = categories.find(
                        (x) => x.categories.id === id
                      );
                      return item.categories.name;
                    })
                    .join(",");
                }}
              >
                {categories.map((item) => (
                  <MenuItem key={item.categories.id} value={item.categories.id}>
                    <Checkbox
                      checked={
                        selectedData.categoryIds.indexOf(item.categories.id) >
                        -1
                      }
                    />
                    <ListItemText primary={item.categories.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="cuisines">Cuisines</InputLabel>
              <Select
                labelId="cuisines"
                id="cuisines-select"
                multiple
                value={selectedData.cuisineIds}
                onChange={(e) => this.handleSelectChange(e, "cuisineIds")}
                input={<Input />}
                renderValue={(selectedValues) => {
                  return selectedValues
                    .map((id) => {
                      const item = cuisines.find(
                        (x) => x.cuisine.cuisine_id === id
                      );
                      return item.cuisine.cuisine_name;
                    })
                    .join(",");
                }}
              >
                {cuisines.map((item) => (
                  <MenuItem
                    key={item.cuisine.cuisine_id}
                    value={item.cuisine.cuisine_id}
                  >
                    <Checkbox
                      checked={
                        selectedData.cuisineIds.indexOf(
                          item.cuisine.cuisine_id
                        ) > -1
                      }
                    />
                    <ListItemText primary={item.cuisine.cuisine_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 10 }}
                onClick={this.handleSearchClick}
              >
                <SearchIcon /> Search
              </Button>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={3} md={3}>
          <Button
            type="link"
            color="primary"
            style={{ marginTop: 10 }}
            onClick={this.props.toggleSearchView}
          >
            <KeyboardReturnIcon /> Basic
          </Button>
        </Grid>
      </Grid>
    );
  }
}

RestaurantFiltering.contextType = LocationContext;

export default RestaurantFiltering;
