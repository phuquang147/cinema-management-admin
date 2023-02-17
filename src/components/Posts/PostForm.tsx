import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFTextField from "~/components/Form/RHFTextField";
import IPost from "~/interfaces/post.interface";
import Editor from "../Editor";
import CustomErrorText from "../Form/CustomErrorText";
import Thumbnail from "../Thumbnail";

interface PostFormProps {
  type?: "new" | "edit";
  post?: IPost;
}

const PostForm: React.FC<PostFormProps> = ({ type = "new", post }) => {
  const navigate = useNavigate();

  const StaffSchema = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tiêu đề"),
    content: Yup.string().required("Vui lòng nhập nội dung bài viết"),
    cover: Yup.string().required("Vui lòng chọn ảnh bìa"),
  });

  const defaultValues = {
    title: (post && post.title) || "",
    content: (post && post.content) || "",
    cover: (post && post.cover) || "",
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
          <RHFTextField name="title" label="Tiêu đề" />
        </Grid>

        <Grid item xs={12}>
          <Thumbnail
            thumbnail={getValues().cover}
            handleChangeThumbnail={(cover) => {
              setValue("cover", cover);
            }}
          />
          {errors.cover && (
            <CustomErrorText errorText={errors.cover.message || ""} />
          )}
        </Grid>

        <Grid item xs={12}>
          <Editor
            content={getValues().content}
            handleChange={(value) => {
              setValue("content", value);
            }}
          />
          {errors.content && (
            <CustomErrorText errorText={errors.content.message || ""} />
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

export default PostForm;
