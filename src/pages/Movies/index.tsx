import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Iconify from "~/components/Iconify";
import Movie from "~/components/Movies/Movie";
import Select from "~/components/Select";
import useDebounce from "~/hooks/useDebounce";
import IMovie from "~/interfaces/movie.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { FILTERS, setFilter } from "~/redux/reducers/MovieReducer";
import { movieSagaActionTypes } from "~/redux/sagaActionTypes";

const Movies: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredMovies, filter } = useAppSelector((state) => state.movie);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loadedMovies, setLoadedMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    dispatch({ type: movieSagaActionTypes.GET_MOVIES_SAGA });
  }, [dispatch]);

  useEffect(() => {
    setLoadedMovies(filteredMovies);
  }, [filteredMovies]);

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setLoadedMovies(filteredMovies);
    }

    if (debouncedValue !== "") {
      const relevantMovies = filteredMovies.filter((item) =>
        item.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setLoadedMovies(relevantMovies);
    }
  }, [debouncedValue, filteredMovies]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = e.target.value;
    if (!searchInputValue.startsWith(" ")) {
      setSearchValue(searchInputValue);
    }
  };

  return (
    <Container sx={{ pb: 8 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        columnGap={2}
      >
        <Typography variant="h4">Phim</Typography>

        <Stack direction="row" columnGap={2}>
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm"
            value={searchValue}
            onChange={handleInputChange}
            size="small"
          />
          <Select
            options={FILTERS}
            selected={filter}
            setSelected={(value) => {
              dispatch(setFilter(value));
            }}
            sx={{ height: "100%" }}
          />
          <Button
            variant="contained"
            component={Link}
            to="/them-phim"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Thêm phim
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={3}>
        {loadedMovies.map((movie) => (
          <Grid item key={movie._id} xs={6} sm={4} md={3}>
            <Movie movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Movies;
