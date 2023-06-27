import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, InputAdornment, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFAutocomplete from "~/components/Form/RHFAutocomplete";
import IShowTime from "~/interfaces/showTime.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { showTimeSagaActionTypes } from "~/redux/sagaActionTypes";
import { dateTimeToISO, isoToDateTime } from "~/utils/formatDateTime";
import AlertModal from "../AlertModal";
import RHFDateTimePicker from "../Form/RHFDateTimePicker";
import RHFTextField from "../Form/RHFTextField";
import NumericFormatCustom from "../NumericFormatCustom";

export interface ShowTimeFormData {
  id: string;
  startTime: string;
  roomId: string;
  movieId: string;
  singlePrice: string;
  doublePrice: String;
}

interface ShowTimeFormProps {
  type?: "new" | "edit";
  showTime?: IShowTime;
  handleCloseModal: () => void;
}

const ShowTimeForm: React.FC<ShowTimeFormProps> = ({
  type = "new",
  showTime,
  handleCloseModal,
}) => {
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state) => state.room);
  const { movies } = useAppSelector((state) => state.movie);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const ShowTimeSchema = Yup.object().shape({
    singlePrice: Yup.string().required("Vui lòng nhập giá ghế đơn"),
    doublePrice: Yup.string().required("Vui lòng nhập giá ghế đôi"),
  });

  const defaultValues = {
    movie: useMemo(() => {
      return showTime ? showTime.movie : movies[0];
    }, [showTime, movies]),
    room: useMemo(() => {
      return showTime ? showTime.room : rooms[0];
    }, [showTime, rooms]),
    startTime: showTime ? isoToDateTime(showTime.startTime) : dayjs(),
    singlePrice: showTime ? showTime.singlePrice : null,
    doublePrice: showTime ? showTime.doublePrice : null,
  };

  const methods = useForm({
    resolver: yupResolver(ShowTimeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: any) => {
    const { startTime, room, movie, singlePrice, doublePrice } = values;
    if (type === "new") {
      dispatch({
        type: showTimeSagaActionTypes.ADD_SHOW_TIME_SAGA,
        payload: {
          showTime: {
            movieId: movie._id,
            roomId: room._id,
            startTime: startTime.$d ? dateTimeToISO(startTime.$d) : startTime,
            singlePrice,
            doublePrice,
          },
          handleCloseModal,
        },
      });
    } else {
      dispatch({
        type: showTimeSagaActionTypes.UPDATE_SHOW_TIME_SAGA,
        payload: {
          showTime: {
            id: showTime?._id,
            movieId: movie._id,
            roomId: room._id,
            startTime: startTime.$d ? dateTimeToISO(startTime.$d) : startTime,
            singlePrice,
            doublePrice,
          },
          handleCloseModal,
        },
      });
    }
  };

  useEffect(() => {
    dispatch({ type: showTimeSagaActionTypes.GET_DATA_FOR_SHOW_TIME });
  }, [dispatch]);

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleDeleteShowTime = () => {
    dispatch({
      type: showTimeSagaActionTypes.DELETE_SHOW_TIME_SAGA,
      payload: { id: showTime?._id, handleCloseModal },
    });
  };

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Stack rowGap={2}>
            <RHFAutocomplete
              name="movie"
              label="Phim"
              options={movies}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              disableClearable={true}
            />
            <RHFAutocomplete
              name="room"
              label="Phòng chiếu"
              options={rooms}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              disableClearable={true}
            />
            <RHFDateTimePicker name="startTime" label="Giờ chiếu" />

            <RHFTextField
              name="singlePrice"
              label="Giá ghế đơn"
              InputProps={{
                inputComponent: NumericFormatCustom as any,
                endAdornment: (
                  <InputAdornment position="end">VNĐ</InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="doublePrice"
              label="Giá ghế đôi"
              InputProps={{
                inputComponent: NumericFormatCustom as any,
                endAdornment: (
                  <InputAdornment position="end">VNĐ</InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            direction="row"
            justifyContent="end"
            sx={{ mt: 3 }}
            columnGap={2}
          >
            {type === "edit" && (
              <Button variant="outlined" onClick={handleShowConfirmDelete}>
                Xóa lịch chiếu
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
        </Box>
      </FormProvider>
      <AlertModal
        content="Bạn chắc chắn muốn xóa lịch chiếu?"
        open={showConfirmDelete}
        onClose={handleCloseConfirmDelete}
        onAccept={handleDeleteShowTime}
      />
    </Box>
  );
};

export default ShowTimeForm;
