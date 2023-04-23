import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFAutocomplete from "~/components/Form/RHFAutocomplete";
import RHFDatePicker from "~/components/Form/RHFDatePicker";
import RHFTextField from "~/components/Form/RHFTextField";
import { GENDERS, USER_ROLES } from "~/constants";
import { useAppDispatch } from "~/redux/hooks";
import { staffSagaActionTypes } from "~/redux/sagaActionTypes";
import AlertModal from "../AlertModal";
import CustomErrorText from "../Form/CustomErrorText";

interface StaffFormProps {
  type?: "new" | "edit";
}

const StaffForm: React.FC<StaffFormProps> = ({ type = "new" }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const staff = type === "edit" && location.state ? location.state.staff : null;
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const StaffSchema = Yup.object().shape({
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
    name: staff ? staff.name : "",
    email: staff ? staff.email : "",
    phone: staff ? staff.phone : "",
    gender: staff ? staff.gender : GENDERS[0],
    birthday: staff ? staff.birthday : "",
    address: staff ? staff.address : "",
    role: staff ? staff.role : USER_ROLES[0],
  };

  const methods = useForm({
    resolver: yupResolver(StaffSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (values: any) => {
    if (type === "new") {
      dispatch({
        type: staffSagaActionTypes.ADD_STAFF_SAGA,
        payload: {
          staff: {
            ...values,
            birthday: new Date(values.birthday).toISOString(),
          },
          navigate,
        },
      });
    } else {
      dispatch({
        type: staffSagaActionTypes.UPDATE_STAFF_SAGA,
        payload: {
          staff: {
            ...values,
            birthday: new Date(values.birthday).toISOString(),
            id: staff._id,
          },
          navigate,
        },
      });
    }
  };

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleDeleteStaff = () => {
    dispatch({
      type: staffSagaActionTypes.DELETE_STAFF_SAGA,
      payload: { id: staff._id, navigate },
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

          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="role"
              label="Vai trò"
              options={USER_ROLES}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              disableClearable
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="end" gap={2} sx={{ mt: 3 }}>
          {type === "edit" && (
            <Button variant="outlined" onClick={handleShowConfirmDelete}>
              Cho nghỉ việc
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
        content="Bạn chắc chắn muốn cho nhân viên nghỉ việc?"
        open={showConfirmDelete}
        onClose={handleCloseConfirmDelete}
        onAccept={handleDeleteStaff}
      />
    </Box>
  );
};

export default StaffForm;
