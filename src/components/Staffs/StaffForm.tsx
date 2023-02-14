import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Grid, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFAutocomplete from "~/components/Form/RHFAutocomplete";
import RHFDatePicker from "~/components/Form/RHFDatePicker";
import RHFTextField from "~/components/Form/RHFTextField";
import { GENDERS, STAFFSTATUS } from "~/constants";
import IStaff from "~/interfaces/staff.interface";

interface StaffFormProps {
  type?: "new" | "edit";
  staff?: IStaff;
}

const StaffForm: React.FC<StaffFormProps> = ({ type = "new", staff }) => {
  const navigate = useNavigate();

  const StaffSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập họ và tên"),
    phone: Yup.string().required("Vui lòng nhập số điện thoại"),
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Vui lòng nhập email"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
  });

  const defaultValues = {
    name: (staff && staff.name) || "",
    email: (staff && staff.email) || "",
    phone: (staff && staff.phone) || "",
    gender: (staff && staff.gender) || GENDERS[0],
    birthday: staff ? dayjs(staff.birthdate) : dayjs("1999-01-01T21:11:54"),
    address: (staff && staff.address) || "",
    status: (staff && staff.status) || STAFFSTATUS[0],
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
    const { name, gender, birthday, address, email, phone, status } = values;

    const enteredStaff = {
      name,
      gender,
      address,
      email,
      phone,
      status,
      birthday: new Date(birthday).toISOString(),
    };

    if (type === "new") {
    } else {
    }
  };

  return (
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
          <RHFDatePicker name="birthdate" label="Ngày sinh" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="address" label="Địa chỉ" />
        </Grid>

        {type === "edit" && (
          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="status"
              label="Tình trạng"
              options={STAFFSTATUS}
              getOptionLabel={(option: string) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
        )}
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
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

export default StaffForm;
