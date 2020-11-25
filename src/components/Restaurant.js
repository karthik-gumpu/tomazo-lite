import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { get } from "lodash";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MoneyIcon from "@material-ui/icons/Money";

import { isTrue } from "../utils";
import UserRating from "./common/UserRating";
import UserVotes from "./common/UserVotes";
import ReviewCount from "./common/ReviewCount";

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

const Restaurant = React.memo(({ restaurant, ...props }) => {
  const classes = useStyles();
  return (
    <Card onClick={() => props.handleOnClick(restaurant)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={restaurant.thumb}
          title={restaurant.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h4"
            className="ellipsis"
            title={restaurant.name}
          >
            {restaurant.name}
          </Typography>
          <Typography title={restaurant.cuisines} className="ellipsis">
            {restaurant.cuisines}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="ellipsis"
            title={get(restaurant, "location.address", "N/A")}
          >
            <LocationOnIcon /> {get(restaurant, "location.address", "N/A")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <MoneyIcon />
            {` ${restaurant.currency} ${get(
              restaurant,
              "average_cost_for_two",
              "N/A"
            )} per two persons`}
          </Typography>
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
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <UserRating userRating={restaurant.user_rating} />
        <UserVotes userRating={restaurant.user_rating} />
        <ReviewCount count={restaurant.all_reviews_count} />
      </CardActions>
    </Card>
  );
});

export default Restaurant;
