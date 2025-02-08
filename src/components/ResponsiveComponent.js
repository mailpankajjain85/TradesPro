import React from "react";
import { useMediaQuery, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function ResponsiveComponent() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      {isSmallScreen ? (
        <Typography variant="h6">Small Screen</Typography>
      ) : (
        <Typography variant="h4">Large Screen</Typography>
      )}
    </div>
  );
}

export default ResponsiveComponent;