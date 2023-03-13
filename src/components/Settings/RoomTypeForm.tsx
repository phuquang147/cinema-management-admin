import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFTextField from "~/components/Form/RHFTextField";
import IRoomType from "~/interfaces/roomType.interface";
import { useAppDispatch } from "~/redux/hooks";
import { roomTypeSagaActionTypes } from "~/redux/sagaActionTypes";

interface RoomTypeFormProps {
  type?: "new" | "edit";
  roomType?: IRoomType;
  handleCloseModal: () => void;
}

const RoomTypeForm: React.FC<RoomTypeFormProps> = ({
  type = "new",
  roomType,
  handleCloseModal,
}) => {
  const dispatch = useAppDispatch();

  const StaffSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên loại phòng chiếu"),
  });

  const defaultValues = {
    name: roomType ? roomType.name : "",
  };

  const methods = useForm({
    resolver: yupResolver(StaffSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: any) => {
    if (type === "new")
      dispatch({
        type: roomTypeSagaActionTypes.ADD_ROOM_TYPE_SAGA,
        payload: { roomType: values, handleCloseModal },
      });
    else
      dispatch({
        type: roomTypeSagaActionTypes.UPDATE_ROOM_TYPE_SAGA,
        payload: {
          roomType: { ...values, id: roomType?._id },
          handleCloseModal,
        },
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 3 }}>
        <RHFTextField name="name" label="Tên loại phòng chiếu" />

        <Stack
          direction="row"
          justifyContent="end"
          sx={{ mt: 3 }}
          columnGap={2}
        >
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
  );
};

export default RoomTypeForm;
