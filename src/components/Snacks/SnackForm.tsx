import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFTextField from "~/components/Form/RHFTextField";
import { useAppDispatch } from "~/redux/hooks";
import { snackSagaActionTypes } from "~/redux/sagaActionTypes";
import CustomErrorText from "../Form/CustomErrorText";
import NumericFormatCustom from "../NumericFormatCustom";
import Thumbnail from "../Thumbnail";

interface SnackFormProps {
  type?: "new" | "edit";
}

const SnackForm: React.FC<SnackFormProps> = ({ type = "new" }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const snack = type === "edit" && location.state ? location.state.snack : null;

  const [thumbnail, setThumbnail] = useState<string>(snack ? snack.image : "");

  const SnackSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên món hoặc combo"),
    price: Yup.string().required("Vui lòng nhập giá "),
    image: Yup.string().required("Vui lòng chọn ảnh"),
  });

  const defaultValues = {
    name: snack ? snack.name : "",
    price: snack ? snack.price : "",
    image: snack ? snack.image : "",
  };

  const methods = useForm({
    resolver: yupResolver(SnackSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = methods;

  const onSubmit = async (values: any) => {
    if (type === "new") {
      dispatch({
        type: snackSagaActionTypes.ADD_SNACK_SAGA,
        payload: { snack: values, navigate },
      });
    } else {
      dispatch({
        type: snackSagaActionTypes.UPDATE_SNACK_SAGA,
        payload: { snack: { ...values, id: snack._id }, navigate },
      });
    }
  };

  const handleDeleteSnack = (id: string) => {
    dispatch({
      type: snackSagaActionTypes.DELETE_SNACK_SAGA,
      payload: { id, navigate },
    });
  };

  return type === "edit" && !snack ? (
    <Box
      sx={{
        height: "200px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Không tìm thấy món</Typography>
    </Box>
  ) : (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <RHFTextField name="name" label="Tên món hoặc combo" />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <RHFTextField
            name="price"
            label="Giá"
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Thumbnail
            thumbnail={thumbnail}
            handleChangeThumbnail={(thumbnail) => {
              setThumbnail(thumbnail);
              setValue("image", thumbnail);
            }}
            crop={true}
          />
          {errors.image && (
            <CustomErrorText
              errorText={errors.image.message?.toString() || ""}
            />
          )}
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }} columnGap={2}>
        {type === "edit" && (
          <Button
            variant="outlined"
            onClick={() => handleDeleteSnack(snack._id)}
          >
            Xóa món
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
  );
};

export default SnackForm;
