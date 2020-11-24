import React from "react";
import { Grid, Button } from "@material-ui/core";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import SearchIcon from "@material-ui/icons/Search";
import * as _ from "lodash";

import SearchBox from "./SearchBox";
import api from "../utils/api";
import LocationContext from "../store/LocationContext";

const data = {
  categories: [
    { categories: { id: 1, name: "Delivery" } },
    { categories: { id: 13, name: "Pocket Friendly Delivery" } },
    { categories: { id: 2, name: "Dine-out" } },
    { categories: { id: 3, name: "Nightlife" } },
    { categories: { id: 8, name: "Breakfast" } },
    { categories: { id: 6, name: "Cafes" } },
  ],
};

class RestaurantsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      categories: data.categories,
      cuisines: [],
      selectedData: {
        cuisineIds: [],
        categoryIds: [],
      },
    };
  }

  componentDidMount() {
    // this.getCategories();
    // this.getCuisines();
  }

  handleSelectChange = (e, type) => {
    this.setState((prevState) => ({
      selectedData: {
        ...prevState.selectedData,
        [type]: e.target.value,
      },
    }));
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

  render() {
    console.log("state", this.state);
    const { selectedData, cuisines, categories } = this.state;
    return (
      <>
        <Grid xs={12} md={12} container>
          <Grid item xs={3} md={3}></Grid>
          <Grid item xs={12} md={6}>
            <SearchBox
              icon={RestaurantIcon}
              placeholder="Search restaurants..."
              options={this.state.restaurants}
              loading={this.state.loading}
            />
          </Grid>
        </Grid>
        <Grid xs={12} md={12} container>
          <Grid item xs={0} md={3}></Grid>
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
                    <MenuItem
                      key={item.categories.id}
                      value={item.categories.id}
                    >
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
                        return item.categories.cuisine_name;
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
                          selectedData.categoryIds.indexOf(
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
                >
                  <SearchIcon /> Search
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

RestaurantsSearch.contextType = LocationContext;

export default RestaurantsSearch;
