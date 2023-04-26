import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFTextField from "~/components/Form/RHFTextField";
import Iconify from "~/components/Iconify";
import { useAppDispatch } from "~/redux/hooks";
import { authSagaActionTypes } from "~/redux/sagaActionTypes";

export interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  const defaultValues = {
    username: "",
    password: "",
  };

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: LoginFormData) => {
    dispatch({
      type: authSagaActionTypes.LOGIN_SAGA,
      payload: { data: values, navigate },
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="username" label="Tên đăng nhập" />

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="end"
        sx={{ my: 2, textDecoration: "none" }}
      >
        <Typography
          component={Link}
          to="/quen-mat-khau"
          color="primary"
          sx={{
            textDecoration: "none !important",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          Quên mật khẩu?
        </Typography>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Đăng Nhập
      </LoadingButton>
    </FormProvider>
  );
}
