import { Box, Typography } from "@mui/material";
import React from "react";

const PageNotFound = () => {
  return (
    <Box
      position={"absolute"}
      sx={{ inset: 0 }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography variant={"h3"}>{"404 | Page Not Found"}</Typography>
    </Box>
  );
};

export default PageNotFound;
