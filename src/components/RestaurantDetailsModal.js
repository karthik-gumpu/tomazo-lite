import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { get } from "lodash";
import Chip from "@material-ui/core/Chip";

import { isTrue } from "../utils";
import UserRating from "./common/UserRating";
import UserVotes from "./common/UserVotes";
import ReviewCount from "./common/ReviewCount";

const Details = ({ restaurant }) => (
  <Grid container>
    <Grid item md={8}>
      <Typography variant="h4"> {restaurant.name}</Typography>
      <Typography variant="h6"> {restaurant.cuisines}</Typography>
      <Typography> {restaurant.timings}</Typography>
      <Typography>
        {` ${restaurant.currency} ${get(
          restaurant,
          "average_cost_for_two",
          "N/A"
        )} per two persons`}
      </Typography>
      <Typography> {restaurant.location.address}</Typography>
    </Grid>
    <Grid container md={4}>
      <Grid item>
        <UserRating userRating={restaurant.user_rating} />
        <UserVotes userRating={restaurant.user_rating} />
        <ReviewCount count={restaurant.all_reviews_count} />
      </Grid>
      <Grid item>
        {isTrue(restaurant.has_table_booking) && (
          <Button variant="outlined" color="primary" size="small">
            Reserve Table
          </Button>
        )}
        &nbsp;&nbsp;
        {isTrue(restaurant.is_delivering_now) ? (
          <Button variant="outlined" color="primary" size="small">
            Order Now
          </Button>
        ) : (
          <Button variant="outlined" color="secondary" size="small">
            Not Delivering
          </Button>
        )}
      </Grid>
    </Grid>
    <Grid item md={12} spacing={2}>
      {restaurant.highlights.map((label, index) => (
        <Chip label={label} variant="outlined" key={index} />
      ))}
    </Grid>
  </Grid>
);

const RestaurantDetailsModal = ({
  open,
  handleClose,
  restaurant,
  ...props
}) => {
  return (
    <Dialog open={open} maxWidth={"md"}>
      <DialogContent>
        <Details restaurant={restaurant} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestaurantDetailsModal;
