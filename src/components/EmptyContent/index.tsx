import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  message: string;
}

const EmptyContent = ({ message }: Props) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      my={5}
    >
      <Typography variant={"h4"}>{message}</Typography>
    </Box>
  );
};

export default EmptyContent;
