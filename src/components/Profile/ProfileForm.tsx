import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFAutocomplete from "~/components/Form/RHFAutocomplete";
import RHFDatePicker from "~/components/Form/RHFDatePicker";
import RHFTextField from "~/components/Form/RHFTextField";
import { GENDERS } from "~/constants";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { authSagaActionTypes } from "~/redux/sagaActionTypes";
import CustomErrorText from "../Form/CustomErrorText";

export type ProfileFormData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  birthday: string;
  role: string;
};

const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập họ và tên"),
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Vui lòng nhập email"),
    phone: Yup.string().required("Vui lòng nhập số điện thoại"),
    gender: Yup.string().required("Vui lòng chọn giới tính"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    birthday: Yup.string()
      .transform((value) => {
        if (!value) return "";
        if (value === "Invalid Date") return "";
        return value;
      })
      .required("Vui lòng nhập ngày sinh hợp lệ"),
  });

  const defaultValues = {
    id: user ? user._id : "",
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    gender: user ? user.gender : GENDERS[0],
    birthday: user ? user.birthday : "",
    address: user ? user.address : "",
    role: user ? user.role : "",
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = methods;

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("phone", user.phone);
      setValue("email", user.email);
      setValue("gender", user.gender);
      setValue("birthday", user.birthday);
      setValue("address", user.address);
    }
  }, [user]);

  const onSubmit = async (values: ProfileFormData) => {
    dispatch({
      type: authSagaActionTypes.UPDATE_USER_SAGA,
      payload: {
        data: {
          ...values,
          birthday: new Date(values.birthday).toISOString(),
          id: user ? user._id : "",
          role: user ? user.role : "",
        },
      },
    });
  };

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField name="name" label="Họ và tên" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField name="phone" label="Số điện thoại" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField name="email" label="Email" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="gender"
              label="Giới tính"
              options={GENDERS}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFDatePicker name="birthday" label="Ngày sinh" />
            {errors.birthday && (
              <CustomErrorText
                errorText={errors.birthday.message?.toString() || ""}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField name="address" label="Địa chỉ" />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="end" gap={2} sx={{ mt: 3 }}>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Cập nhật
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default ProfileForm;
