import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UserRating from "./common/UserRating";
import UserVotes from "./common/UserVotes";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
  },
  content: {
    flex: "1 0 auto",
  },
  media: {
    width: "100%",
    height: 70,
  },
  actionIcon: {
    fontSize: 15,
    padding: 5,
  },
  ellipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const RestaurantSuggestionCard = ({ restaurant, ...props }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      onClick={() => props.onClick(restaurant)}
    >
      <Grid item xs={2} md={2}>
        <img
          className={classes.media}
          src={restaurant.thumb}
          title={restaurant.name}
          alt={restaurant.name}
        />
      </Grid>
      <Grid item className={classes.details} xs={8} md={8}>
        <Typography component="h6" variant="h6">
          {restaurant.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.ellipsis}
        >
          {restaurant.cuisines}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.ellipsis}
        >
          {restaurant.location.address}
        </Typography>
      </Grid>
      <Grid item xs={2} md={2}>
        <UserRating userRating={restaurant.user_rating} />
        <UserVotes userRating={restaurant.user_rating} />
      </Grid>
    </Grid>
  );
};

export default RestaurantSuggestionCard;
