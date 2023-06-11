import { Box } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface LogoProps {
  disabledLink?: boolean;
  sx?: Object;
}

const Logo: React.FC<LogoProps> = ({ disabledLink = false, sx }) => {
  const logo = (
    <Box
      component="img"
      src="/assets/images/logo-text-red.png"
      sx={{ width: "100%", height: 40, ...sx, objectFit: "contain" }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
};

export default Logo;
