import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Iconify from "~/components/Iconify";
import Room from "~/components/Rooms/Room";
import Select from "~/components/Select";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { roomSagaActionTypes } from "~/redux/sagaActionTypes";

const OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "using", label: "Đang hoạt động" },
  { value: "stopped", label: "Ngừng hoạt động" },
];

const Rooms: React.FC = () => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.room.rooms);
  const [selectedFilter, setSelectedFilter] = useState(OPTIONS[0]);

  useEffect(() => {
    dispatch({ type: roomSagaActionTypes.GET_ROOMS_SAGA });
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
        <Typography variant="h4">Phòng chiếu</Typography>
        <Stack direction="row" columnGap={2}>
          <Select
            options={OPTIONS}
            selected={selectedFilter}
            setSelected={setSelectedFilter}
          />
          <Button
            variant="contained"
            component={Link}
            to="/them-phong-chieu"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Thêm phòng chiếu
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item key={room._id} xs={6} sm={4} md={3}>
            <Room room={room} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Rooms;
