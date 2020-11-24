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

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
  actionIcon: {
    fontSize: 15,
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
          image={restaurant.featured_image}
          title={restaurant.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {restaurant.name}
          </Typography>
          <Typography variant="h6" component="h6">
            {restaurant.cuisines}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Typography variant="body2" color="textSecondary" component="p">
              <LocationOnIcon /> {get(restaurant, "location.address", "N/A")}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${restaurant.currency} ${get(
                restaurant,
                "average_cost_for_two",
                "N/A"
              )} Cost for Two`}
            </Typography>
            {isTrue(restaurant.has_table_booking) && (
              <Button variant="outlined" color="primary" size="small">
                Reserve Table
              </Button>
            )}
            &nbsp;
            {isTrue(restaurant.has_online_delivery) && (
              <Button variant="outlined" color="primary" size="small">
                Order Now
              </Button>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton className={classes.actionIcon}>
          <StarBorderIcon />
          {get(restaurant, "user_rating.aggregate_rating", "N/A")}
        </IconButton>
        <IconButton className={classes.actionIcon}>
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
