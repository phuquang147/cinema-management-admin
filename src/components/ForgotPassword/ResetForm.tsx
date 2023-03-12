import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFTextField from "~/components/Form/RHFTextField";
import Iconify from "~/components/Iconify";
import { useAppDispatch } from "~/redux/hooks";
import { authSagaActionTypes } from "~/redux/sagaActionTypes";

export default function ResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { token, id } = useParams();
  const dispatch = useAppDispatch();

  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
      .required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string().test(
      "isEqual",
      "Vui lòng xác nhận lại mật khẩu",
      (value, testContext) => {
        if (testContext.parent.password !== value) return false;
        return true;
      }
    ),
  });

  const defaultValues = {
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = methods;

  const onSubmit = async () => {
    const { password } = getValues();

    dispatch({
      type: authSagaActionTypes.CHANGE_PASSWORD_SAGA,
      payload: {
        data: { password, passwordToken: token, accountId: id },
        navigate,
      },
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
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

        <RHFTextField
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showConfirmPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Xác nhận
      </LoadingButton>
    </FormProvider>
  );
}
