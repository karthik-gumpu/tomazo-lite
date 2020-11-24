import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";

const EmptyLoader = () => (
  <Box width={"100%"} marginRight={0.5} my={5}>
    <Skeleton variant="rect" width={"100%"} height={118} />
    <Box pt={0.5}>
      <Skeleton />
      <Skeleton width="60%" />
      <Skeleton width="40%" />
    </Box>
  </Box>
);

export default EmptyLoader;
