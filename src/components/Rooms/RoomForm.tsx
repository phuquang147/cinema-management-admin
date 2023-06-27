import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Stack } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFAutocomplete from "~/components/Form/RHFAutocomplete";
import RHFTextField from "~/components/Form/RHFTextField";
import { SEAT_TYPES } from "~/constants";
import IRoom from "~/interfaces/room.interface";
import { ISeat } from "~/interfaces/seat.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { roomSagaActionTypes } from "~/redux/sagaActionTypes";
import AlertModal from "../AlertModal";
import { DragSelectProvider } from "../DragSelectProvider";
import Iconify from "../Iconify";
import SeatMap from "./SeatMap";

export interface RoomFormData {
  id: string;
  name: string;
  roomType: string;
  seats: (ISeat | string)[][];
}
interface RoomFormProps {
  type?: "new" | "edit";
  room?: IRoom | null;
}

export type NewSeat = {
  type: string;
  position?: "left" | "right";
};

const RoomForm: React.FC<RoomFormProps> = ({ type = "new", room }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [seats, setSeats] = useState<(ISeat | NewSeat)[][]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const roomTypes = useAppSelector((state) => state.roomType.roomTypes);
  const isSeatModified = useRef<boolean>(false);

  const RoomSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên phim"),
    roomType: Yup.object().required("Vui lòng chọn thể loại"),
  });

  const defaultValues = {
    name: room ? room.name : "",
    roomType: useMemo(() => {
      return room ? room.roomType : roomTypes[0];
    }, [roomTypes, room]),
  };

  const methods = useForm({
    resolver: yupResolver(RoomSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: any) => {
    if (type === "new") {
      dispatch({
        type: roomSagaActionTypes.ADD_ROOM_SAGA,
        payload: {
          room: { ...values, roomType: values.roomType._id, seats },
          navigate,
        },
      });
    } else {
      dispatch({
        type: roomSagaActionTypes.UPDATE_ROOM_SAGA,
        payload: {
          room: {
            ...values,
            id: room?._id,
            roomType: values.roomType._id,
            seats,
            isSeatModified: isSeatModified.current,
          },
          navigate,
        },
      });
    }
  };

  const handleAddRow = () => {
    setSeats((prevSeats) => {
      const newRow =
        prevSeats[0] && prevSeats[0].length > 0
          ? new Array(prevSeats[0].length).fill({ type: SEAT_TYPES.SINGLE })
          : [{ type: SEAT_TYPES.SINGLE }];
      return [...prevSeats, newRow];
    });
    isSeatModified.current = true;
  };

  const handleAddCol = () => {
    setSeats((prevSeats) => {
      const newSeats = prevSeats.map((seatsRow) => [...seatsRow]);
      for (const seatRow of newSeats) {
        seatRow.push({ type: SEAT_TYPES.SINGLE });
      }
      return newSeats;
    });
    isSeatModified.current = true;
  };

  const handleDeleteRow = () => {
    setSeats((prevSeats) => {
      if (prevSeats.length > 0) {
        const newSeats = [...prevSeats];
        newSeats.splice(-1);
        return newSeats;
      }
      return prevSeats;
    });
    isSeatModified.current = true;
  };

  const handleDeleteCol = () => {
    setSeats((prevSeats) => {
      return prevSeats.map((seatRow) => {
        const newSeatRow = [...seatRow];
        const lastSeat = newSeatRow.splice(-1);
        if (lastSeat[0].hasOwnProperty("_id")) {
          if ((lastSeat[0] as ISeat).seatId.type === SEAT_TYPES.DOUBLE)
            (newSeatRow[newSeatRow.length - 1] as ISeat).seatId.type =
              SEAT_TYPES.SINGLE;
        } else {
          if ((lastSeat[0] as NewSeat).type === SEAT_TYPES.DOUBLE)
            newSeatRow[newSeatRow.length - 1] = { type: SEAT_TYPES.SINGLE };
        }
        return newSeatRow;
      });
    });
    isSeatModified.current = true;
  };

  const handleUpdateSeats = (seats: (ISeat | NewSeat)[][]) => {
    setSeats(seats);
    isSeatModified.current = true;
  };

  useEffect(() => {
    dispatch({ type: roomSagaActionTypes.GET_DATA_FOR_ROOM });
  }, [dispatch]);

  useEffect(() => {
    if (room && room.seats) {
      setSeats(room.seats);
    }
  }, [room]);

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleDelete = () => {
    dispatch({
      type: roomSagaActionTypes.DELETE_ROOM_SAGA,
      payload: { id: room?._id, navigate },
    });
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <RHFTextField name="name" label="Tên phòng chiếu" />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <RHFAutocomplete
              name="roomType"
              label="Loại phòng chiếu"
              options={roomTypes}
              getOptionLabel={(option) => (option ? option.name : "")}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              disableClearable
            />
          </Grid>
          <Grid item xs={12}>
            <DragSelectProvider
              settings={{
                draggability: false,
                selectorAreaClass: "seats-container",
                selectableClass: "seat",
              }}
            >
              <SeatMap seats={seats} onUpdateSeats={handleUpdateSeats} />
            </DragSelectProvider>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" columnGap={1}>
          <Button variant="outlined" onClick={handleAddRow}>
            <Iconify
              icon="ci:add-row"
              sx={{ width: "24px", height: "24px", mr: "4px" }}
            />
            Thêm hàng
          </Button>
          <Button variant="outlined" onClick={handleAddCol}>
            <Iconify
              icon="ci:add-column"
              sx={{ width: "24px", height: "24px", mr: "4px" }}
            />
            Thêm cột
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="end"
          columnGap={1}
          sx={{ mt: 1 }}
        >
          <Button variant="outlined" onClick={handleDeleteRow}>
            <Iconify
              icon="ci:delete-row"
              sx={{ width: "24px", height: "24px", mr: "4px" }}
            />
            Xóa hàng
          </Button>
          <Button variant="outlined" onClick={handleDeleteCol}>
            <Iconify
              icon="ci:delete-column"
              sx={{ width: "24px", height: "24px", mr: "4px" }}
            />
            Xóa cột
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="end"
          sx={{ mt: 3 }}
          columnGap={2}
        >
          {type === "edit" && (
            <Button variant="outlined" onClick={handleShowConfirmDelete}>
              Xóa phòng chiếu
            </Button>
          )}
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {type === "new" ? "Tạo mới" : "Cập nhật"}
          </LoadingButton>
        </Stack>
      </FormProvider>
      <AlertModal
        content="Bạn chắc chắn muốn xóa phòng chiếu?"
        open={showConfirmDelete}
        onClose={handleCloseConfirmDelete}
        onAccept={handleDelete}
      />
    </>
  );
};

export default RoomForm;
