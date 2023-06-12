import { createSlice } from "@reduxjs/toolkit";
import IMovie from "~/interfaces/movie.interface";

export const FILTERS = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Đang chiếu",
    value: "showing",
  },
  {
    label: "Ngừng chiếu",
    value: "stopped",
  },
  {
    label: "Sắp chiếu",
    value: "coming",
  },
];

interface MovieState {
  movies: IMovie[];
  filter: { value: string; label: string };
  filteredMovies: IMovie[];
}

const initialState: MovieState = {
  movies: [],
  filter: FILTERS[0],
  filteredMovies: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovies: (state, action) => {
      state.movies = action.payload.movies;
      state.filteredMovies = action.payload.movies;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      switch (action.payload.value) {
        case "coming":
          state.filteredMovies = state.movies.filter(
            (movie) => new Date(movie.premiereDay) > new Date()
          );
          return;
        case "showing":
          state.filteredMovies = state.movies.filter(
            (movie) =>
              new Date(movie.endDay) > new Date() &&
              new Date(movie.premiereDay) <= new Date()
          );
          return;
        case "stopped":
          state.filteredMovies = state.movies.filter(
            (movie) => new Date(movie.endDay) < new Date()
          );
          return;
        default:
          state.filteredMovies = state.movies;
      }
    },
  },
});

export const { getMovies, setFilter } = movieSlice.actions;

export default movieSlice.reducer;
