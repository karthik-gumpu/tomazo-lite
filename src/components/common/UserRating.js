import React from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import IconButton from "@material-ui/core/IconButton";
import { get } from "lodash";

const UserRating = ({ userRating }) => {
  return (
    <IconButton className="rating-icon">
      <StarBorderIcon
        style={{
          color: `#${get(userRating, "rating_color")}`,
        }}
      />
      &nbsp;
      {get(userRating, "aggregate_rating", "N/A")}
    </IconButton>
  );
};

export default UserRating;
