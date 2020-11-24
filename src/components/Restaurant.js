import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { get } from "lodash";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MoneyIcon from "@material-ui/icons/Money";

const useStyles = makeStyles({
  root: {
    // height: 450,
  },
  media: {
    height: 140,
  },
  actionIcon: {
    fontSize: 15,
  },
  ellipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const isTrue = (value) => !Boolean(JSON.parse(value));

const Restaurant = ({ restaurant, ...props }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
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
            className={classes.ellipsis}
            title={restaurant.name}
          >
            {restaurant.name}
          </Typography>
          <Typography title={restaurant.cuisines} className={classes.ellipsis}>
            {restaurant.cuisines}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.ellipsis}
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
            <Button variant="outlined" color="seconday" size="small">
              Not Delivering
            </Button>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton
          className={classes.actionIcon}
          style={{
            color: `#${get(restaurant, "user_rating.rating_color", "inherit")}`,
          }}
        >
          <StarBorderIcon />
          {get(restaurant, "user_rating.aggregate_rating", "N/A")}
        </IconButton>
        <IconButton
          className={classes.actionIcon}
          style={{
            color: `#fc6c85`,
          }}
        >
          <FavoriteBorderIcon /> {get(restaurant, "user_rating.votes", "N/A")}
        </IconButton>
        <IconButton className={classes.actionIcon}>
          <ChatBubbleOutlineIcon /> {get(restaurant, "all_reviews_count", 0)}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Restaurant;
