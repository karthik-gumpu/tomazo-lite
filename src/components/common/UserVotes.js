import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { get } from "lodash";

const UserVotes = ({ userRating }) => {
  return (
    <IconButton className="rating-icon">
      <FavoriteBorderIcon
        style={{
          color: `#fc6c85`,
        }}
      />
      &nbsp;
      {get(userRating, "votes", "N/A")}
    </IconButton>
  );
};

export default UserVotes;
