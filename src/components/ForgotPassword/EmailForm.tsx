import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFTextField from "~/components/Form/RHFTextField";
import { useAppDispatch } from "~/redux/hooks";
import { authSagaActionTypes } from "~/redux/sagaActionTypes";

export interface EmailFormData {
  email: string;
}

export default function EmailForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Vui lòng nhập email"),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm<EmailFormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: EmailFormData) => {
    dispatch({
      type: authSagaActionTypes.RESET_PASSWORD_SAGA,
      payload: { data: values, navigate },
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" />
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
