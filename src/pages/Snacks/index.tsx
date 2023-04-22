import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Iconify from "~/components/Iconify";
import Snack from "~/components/Snacks/Snack";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { snackSagaActionTypes } from "~/redux/sagaActionTypes";

const Snacks: React.FC = () => {
  const dispatch = useAppDispatch();
  const snacks = useAppSelector((state) => state.snack.snacks);

  useEffect(() => {
    dispatch({ type: snackSagaActionTypes.GET_SNACKS_SAGA });
  }, [dispatch]);

  return (
    <Container sx={{ pb: 8 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        columnGap={2}
      >
        <Typography variant="h4">Đồ ăn nhẹ</Typography>
        <Stack direction="row" columnGap={2}>
          <Button
            variant="contained"
            component={Link}
            to="/them-do-an-nhe"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Thêm món
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={3}>
        {snacks.map((snack) => (
          <Grid item key={snack._id} xs={6} sm={4} md={3}>
            <Snack snack={snack} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Snacks;
