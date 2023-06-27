import { Box, Typography } from "@mui/material";
import { FC } from "react";

const NoData: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Không có dữ liệu</Typography>
    </Box>
  );
};

export default NoData;
