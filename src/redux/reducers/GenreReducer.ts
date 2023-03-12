import { createSlice } from "@reduxjs/toolkit";
import IGenre from "~/interfaces/genre.interface";

interface GenreState {
  genres: IGenre[];
}

const initialState: GenreState = {
  genres: [],
};

export const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    getGenres: (state, action) => {
      state.genres = action.payload.genres;
    },
  },
});

export const { getGenres } = genreSlice.actions;

export default genreSlice.reducer;
