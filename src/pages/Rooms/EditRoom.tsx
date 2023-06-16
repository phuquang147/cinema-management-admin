import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Iconify from "~/components/Iconify";
import Loading from "~/components/Loading";
import RoomForm from "~/components/Rooms/RoomForm";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { getRoomById } from "~/redux/reducers/RoomReducer";
import { roomSagaActionTypes } from "~/redux/sagaActionTypes";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

const EditRoom: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    <AuthorizeContainer staffCanView={false}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          mb={5}
          gap={1}
        >
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <Iconify icon="ion:arrow-back" />
          </IconButton>
          <Typography variant="h4">Chỉnh sửa phòng chiếu</Typography>
        </Stack>

        <Card sx={{ padding: 4 }}>
          {loading ? <Loading /> : <RoomForm type="edit" room={edittingRoom} />}
        </Card>
      </Container>
    </AuthorizeContainer>
  );
};

export default EditRoom;
