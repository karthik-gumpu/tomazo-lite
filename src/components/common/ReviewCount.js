import React from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import IconButton from "@material-ui/core/IconButton";

const ReviewCount = ({ count = 0 }) => {
  return (
    <IconButton className="rating-icon">
      <ChatBubbleOutlineIcon />
      &nbsp;
      {count}
    </IconButton>
  );
};

export default ReviewCount;
