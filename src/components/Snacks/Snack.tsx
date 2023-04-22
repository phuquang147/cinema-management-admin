import { Box, Card, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ISnack from "~/interfaces/snack.interface";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";

type SnackProps = {
  snack: ISnack;
};

const Snack: React.FC<SnackProps> = ({ snack }) => {
  return (
    <Card elevation={10}>
      <Box sx={{ width: "100%", pt: "100%", position: "relative" }}>
        <img
          src={snack.image}
          alt=""
          style={{
            top: "0",
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        ></img>
      </Box>
      <Stack sx={{ py: 2, px: 2 }}>
        <Typography
          component={Link}
          to={`/do-an-nhe/${snack._id}`}
          state={{ snack }}
          sx={{
            color: "#000",
            textDecoration: "none",
            overflow: "hidden",
            WebkitLineClamp: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            ":hover": {
              color: "primary.main",
            },
          }}
        >
          {snack.name}
        </Typography>
        <Typography
          sx={{ mt: 1, fontWeight: "bold" }}
        >{`${printNumberWithCommas(snack.price)} VNĐ`}</Typography>
      </Stack>
    </Card>
  );
};

export default Snack;
