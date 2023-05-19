import { Button, Grid, Stack } from "@mui/material";
import Snack from "~/components/Booking/Snack";
import { useAppSelector } from "~/redux/hooks";
import Iconify from "../Iconify";

interface SelectSnackProps {
  handleBack: () => void;
  handleNext: () => void;
}

const SelectSnack: React.FC<SelectSnackProps> = ({
  handleBack,
  handleNext,
}) => {
  const { snacks } = useAppSelector((state) => state.booking);

  return (
    <Grid container spacing={3}>
      {snacks.map((snack) => (
        <Grid item key={snack._id} xs={6} sm={4} md={3}>
          <Snack snack={snack} />
        </Grid>
      ))}
      <Stack
        direction="row"
        justifyContent="end"
        gap={1}
        sx={{ width: "100%", mt: 2 }}
      >
        <Button variant="outlined" onClick={handleBack}>
          <Iconify
            icon="ic:round-chevron-left"
            sx={{ height: "20px", width: "20px" }}
          />
          Chọn ghế
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Thanh toán
          <Iconify
            icon="ic:round-chevron-right"
            sx={{ height: "20px", width: "20px" }}
          />
        </Button>
      </Stack>
    </Grid>
  );
};

export default SelectSnack;
