import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFDatePicker from "~/components/Form/RHFDatePicker";
import RHFTextField from "~/components/Form/RHFTextField";
import IActor from "~/interfaces/actor.interface";
import Editor from "../Editor";
import CustomErrorText from "../Form/CustomErrorText";
import ImageGallery from "../ImageGallery";

interface ActorFormProps {
  type?: "new" | "edit";
  actor?: IActor;
}

const ActorForm: React.FC<ActorFormProps> = ({ type = "new", actor }) => {
  const navigate = useNavigate();

  const StaffSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên phim"),
    nation: Yup.string().required("Vui lòng nhập quốc tịch"),
    story: Yup.string().required("Vui lòng nhập mô tả"),
  });

  const defaultValues = {
    name: (actor && actor.name) || "",
    story: (actor && actor.story) || "",
    nation: (actor && actor.nation) || "",
    images: (actor && actor.images) || [],
  };

  const methods = useForm({
    resolver: yupResolver(StaffSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setValue,
  } = methods;

  const onSubmit = async (values: any) => {
    console.log(values);

    if (type === "new") {
    } else {
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4}>
          <RHFTextField name="name" label="Tên diễn viên" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFDatePicker name="birthday" label="Ngày sinh" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="nation" label="Quốc tịch" />
        </Grid>

        <Grid item xs={12}>
          <ImageGallery
            gallery={getValues().images}
            handleChangeGallery={(images) => {
              setValue("images", images);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Editor
            content={getValues().story}
            handleChange={(value) => {
              setValue("story", value);
            }}
          />
          {errors.story && (
            <CustomErrorText errorText={errors.story.message || ""} />
          )}
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }} columnGap={2}>
        {type === "edit" && <Button variant="outlined">Xóa phim</Button>}
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

export default ActorForm;
