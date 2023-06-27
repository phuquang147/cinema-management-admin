import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, Card, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFTextField from "~/components/Form/RHFTextField";
import { POST_STATUS } from "~/constants";
import { useAppDispatch } from "~/redux/hooks";
import { postSagaActionTypes } from "~/redux/sagaActionTypes";
import AlertModal from "../AlertModal";
import Editor from "../Editor";
import CustomErrorText from "../Form/CustomErrorText";
import RHFCheckbox from "../Form/RHFCheckbox";
import Thumbnail from "../Thumbnail";

export interface PostFormData {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  status: boolean;
}

type PostFormProps = {
  type?: "new" | "edit";
};

const PostForm: React.FC<PostFormProps> = ({ type = "new" }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const post = type === "edit" && location.state ? location.state.post : null;
  const [thumbnail, setThumbnail] = useState<string>(
    post ? post.thumbnail : ""
  );
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const StaffSchema = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tiêu đề"),
    content: Yup.string().required("Vui lòng nhập nội dung bài viết"),
    thumbnail: Yup.string().required("Vui lòng chọn ảnh bìa"),
  });

  const defaultValues = {
    title: post ? post.title : "",
    content: post ? post.content : "",
    thumbnail: post ? post.thumbnail : "",
    status: post ? post.status === POST_STATUS.PUBLIC : false,
  };

  const methods = useForm<PostFormData>({
    resolver: yupResolver(StaffSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setValue,
  } = methods;

  const onSubmit = async (values: PostFormData) => {
    if (type === "new") {
      dispatch({
        type: postSagaActionTypes.ADD_POST_SAGA,
        payload: { post: values, navigate },
      });
    } else {
      dispatch({
        type: postSagaActionTypes.UPDATE_POST_SAGA,
        payload: { post: { ...values, id: post._id }, navigate },
      });
    }
  };

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleDeletePost = () => {
    dispatch({
      type: postSagaActionTypes.DELETE_POST_SAGA,
      payload: { id: post._id, navigate },
    });
  };

  return (
    <Card sx={{ padding: 4 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RHFTextField name="title" label="Tiêu đề" />
          </Grid>

          <Grid item xs={12}>
            <Thumbnail
              thumbnail={thumbnail}
              handleChangeThumbnail={(thumbnail) => {
                setThumbnail(thumbnail);
                setValue("thumbnail", thumbnail);
              }}
            />
            {errors.thumbnail && (
              <CustomErrorText
                errorText={errors.thumbnail.message?.toString() || ""}
              />
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
              <CustomErrorText
                errorText={errors.content.message?.toString() || ""}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <RHFCheckbox name="status" label="Đăng công khai" />
          </Grid>
        </Grid>

        <Stack
          direction="row"
          justifyContent="end"
          sx={{ mt: 3 }}
          columnGap={2}
        >
          {type === "edit" && (
            <Button variant="outlined" onClick={handleShowConfirmDelete}>
              Xóa bài viết
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
        content="Bạn chắc chắn muốn xóa bài viết?"
        open={showConfirmDelete}
        onClose={handleCloseConfirmDelete}
        onAccept={handleDeletePost}
      />
    </Card>
  );
};

export default PostForm;
