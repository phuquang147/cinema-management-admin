import { Card, IconButton, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "~/redux/hooks";
import {
  IExtendedSnack,
  decreaseSnackQuantity,
  increaseSnackQuantity,
} from "~/redux/reducers/BookingReducer";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import Iconify from "../Iconify";

interface SnackProps {
  snack: IExtendedSnack;
}

const Snack: React.FC<SnackProps> = ({ snack }) => {
  const dispatch = useAppDispatch();

  return (
    <Card elevation={10}>
      <img
        src={snack.image}
        alt=""
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
      ></img>
      <Stack sx={{ pt: 1, pb: 2, px: 2 }}>
        <Typography
          sx={{
            mt: 1,
            color: "#000",
            textDecoration: "none",
            overflow: "hidden",
            WebkitLineClamp: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {snack.name}
        </Typography>
        <Stack alignItems="end">
          <Typography
            sx={{ mt: 1, fontWeight: "bold" }}
          >{`${printNumberWithCommas(snack.price)} VNĐ`}</Typography>
          <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
            <IconButton
              color="primary"
              disabled={snack.count < 1}
              onClick={() => {
                dispatch(decreaseSnackQuantity(snack));
              }}
            >
              <Iconify icon="ic:round-minus" />
            </IconButton>
            <Typography sx={{ p: 1 }}>{snack.count}</Typography>
            <IconButton
              color="primary"
              onClick={() => {
                dispatch(increaseSnackQuantity(snack));
              }}
            >
              <Iconify icon="ic:round-plus" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Snack;
