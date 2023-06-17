import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFDatePicker from "~/components/Form/RHFDatePicker";
import RHFTextField from "~/components/Form/RHFTextField";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { actorSagaActionTypes } from "~/redux/sagaActionTypes";
import AlertModal from "../AlertModal";
import Editor from "../Editor";
import CustomErrorText from "../Form/CustomErrorText";
import RHFAutocomplete from "../Form/RHFAutocomplete";
import ImageGallery from "../ImageGallery";
import Thumbnail from "../Thumbnail";

interface ActorFormProps {
  type?: "new" | "edit";
}

const ActorForm: React.FC<ActorFormProps> = ({ type = "new" }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const actor = type === "edit" && location.state ? location.state.actor : null;
  const { nations } = useAppSelector((state) => state.nation);
  const [avatar, setAvatar] = useState<string>(actor ? actor.avatar : "");
  const [images, setImages] = useState<string[]>(actor ? actor.images : []);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const StaffSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên phim"),
    nation: Yup.string().required("Vui lòng nhập quốc tịch"),
    story: Yup.string().required("Vui lòng nhập mô tả"),
  });

  const defaultValues = {
    name: actor ? actor.name : "",
    story: actor ? actor.story : "",
    nation: actor ? actor.nation : "",
    birthday: actor ? new Date(actor.birthday) : "",
    images: actor ? actor.images : [],
    avatar: actor ? actor.avatar : "",
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

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleDelete = () => {
    dispatch({
      type: actorSagaActionTypes.DELETE_ACTOR_SAGA,
      payload: { id: actor.id, navigate },
    });
  };

  const onSubmit = async (values: any) => {
    const { birthday } = values;

    if (type === "new")
      dispatch({
        type: actorSagaActionTypes.ADD_ACTOR_SAGA,
        payload: {
          actor: {
            ...values,
            birthday: birthday.$d ? birthday.$d.toISOString() : birthday,
          },
          navigate,
        },
      });
    else
      dispatch({
        type: actorSagaActionTypes.UPDATE_ACTOR_SAGA,
        payload: {
          actor: {
            ...values,
            id: actor._id,
            birthday: birthday.$d ? birthday.$d.toISOString() : birthday,
          },
          navigate,
        },
      });
  };

  useEffect(() => {
    dispatch({ type: actorSagaActionTypes.GET_DATA_FOR_ACTOR_SAGA });
  }, []);

  return type === "edit" && !actor ? (
    <Box
      sx={{
        height: "200px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Không tìm thấy diễn viên</Typography>
    </Box>
  ) : (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField name="name" label="Tên diễn viên" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFDatePicker name="birthday" label="Ngày sinh" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="nation"
              label="Quốc tịch"
              options={nations}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              disableClearable
            />
          </Grid>

          <Grid item xs={12}>
            <Thumbnail
              thumbnail={avatar}
              handleChangeThumbnail={(avatar) => {
                setAvatar(avatar);
                setValue("avatar", avatar);
              }}
              crop={true}
              aspect={3 / 4}
            />
            {errors.avatar && (
              <CustomErrorText
                errorText={errors.avatar.message?.toString() || ""}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <ImageGallery
              gallery={images}
              handleChangeGallery={(images) => {
                setImages(images);
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
              <CustomErrorText
                errorText={errors.story.message?.toString() || ""}
              />
            )}
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
              Xóa diễn viên
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
        content="Bạn chắc chắn muốn xóa diễn viên?"
        open={showConfirmDelete}
        onClose={handleCloseConfirmDelete}
        onAccept={handleDelete}
      />
    </Box>
  );
};

export default ActorForm;
