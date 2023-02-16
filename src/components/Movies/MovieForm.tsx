import { faker } from "@faker-js/faker";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import FormProvider from "~/components/Form/FormProvider";
import RHFAutocomplete from "~/components/Form/RHFAutocomplete";
import RHFDatePicker from "~/components/Form/RHFDatePicker";
import RHFTextField from "~/components/Form/RHFTextField";
import IMovie from "~/interfaces/movie.interface";
import Editor from "../Editor";
import CustomErrorText from "../Form/CustomErrorText";
import ImageGallery from "../ImageGallery";
import Thumbnail from "../Thumbnail";

const GENRES = [
  {
    id: faker.datatype.uuid(),
    name: "Hành động",
  },
  {
    id: faker.datatype.uuid(),
    name: "Phiêu lưu",
  },
];

const ACTORS = [
  {
    id: faker.datatype.uuid(),
    name: "Actor 1",
  },
  {
    id: faker.datatype.uuid(),
    name: "Actor 2",
  },
];

interface MovieFormProps {
  type?: "new" | "edit";
  movie?: IMovie;
}

const MovieForm: React.FC<MovieFormProps> = ({ type = "new", movie }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  const StaffSchema = Yup.object().shape({
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
    name: (movie && movie.name) || "",
    description: (movie && movie.description) || "",
    genres: (movie && movie.genres) || [],
    actors: (movie && movie.actors) || [],
    director: (movie && movie.director) || "",
    thumbnail: (movie && movie.thumbnail) || "",
    images: (movie && movie.images) || [],
    duration: (movie && movie.duration) || 0,
    year: (movie && movie.year) || 2023,
    premiereDay: (movie && movie.premiereDay) || Date.now(),
    endDay: (movie && movie.endDay) || Date.now(),
    language: (movie && movie.language) || "",
    trailer: (movie && movie.trailer) || "",
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
            options={GENRES}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <RHFAutocomplete
            name="actors"
            label="Diễn viên"
            multiple={true}
            options={ACTORS}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="duration" label="Thời lượng" type="number" />
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
            thumbnail={getValues().thumbnail}
            handleChangeThumbnail={(thumbnail) => {
              setValue("thumbnail", thumbnail);
            }}
          />
          {errors.thumbnail && (
            <CustomErrorText errorText={errors.thumbnail.message || ""} />
          )}
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
            content={description}
            handleChange={(value) => {
              setDescription(value);
            }}
          />
          {errors.description && (
            <CustomErrorText errorText={errors.description.message || ""} />
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

export default MovieForm;
