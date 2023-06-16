import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Iconify from "~/components/Iconify";
import Room from "~/components/Rooms/Room";
import useDebounce from "~/hooks/useDebounce";
import IRoom from "~/interfaces/room.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { roomSagaActionTypes } from "~/redux/sagaActionTypes";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

const Rooms: React.FC = () => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.room.rooms);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loadedRooms, setLoadedRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    dispatch({ type: roomSagaActionTypes.GET_ROOMS_SAGA });
  }, [dispatch]);

  useEffect(() => {
    setLoadedRooms(rooms);
  }, [rooms]);

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setLoadedRooms(rooms);
    }

    if (debouncedValue !== "") {
      const relevantRooms = rooms.filter((item) =>
        item.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setLoadedRooms(relevantRooms);
    }
  }, [debouncedValue, rooms]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = e.target.value;
    if (!searchInputValue.startsWith(" ")) {
      setSearchValue(searchInputValue);
    }
  };

  return (
    <AuthorizeContainer staffCanView={false}>
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
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm"
              value={searchValue}
              onChange={handleInputChange}
              size="small"
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
          {loadedRooms.map((room) => (
            <Grid item key={room._id} xs={6} sm={4} md={3}>
              <Room room={room} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </AuthorizeContainer>
  );
};

export default Rooms;
