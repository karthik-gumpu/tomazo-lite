import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { get } from "lodash";
import Chip from "@material-ui/core/Chip";

import { isTrue } from "../utils";

const Details = ({ restaurant }) => (
  <Grid container>
    <Grid item md={6}>
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
    <Grid>
      <IconButton>
        <StarBorderIcon
          style={{
            color: `#${get(restaurant, "user_rating.rating_color", "inherit")}`,
          }}
        />
        {get(restaurant, "user_rating.aggregate_rating", "N/A")}
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon
          style={{
            color: `#fc6c85`,
          }}
        />
        {get(restaurant, "user_rating.votes", "N/A")}
      </IconButton>
      <IconButton>
        <ChatBubbleOutlineIcon /> {get(restaurant, "all_reviews_count", 0)}
      </IconButton>
    </Grid>
    <Grid>
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
        <Button variant="outlined" color="seconday" size="small">
          Not Delivering
        </Button>
      )}
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
