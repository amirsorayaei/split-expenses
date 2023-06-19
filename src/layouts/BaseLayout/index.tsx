import { FC, ReactNode } from "react";
import { Box } from "@mui/material";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        height: "100%",
        py: 6,
      }}
    >
      {children}
    </Box>
  );
};

export default BaseLayout;
