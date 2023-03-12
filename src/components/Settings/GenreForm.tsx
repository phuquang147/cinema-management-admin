import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFTextField from "~/components/Form/RHFTextField";
import IGenre from "~/interfaces/genre.interface";
import { useAppDispatch } from "~/redux/hooks";
import { genreSagaActionTypes } from "~/redux/sagaActionTypes";

interface GenreFormProps {
  type?: "new" | "edit";
  genre?: IGenre;
  handleCloseModal: () => void;
}

const GenreForm: React.FC<GenreFormProps> = ({
  type = "new",
  genre,
  handleCloseModal,
}) => {
  const dispatch = useAppDispatch();

  const StaffSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên thể loại phim"),
  });

  const defaultValues = {
    name: genre ? genre.name : "",
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
    if (type === "new") {
      dispatch({
        type: genreSagaActionTypes.ADD_GENRE_SAGA,
        payload: { genre: values, handleCloseModal },
      });
    } else {
      dispatch({
        type: genreSagaActionTypes.UPDATE_GENRE_SAGA,
        payload: {
          genre: { ...values, id: genre ? genre._id : "" },
          handleCloseModal,
        },
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 3 }}>
        <RHFTextField name="name" label="Tên thể loại" />

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

export default GenreForm;
