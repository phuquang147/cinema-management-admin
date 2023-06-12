import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, InputAdornment, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFAutocomplete from "~/components/Form/RHFAutocomplete";
import RHFDatePicker from "~/components/Form/RHFDatePicker";
import RHFTextField from "~/components/Form/RHFTextField";
import IActor from "~/interfaces/actor.interface";
import IGenre from "~/interfaces/genre.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { movieSagaActionTypes } from "~/redux/sagaActionTypes";
import AlertModal from "../AlertModal";
import Editor from "../Editor";
import CustomErrorText from "../Form/CustomErrorText";
import ImageGallery from "../ImageGallery";
import Thumbnail from "../Thumbnail";

type MovieFormProps = {
  type?: "new" | "edit";
};

const MovieForm: React.FC<MovieFormProps> = ({ type = "new" }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const genres = useAppSelector((state) => state.genre.genres);
  const actors = useAppSelector((state) => state.actor.actors);
  const movie = type === "edit" && location.state ? location.state.movie : null;
  const [thumbnail, setThumbnail] = useState<string>(
    movie ? movie.thumbnail : ""
  );
  const [images, setImages] = useState<string[]>(movie ? movie.images : []);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const MovieSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên phim"),
    description: Yup.string().required("Vui lòng nhập mô tả"),
    genres: Yup.array().min(1, "Vui lòng chọn thể loại"),
    actors: Yup.array().min(1, "Vui lòng chọn diễn viên"),
    director: Yup.string().required("Vui lòng nhập đạo diễn"),
    thumbnail: Yup.string().required("Vui lòng chọn thumbnail"),
    duration: Yup.number()
      .integer("Thời lượng phải là số nguyên")
      .required("Vui lòng nhập thời lượng")
      .min(1, "Thời lượng phải lớn hơn 0"),
    language: Yup.string().required("Vui lòng nhập ngôn ngữ"),
    trailer: Yup.string().required("Vui lòng nhập id video trailer"),
  });

  const defaultValues = {
    name: movie ? movie.name : "",
    description: movie ? movie.description : "",
    genres: movie ? movie.genres : [],
    actors: movie ? movie.actors : [],
    director: movie ? movie.director : "",
    thumbnail: movie ? movie.thumbnail : "",
    images: movie ? movie.images : [],
    duration: movie ? movie.duration : 0,
    premiereDay: movie ? dayjs(movie.premiereDay) : "",
    year: movie ? movie.year : "",
    endDay: movie ? dayjs(movie.endDay) : "",
    language: movie ? movie.language : "",
    trailer: movie ? movie.trailer : "",
  };

  const methods = useForm({
    resolver: yupResolver(MovieSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setValue,
  } = methods;

  const onSubmit = async (values: any) => {
    const { premiereDay, endDay, actors, genres } = values;

    const standardizeData = {
      ...values,
      premiereDay: premiereDay.$d ? premiereDay.$d.toISOString() : premiereDay,
      endDay: endDay.$d ? endDay.$d.toISOString() : endDay,
      actors: actors.map((actor: IActor) => actor._id),
      genres: genres.map((genre: IGenre) => genre._id),
    };

    if (type === "new") {
      dispatch({
        type: movieSagaActionTypes.ADD_MOVIE_SAGA,
        payload: {
          movie: standardizeData,
          navigate,
        },
      });
    } else {
      dispatch({
        type: movieSagaActionTypes.UPDATE_MOVIE_SAGA,
        payload: {
          movie: {
            ...standardizeData,
            id: movie._id,
          },
          navigate,
        },
      });
    }
  };

  useEffect(() => {
    dispatch({ type: movieSagaActionTypes.GET_DATA_FOR_MOVIE });
  }, [dispatch]);

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleDeleteMovie = () => {
    dispatch({
      type: movieSagaActionTypes.DELETE_MOVIE_SAGA,
      payload: { id: movie._id },
    });
  };

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <RHFTextField name="name" label="Tên phim" />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <RHFTextField name="director" label="Đạo diễn" />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <RHFAutocomplete
              name="genres"
              label="Thể loại"
              multiple={true}
              options={genres}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <RHFAutocomplete
              name="actors"
              label="Diễn viên"
              multiple={true}
              options={actors}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option._id === value._id}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField
              name="duration"
              label="Thời lượng"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">phút</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RHFDatePicker
              name="year"
              label="Năm sản xuất"
              views={["year"]}
              inputFormat="YYYY"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RHFDatePicker name="premiereDay" label="Ngày khởi chiếu" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RHFDatePicker name="endDay" label="Ngày ngừng chiếu dự kiến" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField name="language" label="Ngôn ngữ" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RHFTextField name="trailer" label="Trailer" />
          </Grid>
          <Grid item xs={12}>
            <Thumbnail
              thumbnail={thumbnail}
              handleChangeThumbnail={(thumbnail) => {
                setThumbnail(thumbnail);
                setValue("thumbnail", thumbnail);
              }}
              crop={true}
              aspect={16 / 9}
            />
            {errors.thumbnail && (
              <CustomErrorText
                errorText={errors.thumbnail.message?.toString() || ""}
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
              content={getValues().description}
              handleChange={(value) => {
                setValue("description", value);
              }}
            />
            {errors.description && (
              <CustomErrorText
                errorText={errors.description.message?.toString() || ""}
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
              Xóa phim
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
        content="Bạn chắc chắn muốn xóa phim?"
        open={showConfirmDelete}
        onClose={handleCloseConfirmDelete}
        onAccept={handleDeleteMovie}
      />
    </Box>
  );
};

export default MovieForm;
