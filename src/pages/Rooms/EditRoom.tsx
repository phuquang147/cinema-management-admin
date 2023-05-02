import { Card, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loading from "~/components/Loading";
import RoomForm from "~/components/Rooms/RoomForm";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { getRoomById } from "~/redux/reducers/RoomReducer";
import { roomSagaActionTypes } from "~/redux/sagaActionTypes";

const EditRoom: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.loading);
  const { edittingRoom } = useAppSelector((state) => state.room);

  useEffect(() => {
    if (location.state.room) {
      dispatch({
        type: roomSagaActionTypes.GET_ROOM_BY_ID_SAGA,
        payload: { id: location.state.room._id },
      });
    }

    return () => {
      dispatch(getRoomById({ room: null }));
    };
  }, [location.state, dispatch]);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa phòng chiếu
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        {loading ? <Loading /> : <RoomForm type="edit" room={edittingRoom} />}
      </Card>
    </Container>
  );
};

export default EditRoom;
